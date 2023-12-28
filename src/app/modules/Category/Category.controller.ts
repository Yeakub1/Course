import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./Category.services";

const createCategory = catchAsync(async (req, res) => {
  const category = req.body;
  category.createdBy= req.user?._id
  const result = await CategoryServices.createCategoryIntoDB(category);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is created successfuly',
    data: result,
  });
});


const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category are retrieved successfully',
    data: {categories:result },
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDB(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});


export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory
};
