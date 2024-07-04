import { Recipe } from './recipeInterfaces';

export interface BasicUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export type SignupFormData = Omit<BasicUser, 'id'> & { confirmPassword: string }

export type LoggedInUser = Omit<BasicUser, 'password'> & {
  sentRequests?: string[];
  receivedRequests?: string[];
  friends: LoggedInUser[];
  recipes: Recipe[];
  likedRecipes?: Recipe[];
};

export interface LoggedInUserWithToken {
  user: LoggedInUser;
  token: string;
}

export type LoginFormData = Pick<BasicUser, 'username' | 'password'>

export type UserInRecipe = Pick<BasicUser, 'username'>

export type Friend = Omit<LoggedInUser, 'email' | 'friends' | 'likedRecipes' | 'recipes'>

