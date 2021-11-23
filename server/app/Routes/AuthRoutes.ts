import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth/login', 'AuthController.login')

Route.get('/auth/user', 'AuthController.getUser')

Route.post('/auth/logout', 'AuthController.logout')
