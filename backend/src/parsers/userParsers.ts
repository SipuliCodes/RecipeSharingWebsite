import mongoose from "mongoose";
import { isString } from "./parserHelpers";

export const parseFirstName = (firstName: unknown): string => {
  if (!firstName || !isString(firstName)) {
    throw new Error('Incorrect or missing first name');
  }

  return firstName;
};

export const parseLastName = (lastName: unknown): string => {
  if (!lastName || !isString(lastName)) {
    throw new Error('Incorrect or missing last name');
  }

  return lastName;
};

export const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error('Incorrect or missing username');
  }

  return username;
};

export const parseUser = (user: unknown): mongoose.Schema.Types.ObjectId => {
  if (!user || !isString(user)) {
    throw new Error("Incorrect or missing username");
  }

  return new mongoose.Schema.Types.ObjectId(user);
};

export const parseEmail = (email: unknown): string => {
  if (!email || !isString(email)) {
    throw new Error('Incorrect or missing first name');
  }

  return email;
};

export const parsePassword = (password: unknown): string => {
  if (!password || !isString(password)) {
    throw new Error('Incorrect or missing password');
  }

  return password;
};

