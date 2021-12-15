import Route from '@ioc:Adonis/Core/Route'

Route.post('/organisations', 'OrganisationController.create').middleware('auth')

Route.get('/organisations/:organisation_id', 'OrganisationController.get')
  .where('organisation_id', Route.matchers.number())
  .middleware('auth')

Route.get('/organisations', 'OrganisationController.getOwnedOrganisations').middleware('auth')

Route.patch('/organisations/:organisation_id', 'OrganisationController.patch')
  .where('organisation_id', Route.matchers.number())
  .middleware('auth')

Route.delete('/organisations/:organisation_id', 'OrganisationController.delete')
  .where('organisation_id', Route.matchers.number())
  .middleware('auth')

Route.post('/organisations/:organisation_id/users/:user_id', 'OrganisationController.addUser')
  .where('organisation_id', Route.matchers.number())
  .where('user_id', Route.matchers.number())
  .middleware('auth')

Route.delete('/organisations/:organisation_id/users/:user_id', 'OrganisationController.removeUser')
  .where('organisation_id', Route.matchers.number())
  .where('user_id', Route.matchers.number())
  .middleware('auth')
