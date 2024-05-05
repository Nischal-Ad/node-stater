/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '@Middleware/catchAsync'
import { Model } from 'mongoose'

const Delete = (Model: Model<any>, ModelFor: string) =>
  catchAsync(async (req, res) => {
    const data = await Model.findByIdAndDelete(req.params.id)

    if (!data) {
      throw `No ${ModelFor} found`
    }

    res.status(204).json({
      status: 'success',
    })
  })

export default Delete
