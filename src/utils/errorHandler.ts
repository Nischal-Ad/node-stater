import { NextFunction, Response, Request } from 'express'
import _ from 'lodash'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    if (err.message) {
      if (err.message.includes('dation failed:')) {
        res.status(400).json({
          status: 'failed',
          success: false,
          message: _.capitalize(err.message.split(':')[2]?.trim()),
        })
      } else if (err.message.includes('E11000')) {
        res.status(400).json({
          status: 'failed',
          success: false,
          message: 'Duplicate value entered',
        })
      } else if (err.message.includes('Cast to ObjectId failed')) {
        res.status(400).json({
          status: 'failed',
          success: false,
          message: 'Resource not found',
        })
      } else if (err.message.includes('json web token is invalid')) {
        res.status(400).json({
          status: 'failed',
          success: false,
          message: 'Json web token is invalid try again',
        })
      } else if (err.message.includes('json web token is expired')) {
        res.status(400).json({
          status: 'failed',
          success: false,
          message: 'Json web token is expired try again',
        })
      } else
        res.status(400).json({
          status: 'error',
          success: false,
          message: _.capitalize(err.message),
        })
    } else {
      res.status(400).json({
        status: 'failed',
        message: _.capitalize(err as unknown as string),
      })
    }
    console.log(err)
  } else {
    next()
  }
}

export default errorHandler
