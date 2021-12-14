import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'
import Photo from 'App/Models/Photo'
import Comment from 'App/Models/Comment'

export default class CommentController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        text: schema.string(),
      }),
    })

    const photo = await Photo.find(ctx.request.param('photo_id'))
    if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

    await ctx.bouncer.authorize('getPhoto', photo)

    const createdComment = await Comment.create({
      creation: DateTime.now(),
      userId: ctx.auth.user?.id,
      photoId: photo.id,
      text: payload.text,
    })

    return ctx.response.created(createdComment)
  }

  public async get(ctx: HttpContextContract) {
    const comment = await Comment.find(ctx.request.param('comment_id'))
    if (!comment) return ctx.response.notFound({ message: 'Comment not found' })
    await ctx.bouncer.authorize('getComment', comment)

    await ctx.response.ok(comment)
  }

  public async getAll(ctx: HttpContextContract) {
    const photo = await Photo.find(ctx.request.param('photo_id'))
    if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

    await ctx.bouncer.authorize('getPhoto', photo)

    await photo.load('comments')
    await ctx.response.ok(photo.comments)
  }

  public async patch(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        text: schema.string(),
      }),
    })

    const comment = await Comment.find(ctx.request.param('comment_id'))
    if (!comment) return ctx.response.notFound({ message: 'Comment not found' })

    await ctx.bouncer.authorize('patchDeleteComment', comment)

    const updated = await comment.merge(payload).save()

    await ctx.response.ok(updated)
  }

  public async delete(ctx: HttpContextContract) {
    const comment = await Comment.find(ctx.request.param('comment_id'))
    if (!comment) return ctx.response.notFound({ message: 'Comment not found' })

    await ctx.bouncer.authorize('patchDeleteComment', comment)

    await comment.delete()
    await ctx.response.ok({ message: 'Successfully deleted' })
  }
}
