import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './User.interface';
import { user } from './User.model';
import { passwordHelpers } from './User.utils';
import { jwtHelpers } from './User.JwtHelpers';
import config from '../../config';


const createUserIntoDB = async (payload: TUser) => {
  const result = await user.create(payload);
  return result;
};

const userLoginIntoDB = async (payload: {
  username: string;
  password: string;
}) => {
  const userData = await user
    .findOne({ username: payload?.username })
    .select('+password');
  if (!userData) {
    throw new Error('This user is not found ! please registration first');
  }
  const plainTextPassword = payload?.password;
  const hashedPassword = userData?.password;

  const isCorrectPassword = await passwordHelpers.comparePassword(
    plainTextPassword,
    hashedPassword,
  );

  if (!isCorrectPassword) {
    throw new Error('Password do not matched provide valid password');
  }
  const jwtPayload: JwtPayload = {
    _id: userData?._id,
    username: userData?.username,
    email: userData?.email,
    role: userData?.role,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_token as string,
    {
      expiresIn: config.jwt_expire_tiem as string,
    },
  );

  return {
    user: jwtPayload,
    accessToken,
  };
};


const userChangePassword = async (
  userData: JwtPayload,
  payload: {currentPassword: string, newPassword: string},
) => {
  const users = await user.findById(userData?._id).select(
    '+password +previousPassword',
  );
  if (!users) {
    throw new Error('user not fount');
  }

  if (!userData?.iat) {
    throw new Error('you are not Authorized');
  }

  // if (
  //   user.passwordChangedAt &&
  //   userData?.iat < user.passwordChangedAt.getTime() / 1000
  // ) {
  //   throw new Error('Old token you not authorized');
  // }

  const isCorrectPassword = await passwordHelpers.comparePassword(
    payload?.currentPassword,
    users?.password,
  );

  if (!isCorrectPassword) {
    throw new Error('Password do not matched provide valid password');
  }

  if (
    await passwordHelpers.comparePassword(payload?.newPassword, users?.password)
  ) {
    throw new Error(
      'The new password must be different from the current password',
    );
  }

  //compare new password use before old password
  const isPasswordUsedBefore = await Promise.all(
    (users?.passwordHistory || []).map(async (prevPassword) => {
      const isMatch = await passwordHelpers.comparePassword(
        payload?.newPassword,
        prevPassword?.password,
      );

      return isMatch
        ? { password: prevPassword, timestamp: prevPassword.timestamp }
        : null;
    }),
  );

  const matchingPassword = isPasswordUsedBefore?.find((match) => match);
  if (matchingPassword) {
    throw new Error(
      `This password has already been used (last used on(last used on ${matchingPassword?.timestamp} Please choose a new one.`,
    );
  }

  const newHashedPassword = await passwordHelpers.hashPassword(
    payload?.newPassword,
  );

  const updatedPreviousPasswords = [
    { password: newHashedPassword, timestamp: new Date() },
    ...(users?.passwordHistory || []).slice(0, 1),
  ];

  const updatePassword = await user.findByIdAndUpdate(
    userData?._id,
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
      passwordHistory: updatedPreviousPasswords,
    },
    {
      new: true,
    },
  );

  return updatePassword;
};




export const userServices = {
  createUserIntoDB,
  userLoginIntoDB,
  userChangePassword
};
