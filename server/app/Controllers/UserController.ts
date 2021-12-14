import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class UserController {
  public async patch(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        firstname: schema.string.optional({}),
        lastname: schema.string.optional({}),
        email: schema.string.optional({ trim: true, escape: true }, [
          rules.email(),
          rules.unique({
            table: 'app.user',
            column: 'email',
            caseInsensitive: true,
            whereNot: {
              id: ctx.auth.user!.id,
            },
          }),
        ]),
        password: schema.string.optional(),
      }),
    })
    await ctx.bouncer.authorize('patchDeleteUser', ctx.auth.user!)
    const updated = await ctx.auth?.user?.merge(payload).save()
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
