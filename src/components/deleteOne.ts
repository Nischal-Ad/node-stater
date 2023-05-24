/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '@Middleware/catchAsync'
import ErrorHandler from '@Utils/errorHandler'
import { Model } from 'mongoose'

const Delete = (Model: Model<any>, ModelFor: string) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id)

    if (!data) {
      return next(new ErrorHandler(`No ${ModelFor} found`, 404))
    }

    res.status(204).json({
      status: 'success',
    })
  })

export default Delete
