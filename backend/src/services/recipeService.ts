import { IRecipe } from "../interfaces/recipeInterfaces";
import Recipe from '../models/recipe';


const getAllRecipes = async (): Promise<IRecipe[]> => {
  return await Recipe.find({});
};

export default {
  getAllRecipes,
};