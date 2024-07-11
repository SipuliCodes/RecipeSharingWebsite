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

export type ChangeUserDetails = Pick<BasicUser, 'firstName' | 'lastName' | 'email'>

export type LoggedInUser = Omit<BasicUser, 'password'> & {
  sentRequests?: BasicUser[];
  receivedRequests?: BasicUser[];
  friends: Friend[];
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

