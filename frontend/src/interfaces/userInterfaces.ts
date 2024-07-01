import { Recipe } from './recipeInterfaces';

export interface BasicUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export type SignupFormData = BasicUser & { confirmPassword: string }

export type LoggedInUser = Omit<BasicUser, 'password'> & {
  friends: LoggedInUser[];
  recipes: Recipe[];
  likedRecipes: Recipe[];
  id: string;
};

export interface LoggedInUserWithToken {
  user: LoggedInUser;
  token: string;
}

export type LoginFormData = Pick<BasicUser, 'username' | 'password'>

export type UserInRecipe = Pick<BasicUser, 'username'>

export type Friend = Omit<LoggedInUser, 'email' | 'friends' | 'likedRecipes' | 'recipes'>

