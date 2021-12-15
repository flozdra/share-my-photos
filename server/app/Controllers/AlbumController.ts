import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Organisation from 'App/Models/Organisation'
import Album from 'App/Models/Album'
import { DateTime } from 'luxon'

export default class AlbumController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        name: schema.string(),
      }),
    })

    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('getOrganisation', organisation)

    // create an organisation affected to the authenticated user
    const createdAlbum = await organisation.related('albums').create({
      name: payload.name,
      creation: DateTime.now(),
      userId: ctx.auth.user?.id,
    })

    return ctx.response.created(createdAlbum)
  }

  public async getAll(ctx: HttpContextContract) {
    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('getOrganisation', organisation)

    await organisation.load('albums')
    return ctx.response.ok(organisation.albums)
  }

  public async get(ctx: HttpContextContract) {
    const album = await Album.find(ctx.request.param('album_id'))
    if (!album) return ctx.response.notFound({ message: 'Album not found' })

    await ctx.bouncer.authorize('getAlbum', album)

    await album.load('photos')
    return ctx.response.ok(album)
  }

  public async patch(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        name: schema.string({}),
      }),
    })

    const album = await Album.find(ctx.request.param('album_id'))
    if (!album) return ctx.response.notFound({ message: 'Album not found' })

    await ctx.bouncer.authorize('patchDeleteAlbum', album)

    const updated = await album.merge(payload).save()
    return ctx.response.ok(updated)
  }

  public async delete(ctx: HttpContextContract) {
    const album = await Album.find(ctx.request.param('album_id'))
    if (!album) return ctx.response.notFound({ message: 'Album not found' })

    await ctx.bouncer.authorize('patchDeleteAlbum', album)

    await album.delete()
    return ctx.response.ok({ message: 'Successfully deleted' })
  }
}
