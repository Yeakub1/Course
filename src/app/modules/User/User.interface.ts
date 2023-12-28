/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  username: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  passwordHistory?: History[];
};

export type History = {
  password: string;
  timestamp: Date
}

export interface UserModle extends Model<TUser> {
  isUserExits(id: string): Promise<TUser | null>;
}
