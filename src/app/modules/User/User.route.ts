import { userControllers } from './User.controller';
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './User.validation';
import checkAuth from '../../middleware/ChackAuth';
import { USER_ROLE } from './User.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createuserValidationSchema),
  userControllers.createUser,
);

router.post(
  '/login',
  validateRequest(userValidation.loginValidationSchema),
  userControllers.userLogin,
);

router.post(
  '/change-password',
  checkAuth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidation.passwordChangeValidation),
  userControllers.userChangePassword,
);

export const UserRoute = router;
