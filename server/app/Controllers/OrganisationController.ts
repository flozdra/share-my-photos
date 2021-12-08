import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Organisation from 'App/Models/Organisation'
import User from 'App/Models/User'

export default class OrganisationController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        name: schema.string(),
      }),
    })

    // create an organisation affected to the authenticated user
    const createdOrganisation = await ctx.auth.user?.related('organisations').create({
      name: payload.name,
      createdByUserId: ctx.auth.user?.id,
    })

    await ctx.response.created(createdOrganisation)
  }

  public async get(ctx: HttpContextContract) {
    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('getOrganisation', organisation)

    await organisation.load('createdByUser')
    await organisation.load('users')
    await ctx.response.ok(organisation)
  }

  public async patch(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        name: schema.string({}),
      }),
    })

    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('patchDeleteOrganisation', organisation)

    const updated = await organisation.merge({ name: payload.name }).save()

    await ctx.response.ok(updated)
  }

  public async delete(ctx: HttpContextContract) {
    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('patchDeleteOrganisation', organisation)

    await organisation.delete()
    await ctx.response.ok({ message: 'Successfully deleted' })
  }

  public async addUser(ctx: HttpContextContract) {
    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('patchDeleteOrganisation', organisation)

    const user = await User.find(ctx.request.param('user_id'))
    if (!user) return ctx.response.notFound({ message: 'User not found' })

    await user.related('organisations').sync([organisation.id], false)
    await organisation.load('users')
    await ctx.response.ok(organisation)
  }

  public async removeUser(ctx: HttpContextContract) {
    const organisation = await Organisation.find(ctx.request.param('organisation_id'))
    if (!organisation) return ctx.response.notFound({ message: 'Organisation not found' })

    await ctx.bouncer.authorize('patchDeleteOrganisation', organisation)

    const user = await User.find(ctx.request.param('user_id'))
    if (!user) return ctx.response.notFound({ message: 'User not found' })

    await user.related('organisations').detach([organisation.id])
    await organisation.load('users')
    await ctx.response.ok(organisation)
  }
}
