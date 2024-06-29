import { TUser } from '@Models/userModel'
import { Request } from 'express'

declare module 'express' {
  interface Request {
    user?: TUser
  }
}
