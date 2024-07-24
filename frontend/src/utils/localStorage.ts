import { Token } from '../interfaces/contextTypes';

export const setToken = (token: Token) => {
  localStorage.setItem('jwt', token);
};

export const getToken = (): Token | null => {
  return localStorage.getItem('jwt');
};

export const removeToken = () => {
  localStorage.removeItem('jwt');
};