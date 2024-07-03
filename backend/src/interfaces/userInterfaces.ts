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
}

export type LoginUser = Pick<IUser, 'username' | 'password'>;

export type NewUser = Omit<IUser, 'id'>;

export interface IUserDocument extends Document, Omit<IUser, 'id'> {
  _id: Types.ObjectId;
  __v: string;
}
