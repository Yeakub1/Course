import { TReview } from './Review.interface';
import { reviewModel } from './Review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const result = await reviewModel.create(payload);
  return result;
};

const getAllReviewFromDB = async () => {
  const result = await reviewModel.find().populate('createdBy');
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
  getAllReviewFromDB,
};
