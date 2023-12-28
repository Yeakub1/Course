import { reviewControllers } from './Review.controller';
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { reviewValidation } from './Review.validation';
import checkAuth from '../../middleware/ChackAuth';
import { USER_ROLE } from '../User/User.constant';

const router = express.Router();

router.post(
  '/',
  checkAuth(USER_ROLE.user),
  validateRequest(reviewValidation.createReviewVlidationSchema),
  reviewControllers.createReview,
);

router.get('/', reviewControllers.getAllReview);

export const ReviewRoute = router;
