import { useState, useContext, useEffect } from 'react';

import Footer from '../Footer/Footer';
import './HomePage.css';
import Sidebar from './Sidebar/Sidebar';
import RecipeList from './RecipeList/RecipeList';
import { UserTokenContext } from '../../contexts/userContext';

import { useLocation, useParams } from 'react-router-dom';
import FriendsPage from './FriendsPage/FriendsPage';
import { searchForUsers } from '../../services/userService';
import { BasicUser, LoggedInUser } from '../../interfaces/userInterfaces';
import useDebounce from '../../hooks/useDebounce';
import UserResult from './UserResult/UserResult';
import { getOneUser } from '../../services/userService';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';

const HomePage = () => {
  const {t} = useTranslation('translation', {keyPrefix: 'homePage'});

  const [isChanged, setIsChanged] = useState(false);
  const token = useContext(UserTokenContext);
  const path = useLocation().pathname;
  const { id: userId } = useParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<BasicUser[]>([]);
  const [user, setUser] = useState<LoggedInUser | null>();

  const debounceSearch = useDebounce(search, 300);

  const toggleClass = () => {
    setIsChanged(!isChanged);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    if (path === '/friends') {
      searchForUsers(debounceSearch, token)
        .then((users) => setUsers(users))
        .catch((error) => console.log(error));
      setUser(null);
    }
    if (path.endsWith('/recipes') && userId) {
      getOneUser(userId, token)
        .then(user => setUser(user))
        .catch(error => console.log(error));
    }
  }, [debounceSearch, token, path, userId]);

  return (
    <div className='homepage-container'>
      <div className='home-header'>
        <button onClick={toggleClass} className={ isChanged ? 'change menu-button' : 'menu-button'}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        <h1 className='home-h1'>{user ? `${user.username}${t('userRecipes')}` : path === '/liked-recipes' ? t('likedRecipes') : path==='/home' ? t('recipes'): ''}</h1>
        <button className='menu-button invisible'>
          <div className="bar1 invisible"></div>
          <div className="bar2 invisible"></div>
          <div className="bar3 invisible"></div>
        </button>
        <div className='homepage-search-box'>
          <input onChange={handleChange} value={search} className='searchbar' placeholder={t('search') }></input>
          {users.length !== 0 &&
          <div className='homepage-search-results'>
            {users.map(user => <UserResult setSearch={setSearch} setUsers={setUsers} user={user} t={t} />)}
          </div>}
        </div>
        <LanguageDropdown />
      </div>
      <div className={ isChanged ? 'change home-content' : 'home-content' }>
        <div className='home-sidebar'>
          <Sidebar toggleClass={toggleClass} t={t} />
        </div>
        <div className='home-content-center'>
          {path === '/home' && <RecipeList userId='' liked={false} t={t} />}
          {path === '/friends' && <FriendsPage />}
          {path.endsWith('/recipes') && <RecipeList userId={userId} liked={false} t={t} />}
          {path === '/liked-recipes' && <RecipeList userId='' liked={true} t={t} />}
        </div>
      </div>
      <Footer greenBackground={true} />
    </div>
  );
};

export default HomePage;