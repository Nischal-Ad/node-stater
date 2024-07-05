import jwt from 'jsonwebtoken'
import  { TUser } from '@Models/userModel'
import { NextFunction, Request, Response } from 'express'

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token
  const JWT_SECRET = process.env.JWT_SECRET

  if (!JWT_SECRET) {
    throw new Error('something went wrong')
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    throw 'You are not logged in!'
  }

  const decoded = jwt.verify(token, JWT_SECRET)
  req.user = decoded.user as TUser
  next()
}

export const roles = (...roles: Pick<TUser, 'role'>['role'][]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw 'sorry you cannot access this page'
    }
    next()
  }
}
