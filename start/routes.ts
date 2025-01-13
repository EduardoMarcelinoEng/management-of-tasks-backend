/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import UsersController from '#controllers/users_controller';
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.on('/login').render('pages/login')
router.on('/registro').render('pages/register')

router.post('/user/auth', ctx => new UsersController().auth(ctx))
router.post('/user', ctx => new UsersController().create(ctx))