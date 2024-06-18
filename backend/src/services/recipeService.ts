import mongoose from "mongoose";
import { IRecipe, NewRecipe, Comment } from "../interfaces/recipeInterfaces";
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

const deleteRecipe = async (id: string, userId: string): Promise<boolean> => {
  const recipeToDelete = await Recipe.findById(id);
  console.log(recipeToDelete?.user);
  if (recipeToDelete?.user === new mongoose.Schema.Types.ObjectId(userId)) {
    await Recipe.findByIdAndDelete(recipeToDelete.id);
    return true;
  }
  return false;
};

const likeRecipe = async ({ id, liked, userId }: { id: string, liked: boolean, userId: string }): Promise<IRecipe> => {
  const recipeToLike = await Recipe.findById(id);
  if (!liked && recipeToLike?.likedBy.includes(userId)) {
    const likedRecipe = await Recipe.findByIdAndUpdate(id, { likes: recipeToLike.likes - 1, likedBy: recipeToLike.likedBy.filter(id => id !== userId) }, { new: true });
    if (likedRecipe) {
      return await likedRecipe.save();
    }
  }
  if (liked && recipeToLike && !recipeToLike.likedBy.includes(userId)) {
    const likedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        likes: recipeToLike.likes + 1,
        likedBy: recipeToLike.likedBy.concat(userId),
      },
      { new: true }
    );
    if (likedRecipe) {
      return await likedRecipe.save();
    }
  }
  
  throw new Error('Liking was not possible');
};

const commentRecipe = async ({id, comment, userId }: { id: string, comment: string, userId: string}): Promise<Comment> => {
  const date: string = new Date().toISOString();
  const newComment: Comment = {
    comment,
    user: new mongoose.Schema.Types.ObjectId(userId),
    date
  };
  const recipeToComment = await Recipe.findById(id);
  const commentedRecipe = await Recipe.findByIdAndUpdate(id, { comments: recipeToComment?.comments.concat(newComment) }, {new: true});
  if (commentedRecipe) {
    await commentedRecipe.save();
    return newComment;
  }
  throw new Error('Commenting was not possible');
};

export default {
  getAllRecipes,
  getOneRecipe,
  addRecipe,
  deleteRecipe,
  likeRecipe,
  commentRecipe
};