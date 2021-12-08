import Route from '@ioc:Adonis/Core/Route'

Route.get('/albums/:album_id/photos', 'PhotoController.getAll')
  .where('album_id', Route.matchers.number())
  .middleware('auth')

Route.post('/albums/:album_id/photos', 'PhotoController.create')
  .where('album_id', Route.matchers.number())
  .middleware('auth')

Route.get('/albums/:album_id/photos/:photo_id', 'PhotoController.get')
  .where('album_id', Route.matchers.number())
  .where('photo_id', Route.matchers.number())
  .middleware('auth')

Route.patch('/albums/:album_id/photos/:photo_id', 'PhotoController.patch')
  .where('album_id', Route.matchers.number())
  .where('photo_id', Route.matchers.number())
  .middleware('auth')

Route.delete('/albums/:album_id/photos/:photo_id', 'PhotoController.delete')
  .where('album_id', Route.matchers.number())
  .where('photo_id', Route.matchers.number())
  .middleware('auth')
