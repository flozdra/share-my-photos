import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Album from 'App/Models/Album'
import { DateTime } from 'luxon'
import Photo from 'App/Models/Photo'
import Drive from '@ioc:Adonis/Core/Drive'
import { extname } from 'path'

const { v4: uuidv4 } = require('uuid')

export default class PhotoController {
  public async create(ctx: HttpContextContract) {
    await ctx.auth.user?.load('organisations')
    const payload = await ctx.request.validate({
      schema: schema.create({
        name: schema.string(),
        description: schema.string(),
        tags: schema.array
          .optional([rules.distinct('*')])
          .members(schema.string.optional({ trim: true, escape: true })),
        file: schema.file({
          size: '100mb',
        }),
      }),
    })

    const album = await Album.find(ctx.request.param('album_id'))
    if (!album) return ctx.response.notFound({ message: 'Album not found' })

    await ctx.bouncer.authorize('getAlbum', album)

    const file = payload.file

    // upload file to S3
    await file.moveToDisk('./photos', {
      visibility: 'private',
      name: uuidv4() + '.' + file.extname,
    })

    const createdPhoto = await Photo.create({
      name: payload.name,
      creation: DateTime.now(),
      userId: ctx.auth.user?.id,
      url: file.fileName,
      description: payload.description,
      albumId: album.id,
      tags: payload.tags,
    })

    return ctx.response.created(createdPhoto)
  }

  public async getAll(ctx: HttpContextContract) {
    const album = await Album.find(ctx.request.param('album_id'))
    if (!album) return ctx.response.notFound({ message: 'Album not found' })

    await ctx.bouncer.authorize('getAlbum', album)

    await album.load('photos', (photo) =>
      photo.preload('comments', (comments) => comments.preload('user')).preload('user')
    )
    return ctx.response.ok(
      album.photos.sort((a, b) => a.creation.toMillis() - b.creation.toMillis())
    )
  }

  public async get(ctx: HttpContextContract) {
    const album = await Album.find(ctx.request.param('album_id'))
    if (!album) return ctx.response.notFound({ message: 'Album not found' })

    await ctx.bouncer.authorize('getAlbum', album)
    try {
      const photo = await Photo.find(ctx.request.param('photo_id'))
      if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

      switch (ctx.request.accepts(['image/*', 'json'])) {
        case 'image/*':
          const { size } = await Drive.getStats(photo.url)
          ctx.response.type(extname(photo.url))
          ctx.response.header('content-length', size)
          return ctx.response.stream(await Drive.getStream(photo.url))
        case 'json':
          await photo.load('comments', (comments) => comments.preload('user'))
          await photo.load('album')
          await photo.load('user')
          return ctx.response.ok(photo)

        default:
          return ctx.response.notAcceptable()
      }
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async patch(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        description: schema.string(),
        tags: schema
          .array([rules.distinct('*')])
          .members(schema.string.optional({ trim: true, escape: true })),
      }),
    })

    const photo = await Photo.find(ctx.request.param('photo_id'))
    if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

    await ctx.bouncer.authorize('patchDeletePhoto', photo)

    const updated = await photo.merge(payload).save()

    return ctx.response.ok(updated)
  }

  public async delete(ctx: HttpContextContract) {
    const photo = await Photo.find(ctx.request.param('photo_id'))
    if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

    await ctx.bouncer.authorize('patchDeletePhoto', photo)

    await Drive.delete(photo.url)
    await photo.delete()
    return ctx.response.ok({ message: 'Successfully deleted' })
  }

  public async lookup(ctx: HttpContextContract) {
    try {
      const search = ctx.request.param('search')

      await ctx.auth.user?.load('organisations', (organisations) =>
        organisations.preload('albums', (album) =>
          album.preload('photos', (photos) =>
            photos
              .preload('user')
              .preload('comments', (comments) => comments.preload('user'))
              .where('description', 'ILIKE', `%${search}%`)
              .orWhereRaw(`array_to_string(tags, ',') ILIKE '%${search}%'`)
          )
        )
      )
      const organisations = (await ctx.auth.user?.organisations) || []

      for (const org of organisations) {
        // @ts-ignore
        org.albums = org.albums.filter((a) => a.photos.length > 0)
      }
      const result = organisations.filter((o) => o.albums.length > 0)

      return ctx.response.ok(result)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError({ message: 'Internal server error' })
    }
  }
}
