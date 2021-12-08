import Route from '@ioc:Adonis/Core/Route'

Route.get('/organisations/:organisation_id/albums', 'AlbumController.getAll')
  .where('organisation_id', Route.matchers.number())
  .middleware('auth')

Route.post('/organisations/:organisation_id/albums', 'AlbumController.create')
  .where('organisation_id', Route.matchers.number())
  .middleware('auth')

Route.get('/organisations/:organisation_id/albums/:album_id', 'AlbumController.get')
  .where('album_id', Route.matchers.number())
  .middleware('auth')

Route.patch('/organisations/:organisation_id/albums/:album_id', 'AlbumController.patch')
  .where('organisation_id', Route.matchers.number())
  .middleware('auth')

Route.delete('/organisations/:organisation_id/albums/:album_id', 'AlbumController.delete')
  .where('organisation_id', Route.matchers.number())
  .middleware('auth')
