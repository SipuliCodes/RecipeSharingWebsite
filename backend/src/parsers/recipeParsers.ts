import { isString, isDate, isNumber, isStringList, isCommentList, isBoolean } from "./parserHelpers";
import { Comment } from "../interfaces/recipeInterfaces";

export const parseId = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error("Incorrect id");
  }

  return id;
};

export const parseTitle = (title: unknown): string => {
  if (!isString(title)) {
    throw new Error("Incorrect title");
  }

  return title;
};

export const parseImage = (image: unknown): string => {
  if (!isString(image)) {
    throw new Error("Incorrect image");
  }

  return image;
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

export const parseMealCategory = (mealCategory: unknown): string[] => {
  if (!isStringList(mealCategory)) {
    throw new Error("Incorrect steps");
  }

  return mealCategory;
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

export const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect comment');
  }
  return comment;
};

export const parseComments = (comments: unknown): Comment[] => {
  if (!isCommentList(comments)) {
    throw new Error("Incorrect comments");
  }

  return comments;
};

export const parseLikedBy = (likedBy: unknown): string[] => {
  if (!isStringList(likedBy)) {
    throw new Error("Incorrect likers");
  }

  return likedBy;
};

export const parseLiked = (liked: unknown): boolean => {
  if (!isBoolean(liked)) {
    throw new Error("Incorrect liked");
  }

  return liked;
};
