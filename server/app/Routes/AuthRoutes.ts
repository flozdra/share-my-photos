import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth/register', 'AuthController.register')

Route.post('/auth/login', 'AuthController.login')

Route.get('/auth/user', 'AuthController.getUser').middleware('auth')

Route.post('/auth/logout', 'AuthController.logout')
