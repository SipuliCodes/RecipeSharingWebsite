import { Types } from "mongoose";


export interface Comment {
  user: Types.ObjectId
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
  mealCategory: string[];
  user: Types.ObjectId;
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
export type NewRecipeRequest = Omit<NewRecipe, 'user' | 'likes' | 'likedBy' | 'date' | 'comments'>;

export type LikeRecipe = { liked: boolean };
