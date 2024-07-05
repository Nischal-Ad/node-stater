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

  const token = jwt.sign({ user, isAuth: true }, JWT_SECRET, {
    expiresIn,
  })

  res.status(statusCode).json({
    success: true,
    message,
    token,
  })
}

export default authToken
