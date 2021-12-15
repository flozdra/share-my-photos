import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register(ctx: HttpContextContract) {
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

    return ctx.response.created(createdUser)
  }

  public async login(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
        color: schema.string.optional({}, [rules.regex(/^#[a-fA-F0-9]{8}$/)]),
      }),
    })

    await ctx.auth.use('web').attempt(payload.email, payload.password)
    return ctx.response.ok(ctx.auth.user)
  }

  public async getUser(ctx: HttpContextContract) {
    try {
      return ctx.response.ok(ctx.auth.user)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async logout(ctx: HttpContextContract) {
    try {
      await ctx.auth.use('web').logout()
      return ctx.response.ok({ message: 'Success' })
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError({ message: 'Internal server error' })
    }
  }
}
