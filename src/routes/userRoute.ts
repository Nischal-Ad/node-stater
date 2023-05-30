import express from 'express'

//controllers
import { TestUser } from '@Controllers/userController'
import { isAuth, roles } from '@Middleware/auth'

const router = express.Router()

router.route('/test').get(isAuth, roles('student'), TestUser)

export default router
