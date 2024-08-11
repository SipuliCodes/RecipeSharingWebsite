import { createContext, Dispatch, SetStateAction } from 'react';

export const LanguageContext = createContext('');
export const SetLanguageContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => {});
