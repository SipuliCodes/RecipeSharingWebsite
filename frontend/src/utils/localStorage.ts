import { Token } from '../interfaces/contextTypes';
import { LoggedInUser } from '../interfaces/userInterfaces';

export const setToken = (token: Token) => {
  localStorage.setItem('jwt', token);
};

export const getToken = (): Token | null => {
  return localStorage.getItem('jwt');
};

export const removeToken = () => {
  localStorage.removeItem('jwt');
};

export const setUser = (user: LoggedInUser) => {
  localStorage.setItem('recipe-app-user', JSON.stringify(user));
};

export const getUser = (): LoggedInUser | null => {
  const userAsString = localStorage.getItem('recipe-app-user');
  if (userAsString)
  {
    const user = JSON.parse(userAsString);
    return user;
  }
  return null;
};

export const removeUser = () => {
  localStorage.removeItem('recipe-app-user');
};