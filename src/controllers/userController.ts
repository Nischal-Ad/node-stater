import catchAsync from '../middleware/catchAsync';
import User from '../models/userModel/index';
import ErrorHandler from '../utils/errorHandler';

export const TestUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'this is for test purpose',
  });
});
