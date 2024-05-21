const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

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

export const parseSecret = (secret: unknown): string => {
  if (!secret || !isString(secret)) {
    throw new Error('Missing secret');
  }

  return secret;
};