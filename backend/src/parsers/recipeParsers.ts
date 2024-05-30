import { isString, isDate, isNumber, isStringList, isCommentList } from "./parserHelpers";

export const parseTitle = (title: unknown): string => {
  if (!isString(title)) {
    throw new Error("Incorrect title");
  }

  return title;
};

export const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect description");
  }

  return description;
};

export const parseIngredients = (ingredients: unknown): string[] => {
  if (!isStringList(ingredients)) {
    throw new Error("Incorrect ingredients");
  }

  return ingredients;
};

export const parseSteps = (steps: unknown): string[] => {
  if (!isStringList(steps)) {
    throw new Error("Incorrect steps");
  }

  return steps;
};

export const parseUsername = (username: unknown): string => {
  if (!isString(username)) {
    throw new Error("Incorrect username");
  }

  return username;
};

export const parseLikes = (likes: unknown): number => {
  if (!isNumber(likes)) {
    throw new Error("Incorrect likes");
  }

  if (likes < 0) {
    throw new Error("Likes can't be negative");
  }

  return likes;
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date");
  }

  return date;
};

export const parseComments = (comments: unknown): Comment[] => {
  if (!isCommentList(comments)) {
    throw new Error("Incorrect comments");
  }

  return comments;
};


/*
title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  username: string;
  likes: number;
  date: Date;
  comments: Comment[];
  */
