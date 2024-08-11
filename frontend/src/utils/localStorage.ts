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

export const setLanguageLocalStorage = (language: string) => {
  localStorage.setItem('lang', language);
};

export const getLanguage = (): string | null => {
  return localStorage.getItem('lang');
};
