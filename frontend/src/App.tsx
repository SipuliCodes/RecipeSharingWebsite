import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import router from './Routes.tsx';
import { UserTokenContext, UserSetTokenContext } from './contexts/userContext.ts';
import { Token } from './interfaces/contextTypes.ts';
import { getToken } from './utils/localStorage.ts';

const App = () => {
  const [token, setToken] = useState<Token>('');

  useEffect(() => {
    const localStorageToken = getToken();
    if (localStorageToken) setToken(localStorageToken);
  }, []);

  return (
    <UserTokenContext.Provider value={token} >
      <UserSetTokenContext.Provider value={setToken}>
        <RouterProvider router={router} />
      </UserSetTokenContext.Provider>
    </UserTokenContext.Provider>
  );
};

export default App;
