import { Model, Types } from "mongoose";
import { TReview } from "../Reviews/Review.interface";

export type TTag= {
  name: string;
  isDeleted: boolean;
}

export type TCourseDetails ={
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TCourseDetails;
  createdBy?: Types.ObjectId;
  reviews?: TReview[];
};



export interface courseModle extends Model<TCourse> {
  // eslint-disable-next-line no-unused-vars
  isUserExits(id: string): Promise<TCourse | null>
}
