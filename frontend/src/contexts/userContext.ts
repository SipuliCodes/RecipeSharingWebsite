import { createContext, Dispatch, SetStateAction } from 'react';

import { Token } from '../interfaces/contextTypes';
import { LoggedInUser } from '../interfaces/userInterfaces';

export const UserTokenContext = createContext<Token>('');
export const UserSetTokenContext = createContext<Dispatch<SetStateAction<Token>>>(() => {});
export const UserDetailsContext = createContext<LoggedInUser>({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  recipes: [],
  friends: [],
  id: ''
});
export const UserSetDetailsContext = createContext<Dispatch<SetStateAction<LoggedInUser>>>(() => { });
