import { LoggedInUser, UserInRecipe } from './userInterfaces';

export type Comment = {
  user: LoggedInUser;
  comment: string;
  date: string;
};

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  mealCategory: string[];
  user: UserInRecipe;
  likes: number;
  date: string;
  comments: Comment[];
  likedBy: string[];
}

export type NewRecipe = Omit<Recipe, 'id'>

export type RecipeFormData = Pick<Recipe, 'title' | 'image' | 'description' | 'ingredients' | 'steps' | 'mealCategory' >
