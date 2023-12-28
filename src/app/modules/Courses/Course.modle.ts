import { Schema, model } from 'mongoose';
import { TTag, TCourseDetails, TCourse, courseModle } from './Course.interface';
import { reviewModel } from '../Reviews/Review.model';

const courseTagSchema = new Schema<TTag>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    message: '{VALUE} is not valid',
  },
  isDeleted: { type: Boolean, default: false },
});

const courseDetailsSchema = new Schema<TCourseDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  description: { type: String, required: [true, 'description is Required'] },
});

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Categorys' },
    price: { type: Number, required: true },
    tags: [{ type: courseTagSchema, required: true }],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: { type: courseDetailsSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

courseSchema.virtual('reviews', {
  ref: reviewModel,
  localField: '_id',
  foreignField: 'courseId',
  justOne: false,
});

courseSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHistory;
    delete ret.__v;
    return ret;
  },
});

courseSchema.pre('save', function (next) {
  if (!this.durationInWeeks) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const durationInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    this.durationInWeeks = Math.ceil(durationInDays / 7);
  }
  next();
});

export const Courses = model<TCourse, courseModle>('Courses', courseSchema);
