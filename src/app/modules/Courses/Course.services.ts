/* eslint-disable @typescript-eslint/no-explicit-any */
import { Courses } from './Course.modle';
import { TCourse } from './Course.interface';
import buildQuery, { QueryParams } from '../../buillder/buildQuery';
import mongoose, { Error, Types } from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Courses.create(payload);
  return result;
};

const getAllCourseFromDB = async (
  queryParams: QueryParams,
): Promise<{
  meta: { total: number; page: number; limit: number };
  result: TCourse[];
}> => {
  const page = (queryParams?.page as number) || 1;
  const limit = (queryParams?.limit as number) || 10;
  const query = buildQuery(queryParams);
  const total = await Courses?.countDocuments(query);

  const sortCriteria: Record<string, any> = {};
  if (
    queryParams?.sortBy &&
    [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
    ].includes(queryParams?.sortBy)
  ) {
    sortCriteria[queryParams.sortBy] =
      queryParams?.sortOrder === 'asc' ? 1 : -1;
  }

  const result = await Courses.find(query)
    .populate('createdBy')
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const meta = {
    total: total,
    page: page,
    limit: limit,
  };

  return { meta, result };
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Courses.findById(id)
    .populate('categoryId')
    .populate('createdBy')
    .populate({
      path: 'reviews',
      populate: { path: 'createdBy', options: { strictPopulate: false } },
    });
  return result;
};

const updateCourseFromDB = async (
  payload: Partial<TCourse>,
  courseId: string,
) => {
  const { tags, details, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();
  let updatedResult;
  try {
    session.startTransaction();
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingCourseData,
    };
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedUpdatedData[`details.${key}`] = value;
      }
    }
    const updatedBasiCourse = await Courses.findByIdAndUpdate(
      courseId,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
        session,
      },
    ).populate('createdBy');

    if (!updatedBasiCourse) {
      throw new Error('Failed to update course Successfully');
    }
    updatedResult = updatedBasiCourse;
    if (tags && tags.length > 0) {
      const deletedtags = tags
        
        .filter((el) => el?.name && el?.isDeleted)
        .map((el) => el?.name);

      const deletedtagss = await Courses.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            tags: { name: { $in: deletedtags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedtagss) {
        throw new Error('Failed to update tags Successfully');
      }
      updatedResult = deletedtagss;

      // filter out the new course fields
      const newAddTag = tags?.filter((el) => el.name && !el.isDeleted);

      const newTagsAdd = await Courses.findByIdAndUpdate(
        courseId,
        {
          $addToSet: { tags: { $each: newAddTag } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newTagsAdd) {
        throw new Error('Failed to add new tags Successfully');
      }

      updatedResult = newTagsAdd;
    }
    await session.commitTransaction();
    await session.endSession();
    return updatedResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to update course Successfully');
  }
};

const getSingleCourseReviewFromDb = async (courseId: string) => {
  const result = await Courses.aggregate([
    {
      $match: { _id: new Types.ObjectId(courseId) },
    },
    {
      $lookup: {
        from: 'categories', 
        localField: '_id',
        foreignField: 'categoryId',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'users', 
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdByUser',
      },
    },
    {
      $lookup: {
        from: 'reviews', 
        localField: '_id',
        foreignField: 'courseId',
        as: 'courseReviews',
      },
    },
  ]);

  if (result.length === 0) {
    throw new Error('Course not found');
  }

  return result[0]; 
};

const getBestCourseFormDb = async () => {
  const reslut = await Courses.aggregate([]);

  return reslut;
};



export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  getSingleCourseReviewFromDb,
  getBestCourseFormDb,
};
