import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Organisation from 'App/Models/Organisation'
import User from 'App/Models/User'

export default class UserController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        lastname: schema.string(),
        firstname: schema.string(),
        email: schema.string({ trim: true, escape: true }, [
          rules.email(),
          rules.unique({
            table: 'app.user',
            column: 'email',
            caseInsensitive: true,
          }),
        ]),
        password: schema.string(),
      }),
    })

    const createdUser = await User.create({
      lastname: payload.lastname,
      firstname: payload.firstname,
      email: payload.email,
      password: payload.password,
    })

    await ctx.response.created(createdUser)
  }

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
