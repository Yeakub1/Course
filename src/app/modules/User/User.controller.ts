import { userServices } from './User.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result.role} is created successfuly`,
    data: result,
    
  }) ;
  ;
});

const userLogin = catchAsync(async (req, res) => {
  const result = await userServices.userLoginIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is Login successfuly`,
    data: result,
    
  }) ;
  ;
});


const userChangePassword= catchAsync(async (req, res) => {
  const result = await userServices.userChangePassword(req.user,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User Password Change successfuly`,
    data: result,
    
  }) ;
  ;
});



export const userControllers = {
  createUser,
  userLogin,
  userChangePassword
};
