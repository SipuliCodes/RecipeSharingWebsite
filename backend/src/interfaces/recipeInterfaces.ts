import mongoose from "mongoose";

export interface Comment {
  user: mongoose.Schema.Types.ObjectId
  comment: string;
  date: string;
}

export type NewComment = Pick<Comment, 'comment'>;

export interface IRecipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  user: mongoose.Schema.Types.ObjectId;
  likes: number;
  likedBy: string[];
  date: string;
  comments: Comment[];
}

export interface IRecipeDocument extends Document, Omit<IRecipe, "id"> {
  _id: mongoose.Schema.Types.ObjectId;
  __v: string;
}

export type NewRecipe = Omit<IRecipe, 'id'>;

export type LikeRecipe = { liked: boolean };
