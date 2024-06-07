import { Token } from '../interfaces/contextTypes';

export const setToken = (token: string) => {
  localStorage.setItem('jwt', token);
};

export const getToken = (): Token => {
  return localStorage.getItem('jwt');
};

export const removeToken = () => {
  localStorage.removeItem('jwt');
};