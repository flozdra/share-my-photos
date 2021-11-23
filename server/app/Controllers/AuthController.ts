import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      }),
    })

    await ctx.auth.use('web').attempt(payload.email, payload.password)
  }

  public async getUser(ctx: HttpContextContract) {
    try {
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async logout(ctx: HttpContextContract) {
    try {
      return ctx.response.ok({ message: 'Success' })
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError({ message: 'Internal server error' })
    }
  }
}
