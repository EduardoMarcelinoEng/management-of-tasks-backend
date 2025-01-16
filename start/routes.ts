/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import TagsController from '#controllers/tags_controller';
import UsersController from '#controllers/users_controller';
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.on('/login').render('pages/login')
router.on('/registro').render('pages/register')

router.post('/user/auth', ctx => new UsersController().auth(ctx))
router.post('/user', ctx => new UsersController().create(ctx))
router.post('/user/logout', ctx => new UsersController().logout(ctx)).use(middleware.auth())

router.get('/tag', ctx => new TagsController().index(ctx)).use(middleware.auth())
router.post('/tag', ctx => new TagsController().create(ctx)).use(middleware.auth())
router.put('/tag/:id', ctx => new TagsController().update(ctx)).use(middleware.auth())
router.delete('/tag/:id', ctx => new TagsController().destroy(ctx)).use(middleware.auth())