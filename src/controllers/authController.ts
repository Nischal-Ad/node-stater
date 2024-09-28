import userModel, { TUser } from '@Models/userModel'
import authToken from '@Utils/authToken'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import validator from 'validator'

export const RegisterUser = async (req: Request, res: Response) => {
  const { name, email, password, cpassword, role }: TUser = req.body

  const user = await userModel.findOne({ email })
  if (user) throw 'User already exist'

  if (password !== cpassword) throw 'Passwords do not match'

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser: TUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  })

  newUser.password = undefined

  res.status(201).json({
    success: true,
    message: 'user register succesfully',
    user: newUser,
  })
}

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password }: TUser = req.body

  if (!email || !password) {
    throw 'Please provide email and password!'
  }

  if (!validator.isEmail(email)) throw 'Invalid email address!'

  const user = await userModel.findOne({ email }).select('+password')
  if (!user || !user.password) throw 'Incorrect email or password'

  const checkPassword = await bcrypt.compare(password, user.password)
  if (!checkPassword) throw 'Incorrect email or password'

  authToken(req, res, user, 'logged in succesfully', 200)
}
