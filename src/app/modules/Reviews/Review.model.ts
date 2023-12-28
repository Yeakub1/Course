import { Schema, model } from 'mongoose';
import { TReview } from './Review.interface';

export const reviewSchema = new Schema<TReview>({
  courseId: { type: Schema.Types.ObjectId, required: true },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  review: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'user'}
});
export const reviewModel = model<TReview>('Review', reviewSchema);
