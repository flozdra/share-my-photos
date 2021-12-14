import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Organisation from 'App/Models/Organisation'
import User from 'App/Models/User'

export default class UserController {
  public async patch(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        name: schema.string({}),
      }),
    })

    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('getOrganisation', organisation)

    const updated = await organisation.merge({ name: payload.name }).save()
    await ctx.response.ok(updated)
  }

  public async delete(ctx: HttpContextContract) {
    const user = await User.find(ctx.request.param('user_id'))
    if (!user) return ctx.response.notFound({ message: 'User not found' })

    await ctx.bouncer.authorize('patchDeleteUser', user)

    await ctx.auth.user?.delete()
    await ctx.response.ok({ message: 'Successfully deleted' })
  }

  public async get(ctx: HttpContextContract) {
    const users = await User.query()
    await ctx.response.ok(users)
  }
}
