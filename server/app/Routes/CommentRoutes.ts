import Route from '@ioc:Adonis/Core/Route'

Route.get('/photos/:photo_id/comments', 'CommentController.getAll')
  .where('photo_id', Route.matchers.number())
  .middleware('auth')

Route.post('/photos/:photo_id/comments', 'CommentController.create')
  .where('photo_id', Route.matchers.number())
  .middleware('auth')

Route.get('/photos/:photo_id/comments/:comment_id', 'CommentController.get')
  .where('comment_id', Route.matchers.number())
  .where('photo_id', Route.matchers.number())
  .middleware('auth')

Route.patch('/photos/:photo_id/comments/:comment_id', 'CommentController.patch')
  .where('comment_id', Route.matchers.number())
  .where('photo_id', Route.matchers.number())
  .middleware('auth')

Route.delete('/photos/:photo_id/comments/:comment_id', 'CommentController.delete')
  .where('comment_id', Route.matchers.number())
  .where('photo_id', Route.matchers.number())
  .middleware('auth')
