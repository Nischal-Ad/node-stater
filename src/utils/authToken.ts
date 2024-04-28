import { Request, Response } from 'express'
import { Document } from 'mongoose'
import jwt from 'jsonwebtoken'

const authToken = (
  req: Request,
  res: Response,
  user: Document,
  message: string,
  statusCode: number
) => {
  const JWT_SECRET = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN

  if (!JWT_SECRET) {
    throw 'jwt secret key is missing'
  }

  if (!expiresIn) {
    throw 'jwt cookie expire value is missing'
  }

  const token = jwt.sign(user._id, JWT_SECRET, {
    expiresIn,
  })

  res
    .status(statusCode)
    .cookie('token', token, {
      expires: new Date(Date.now() + parseInt(expiresIn) * 24 * 60 * 60 * 1000),

      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      sameSite: 'none',
    })
    .json({
      success: true,
      message,
      user,
    })
}

export default authToken
