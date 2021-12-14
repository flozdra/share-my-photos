import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'UserController.get').middleware('auth')

Route.patch('/users/:user_id', 'UserController.patch')
  .where('user_id', Route.matchers.number())
  .middleware('auth')

Route.delete('/users/:user_id', 'UserController.delete')
  .where('user_id', Route.matchers.number())
  .middleware('auth')
