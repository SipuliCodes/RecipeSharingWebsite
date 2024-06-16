import { IRecipe, NewRecipe } from "../interfaces/recipeInterfaces";
import Recipe from '../models/recipe';


const getAllRecipes = async (): Promise<IRecipe[]> => {
  return await Recipe.find({});
};

const getOneRecipe = async (recipeId: string): Promise<IRecipe> => {
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

const deleteRecipe = async (id: string, username: string): Promise<boolean> => {
  const recipeToDelete = await Recipe.findById(id);
  console.log(recipeToDelete?.username);
  console.log(username);
  if (recipeToDelete?.username === username) {
    await Recipe.findByIdAndDelete(recipeToDelete.id);
    return true;
  }
  return false;
};

const likeRecipe = async ({ id, likes, likedBy }: { id: string, likes: number, likedBy: string[] }): Promise<IRecipe> => {
  console.log(likes);
  console.log(likedBy);
  const recipeToLike = await Recipe.findByIdAndUpdate(id, {likes: likes, likedBy: likedBy}, {new: true});
  if (recipeToLike) {
    return await recipeToLike.save();
  }
  throw new Error('Recipe to modify was not found');
};

export default {
  getAllRecipes,
  getOneRecipe,
  addRecipe,
  deleteRecipe,
  likeRecipe
};