import catchAsync from '@Middleware/catchAsync'
import { DispalyError } from '@Utils/errorHandler'

export const TestUser = catchAsync(async (req, res) => {
  const user = ['dad', 'rams', 'shyam']

  if (!user.includes('ramss')) {
    DispalyError('user not found', 404)
  }
  res.status(200).json({
    success: true,
    message: 'this is for test purpose',
  })
})
