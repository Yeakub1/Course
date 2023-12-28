import { TCategory } from "./Category.interface";
import { Categorys } from "./Category.modle";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Categorys.create(payload);
  return result;
};
const getAllCategoryFromDB = async () => {
  const result = await Categorys.find().populate('createdBy');
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Categorys.findById(id);
  return result;
};
export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB
};
