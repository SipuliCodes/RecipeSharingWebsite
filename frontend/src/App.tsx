import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import { UserTokenContext, UserSetTokenContext, UserDetailsContext, UserSetDetailsContext } from './contexts/userContext.ts';
import { Token } from './interfaces/contextTypes.ts';
import { getLanguage, getToken } from './utils/localStorage.ts';
import { LoggedInUser } from './interfaces/userInterfaces.ts';
import { getUserData } from './services/userService.ts';
import PrivateRoute from './routes/PrivateRoute.tsx';
import OpenRoute from './routes/OpenRoute.tsx';
import HomePage from './components/HomePage/HomePage.tsx';
import LandingPage from './components/LandingPage/LandingPage.tsx';
import AddRecipe from './components/AddRecipe/AddRecipe.tsx';
import RecipePage from './components/RecipePage/RecipePage.tsx';
import SettingsPage from './components/SettingsPage/SettingsPage.tsx';
import { LanguageContext, SetLanguageContext } from './contexts/languageContext.ts';
import i18next from 'i18next';

const App = () => {
  const [token, setToken] = useState<Token>('');
  const [loading, setLoading] = useState(true);
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
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const localStorageLanguage = getLanguage();
    if (localStorageLanguage) {
      setLanguage(localStorageLanguage);
      i18next.changeLanguage(localStorageLanguage);
    }
    const localStorageToken = getToken();
    if (localStorageToken) {
      setToken(localStorageToken);
      getUserData(localStorageToken)
        .then((user) => setUser(user))
        .catch((error) => console.log(error));
    }
    setLoading(false);
  }, []);


  if (loading) {
    return;
  }

  return (
    <LanguageContext.Provider value={language}>
      <SetLanguageContext.Provider value={setLanguage}>
        <UserTokenContext.Provider value={token} >
          <UserSetTokenContext.Provider value={setToken}>
            <UserDetailsContext.Provider value={user}>
              <UserSetDetailsContext.Provider value={setUser}>
                <Router>
                  <Routes>
                    <Route path="/" element={<OpenRoute element={<LandingPage />} token={token} />} />
                    <Route path="/home" element={<PrivateRoute element={<HomePage />} token={token} />} />
                    <Route path="/add-recipe" element={<PrivateRoute element={<AddRecipe />} token={token} />} />
                    <Route path="/recipe/:id" element={<PrivateRoute element={<RecipePage />} token={token} />} />
                    <Route path="/friends" element={<PrivateRoute element={<HomePage />} token={token} />} />
                    <Route path="/:id/recipes" element={<PrivateRoute element={<HomePage />} token={token} />} />
                    <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} token={token} />} />
                    <Route path="/liked-recipes" element={<PrivateRoute element={<HomePage />} token={token} />} />
                  </Routes>
                </Router>
              </UserSetDetailsContext.Provider>
            </UserDetailsContext.Provider>
          </UserSetTokenContext.Provider>
        </UserTokenContext.Provider>
      </SetLanguageContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
