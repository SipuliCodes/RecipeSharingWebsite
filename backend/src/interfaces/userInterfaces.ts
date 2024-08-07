import { Types } from "mongoose";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  friends?: Types.ObjectId[];
  sentRequests?: Types.ObjectId[];
  receivedRequests?: Types.ObjectId[];
  recipes?: Types.ObjectId[];
  likedRecipes?: Types.ObjectId[];
  profilePicUrl?: string
}

export type LoginUser = Pick<IUser, 'username' | 'password'>;

export type NewUser = Omit<IUser, 'id'>;

export type NewUserDetails = Pick<NewUser, 'firstName' | 'lastName' | 'email'>;

export interface NewAndOldPassword {
  newPassword: string;
  oldPassword: string;
}

export interface IUserDocument extends Document, Omit<IUser, 'id'> {
  _id: Types.ObjectId;
  __v: string;
}
