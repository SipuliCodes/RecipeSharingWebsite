import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import router from './Routes.tsx';
import { UserTokenContext, UserSetTokenContext, UserDetailsContext, UserSetDetailsContext } from './contexts/userContext.ts';
import { Token } from './interfaces/contextTypes.ts';
import { getToken } from './utils/localStorage.ts';
import { LoggedInUser } from './interfaces/userInterfaces.ts';
import { getUserData } from './services/userService.ts';

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
    if (localStorageToken) {
      setToken(localStorageToken);
      getUserData(localStorageToken)
        .then((user) => setUser(user))
        .catch((error) => console.log(error));
    }
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
