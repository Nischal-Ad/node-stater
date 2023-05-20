import { Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';
import { Error } from 'mongoose';

const errorMiddleware = (err: ErrorHandler, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // wrong mongodb error (CastError)
  if (err instanceof Error.CastError) {
    const message = `resource not found: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error (MongoError)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = `json web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expires errors
  if (err.name === 'TokenExpiredError') {
    const message = `json web token is expired try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
