import { createContext, Dispatch, SetStateAction } from 'react';

import { Token } from '../interfaces/contextTypes';

export const UserTokenContext = createContext<Token>(null);
export const UserSetTokenContext = createContext<Dispatch<SetStateAction<Token>>>(() => {});

