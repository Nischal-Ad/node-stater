import catchAsync from '@Middleware/catchAsync'
import userModel, { TUser } from '@Models/userModel'
import authToken from '@Utils/authToken'
import bcrypt from 'bcryptjs'

export const RegisterUser = catchAsync(async (req, res) => {
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
})

export const LoginUser = catchAsync(async (req, res) => {
  const { email, password }: TUser = req.body

  if (!email || !password) {
    throw 'Please provide email and password!'
  }
  // 2) Check if user exists && password is correct
  const user = await userModel.findOne({ email }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    throw 'Incorrect email or password'
  }

  authToken(req, res, user, 'logged in succesfully', 200)
})
