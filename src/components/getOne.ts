/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '@Middleware/catchAsync'
import { DispalyError } from '@Utils/errorHandler'
import { Model } from 'mongoose'

const GetOne = (Model: Model<any>, ModelFor: string) =>
  catchAsync(async (req, res) => {
    const data = await Model.findById(req.params.id)

    if (!data) {
      DispalyError(`No ${ModelFor} found`, 404)
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: data,
      },
    })
  })

export default GetOne
