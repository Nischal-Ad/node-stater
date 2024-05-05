/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '@Middleware/catchAsync'
import { Model } from 'mongoose'

const GetOne = (Model: Model<any>, ModelFor: string) =>
  catchAsync(async (req, res) => {
    const data = await Model.findById(req.params.id)

    if (!data) {
      throw `No ${ModelFor} found`
    }

    res.status(200).json({
      status: 'success',
      data,
    })
  })

export default GetOne
