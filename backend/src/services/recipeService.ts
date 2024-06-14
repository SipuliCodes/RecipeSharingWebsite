import { IRecipe, NewRecipe } from "../interfaces/recipeInterfaces";
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

const addRecipe = async (recipe: NewRecipe): Promise<IRecipe> => {
  const addedRecipe = new Recipe(recipe);
  await addedRecipe.save();
  return addedRecipe;
};

export default {
  getAllRecipes,
  getOneRecipe,
  addRecipe
};