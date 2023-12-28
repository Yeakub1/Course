import { ReviewRoute } from './../modules/Reviews/Review.route';
import { Router } from 'express';
import { courseRoute } from '../modules/Courses/Course.route';
import { CategoryRoute } from '../modules/Category/Category.route';
import { UserRoute } from '../modules/User/User.route';


const router = Router();

const moduleRoute = [
  {
    path: '/course',
    route: courseRoute,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/reviews',
    route: ReviewRoute,
  },
  {
    path: '/auth',
    route: UserRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
