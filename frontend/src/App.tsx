import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import router from './Routes.tsx';
import { UserTokenContext, UserSetTokenContext, UserDetailsContext, UserSetDetailsContext } from './contexts/userContext.ts';
import { Token } from './interfaces/contextTypes.ts';
import { getToken, getUser } from './utils/localStorage.ts';
import { LoggedInUser } from './interfaces/userInterfaces.ts';

const App = () => {
  const [token, setToken] = useState<Token>('');
  const [user, setUser] = useState<LoggedInUser>({
    'firstName': '',
    'lastName': '',
    'username': '',
    'email': '',
    'friends': [],
    'id': 'id',
    'recipes': [],
    'likedRecipes': []
  });

  useEffect(() => {
    const localStorageToken = getToken();
    const localStorageUser = getUser();
    if (localStorageToken) setToken(localStorageToken);
    if (localStorageUser) setUser(localStorageUser);
  }, []);

  return (
    <UserTokenContext.Provider value={token} >
      <UserSetTokenContext.Provider value={setToken}>
        <UserDetailsContext.Provider value={user}>
          <UserSetDetailsContext.Provider value={setUser}>
            <RouterProvider router={router} />
          </UserSetDetailsContext.Provider>
        </UserDetailsContext.Provider>
      </UserSetTokenContext.Provider>
    </UserTokenContext.Provider>
  );
};

export default App;
