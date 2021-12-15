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
        tags: schema
          .array([rules.distinct('*')])
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

    await album.load('photos', (photo) => photo.preload('comments'))
    return ctx.response.ok(album.photos)
  }

  public async get(ctx: HttpContextContract) {
    const album = await Album.find(ctx.request.param('album_id'))
    if (!album) return ctx.response.notFound({ message: 'Album not found' })

    await ctx.bouncer.authorize('getAlbum', album)
    try {
      const photo = await Photo.find(ctx.request.param('photo_id'))
      if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

      switch (ctx.request.accepts(['application/json', 'application/octet-stream'])) {
        case 'application/json':
          await photo.load('comments')
          await photo.load('album')
          return ctx.response.ok(photo)

        case 'application/octet-stream':
          const { size } = await Drive.getStats(photo.url)
          ctx.response.type(extname(photo.url))
          ctx.response.header('content-length', size)
          return ctx.response.stream(await Drive.getStream(photo.url))

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
        name: schema.string(),
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
}
