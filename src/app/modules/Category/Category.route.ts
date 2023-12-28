import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CategoryValidation } from './Category.validation';
import { CategoryControllers } from './Category.controller';
import checkAuth from '../../middleware/ChackAuth';
import { USER_ROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/',
  checkAuth(USER_ROLE.admin),
  validateRequest(CategoryValidation.createCategoryVlidationSchema),
  CategoryControllers.createCategory,
);
router.get('/:categoryId', CategoryControllers.getSingleCategory);
router.get('/', CategoryControllers.getAllCategory);
export const CategoryRoute = router;
