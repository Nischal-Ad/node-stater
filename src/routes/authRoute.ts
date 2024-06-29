import express from 'express'

//controllers
import { LoginUser, RegisterUser } from '@Controllers/authController'

const authRouter = express.Router()

authRouter.route('/signup').post(RegisterUser)
authRouter.route('/login').post(LoginUser)

authRouter.use(isAuth)

export default authRouter
