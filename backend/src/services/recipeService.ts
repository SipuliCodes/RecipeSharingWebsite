import mongoose from "mongoose";
import { BlobServiceClient } from "@azure/storage-blob";

import { IRecipe, NewRecipe, Comment } from "../interfaces/recipeInterfaces";
import { Recipe, User } from '../models';
import { CONNECTIONSTRING, RECIPEPIC_CONTAINER } from "../utils/config";


const getAllRecipes = async (filter: string): Promise<IRecipe[]> => {
  if (filter) {
    return await Recipe.find({ mealCategory: { $in: [filter] } });
  }

  return await Recipe.find({});
};

const getAllRecipesFromUser = async (user: string): Promise<IRecipe[]> => {
  const userId = new mongoose.Types.ObjectId(user);
  return await Recipe.find({ user: userId });
};

const getOneRecipe = async (recipeId: string): Promise<IRecipe> => {
  const recipe = await Recipe.findById(recipeId).populate({
    path: "user",
    select: "username",
  }).populate({
    path: "comments.user",
    select: "username"
  });
  if (recipe) return recipe;
  throw new Error('Recipe was not found');
};

const addRecipe = async (recipe: NewRecipe, userId: string): Promise<IRecipe> => {
  const addedRecipe = new Recipe(recipe);
  await User.findByIdAndUpdate(userId, { $push: { recipes: addedRecipe._id } });
  await addedRecipe.save();
  return addedRecipe;
};

const deleteRecipe = async (id: string, userId: string): Promise<boolean> => {
  const recipeToDelete = await Recipe.findById(id);
  if (recipeToDelete?.user.equals(new mongoose.Types.ObjectId(userId))) {
    await User.findByIdAndUpdate(userId, { $pull: { recipes: id } });
    await Recipe.findByIdAndDelete(recipeToDelete.id);
    return true;
  }
  return false;
};

const likeRecipe = async ({ id, liked, userId }: { id: string, liked: boolean, userId: string }): Promise<IRecipe> => {
  const recipeToLike = await Recipe.findById(id);
  if (!liked && recipeToLike?.likedBy.includes(userId)) {
    await User.findByIdAndUpdate(userId, { $pull: { likedRecipes: id } });
    const likedRecipe = await Recipe.findByIdAndUpdate(id, { likes: recipeToLike.likes - 1, likedBy: recipeToLike.likedBy.filter(id => id !== userId) }, { new: true });
    if (likedRecipe) {
      return await likedRecipe.save();
    }
  }
  if (liked && recipeToLike && !recipeToLike.likedBy.includes(userId)) {
    await User.findByIdAndUpdate(userId, { $push: { likedRecipes: id } });
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
    user: new mongoose.Types.ObjectId(userId),
    date
  };
  const commentedRecipe = await Recipe.findByIdAndUpdate(
    id,
    { $push: { comments: newComment } },
    { new: true }
  );
  if (commentedRecipe) {
    await commentedRecipe.save();
    return newComment;
  }
  throw new Error('Commenting was not possible');
};

const uploadPicture = async (
  recipeId: string,
  recipeName: string,
  username: string,
  fileContent: Express.Multer.File
): Promise<boolean> => {

  const connectionString = CONNECTIONSTRING;
  const containerName = RECIPEPIC_CONTAINER;

  const removeSpaces = (line: string) => {
    const words = line.split(" ");
    const wordsWithBigFirstLetter = words.map((word, index) =>
      index != 0
        ? word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
        : word.toLowerCase()
    );

    return wordsWithBigFirstLetter.join("");
  };
  const fileName = `${removeSpaces(recipeName)}-${username}-recipe`;

  if (!connectionString || !containerName) {
    throw new Error("Connection string or container name is missing");
  }

  try {
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    const buffer = fileContent.buffer;
    await blockBlobClient.upload(buffer, buffer.length);

    const fileUrl = blockBlobClient.url;
    await Recipe.findByIdAndUpdate(recipeId, { image: fileUrl });

    if (fileUrl) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Upload was not successful" + error);
  }
};

export default {
  getAllRecipes,
  getAllRecipesFromUser,
  getOneRecipe,
  addRecipe,
  deleteRecipe,
  likeRecipe,
  commentRecipe,
  uploadPicture
};