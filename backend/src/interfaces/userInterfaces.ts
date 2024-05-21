import { Types } from "mongoose";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  friends?: string[];
}

export type NewUser = Omit<IUser, 'id'>;

export interface IUserDocument extends Document, Omit<IUser, 'id'> {
  _id: Types.ObjectId;
  __v: string;
}
