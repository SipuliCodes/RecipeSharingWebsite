import { IRecipe } from "../interfaces/recipeInterfaces";
import Recipe from '../models/recipe';


const getAllRecipes = async (): Promise<IRecipe[]> => {
  return await Recipe.find({});
};

const getOneRecipe = async (recipeId: string): Promise<IRecipe> => {
  console.log(recipeId);
  const recipe = await Recipe.findById(recipeId);
  if (recipe) return recipe;
  console.log(recipe);
  throw new Error('Recipe was not found');
};

export default {
  getAllRecipes,
  getOneRecipe
};