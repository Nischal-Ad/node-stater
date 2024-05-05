import express from 'express'

//controllers
import { LoginUser, RegisterUser } from '@Controllers/authController'

const router = express.Router()

router.route('/signup').post(RegisterUser)
router.route('/login').post(LoginUser)

export default router
