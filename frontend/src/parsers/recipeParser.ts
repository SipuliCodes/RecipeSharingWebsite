const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' && !isNaN(number);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isStringList = (list: unknown): list is string[] => {
  if (Array.isArray(list)) {
    return list.every((item) => isString(item));
  }
  return false;
};

export const parseTitle = (title: unknown): string => {
  if (!isString(title)) {
    throw new Error('Incorrect title');
  }

  return title;
};

export const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect description');
  }

  return description;
};

export const parseIngredients = (ingredients: unknown): string[] => {
  if (!isStringList(ingredients)) {
    throw new Error('Incorrect ingredients');
  }

  return ingredients;
};

export const parseSteps = (steps: unknown): string[] => {
  if (!isStringList(steps)) {
    throw new Error('Incorrect steps');
  }

  return steps;
};

export const parseUsername = (username: unknown): string => {
  if (!isString(username)) {
    throw new Error('Incorrect username');
  }

  return username;
};

export const parseLikes = (likes: unknown): number => {
  if (!isNumber(likes)) {
    throw new Error('Incorrect likes');
  }

  if (likes < 0) {
    throw new Error('Likes can\'t be negative');
  }

  return likes;
};

export const parseDate = (date: unknown): Date => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date');
  }
};
