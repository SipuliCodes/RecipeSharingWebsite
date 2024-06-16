import { Types } from "mongoose";

export interface Comment {
  username: string;
  comment: string;
  date: string;
}

export interface IRecipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  username: string;
  likes: number;
  likedBy: string[];
  date: string;
  comments: Comment[];
}

export interface IRecipeDocument extends Document, Omit<IRecipe, "id"> {
  _id: Types.ObjectId;
  __v: string;
}

export type NewRecipe = Omit<IRecipe, 'id'>;

export type LikeRecipe = Pick<IRecipe, 'likes' | 'likedBy'>;
