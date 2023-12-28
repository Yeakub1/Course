import { Model, Types } from "mongoose";

export type TCategory = {
  name: string;
  createdBy?: Types.ObjectId;
};

export interface categoryModle extends Model<TCategory> {
  // eslint-disable-next-line no-unused-vars
  isUserExits(id: string): Promise<TCategory | null>;
}