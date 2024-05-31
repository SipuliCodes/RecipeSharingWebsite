import { Comment } from "../interfaces/recipeInterfaces";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (number: unknown): number is number => {
  return typeof number === "number" && !isNaN(number);
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isComment = (comment: unknown): comment is Comment => {
  return (!!comment && typeof comment === 'object' && 'username' in comment && isString(comment.username)
  && 'comment' in comment && isString(comment.comment) && 'date' in comment && isString(comment.date) && isDate(comment.date));
};

export const isStringList = (list: unknown): list is string[] => {
  if (Array.isArray(list)) {
    return list.every((item) => isString(item));
  }
  return false;
};

export const isCommentList = (list: unknown): list is Comment[] => {
  if (Array.isArray(list)) {
    return list.every((item) => isComment(item));
  }
  return false;
};


