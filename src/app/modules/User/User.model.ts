import bcrypt from 'bcrypt';
/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose';
import { History, TUser } from './User.interface';
import config from '../../config';

const userPasswordHistory = new Schema<History>({
  password: {
    type: String, required: true
  },
  timestamp: {
    type: Date
  }
}, {
  _id: false
});

const UserSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    password: { type: String, required: true, select: 0 },
    passwordHistory: [{ type: userPasswordHistory }],
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;
  const hashPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  user.password = hashPassword
  const newPasswordEntry = {
    password: hashPassword,
    timestamp: new Date()
  };
  user.passwordHistory = [...(user.passwordHistory || []),newPasswordEntry]
    
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.passwordHistory;
    // delete ret.passwordChangedAt;
    delete ret.__v;
    return ret;
  },
});

export const user = model<TUser>('user', UserSchema);
