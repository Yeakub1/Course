import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { courseServices } from './Course.services';

const createCourse = catchAsync(async (req, res) => {
  const course = req.body
  course.createdBy = req.user?._id
  const result = await courseServices.createCourseIntoDB(course);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfuly',
    data: result,
  });
});


const allCourseFiltaring = catchAsync(async (req, res) => {
  const allQuery = req.query;
  const result = await courseServices.getAllCourseFromDB(allQuery);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses is fetched succesfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getSingleCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});


const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const updateData = req.body;
  const result = await courseServices.updateCourseFromDB(updateData, courseId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'CourseData Updated Successfully',
    data: result,
  });
});

const getSingleCourseReview = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const result = await courseServices.getSingleCourseReviewFromDb(courseId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getBestCourseFormDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best Course Retrived Successfully',
    data: result,
  });
});


export const courseControllers = {
  createCourse,
  allCourseFiltaring,
  getSingleCourse,
  updateCourse,
  getSingleCourseReview,
  getBestCourse,
};
