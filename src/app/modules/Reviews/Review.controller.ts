import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './Review.services';

const createReview = catchAsync(async (req, res) => {
  const review = req.body
  review.createdBy = req.user?._id;
  const result = await reviewServices.createReviewIntoDB(review);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is created successfuly',
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});



export const reviewControllers = {
  createReview,
  getAllReview,
};
