import { useState, useContext, useEffect } from 'react';

import Footer from '../Footer/Footer';
import './HomePage.css';
import Sidebar from './Sidebar/Sidebar';
import RecipeList from './RecipeList/RecipeList';
import { UserTokenContext } from '../../contexts/userContext';
import useAutoNavigation from '../../hooks/useAutoNavigation';
import { useLocation } from 'react-router-dom';
import FriendsPage from './FriendsPage/FriendsPage';
import { searchForUsers } from '../../services/userService';
import { BasicUser } from '../../interfaces/userInterfaces';
import useDebounce from '../../hooks/useDebounce';
import UserResult from './UserResult/UserResult';

const HomePage = () => {
  const [isChanged, setIsChanged] = useState(false);
  const token = useContext(UserTokenContext);
  const path = useLocation().pathname;
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<BasicUser[]>([]);

  useAutoNavigation('/', token, false);
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
    }
  }, [debounceSearch, token, path]);

  return (
    <div className='homepage-container'>
      <div className='home-header'>
        <button onClick={toggleClass} className={ isChanged ? 'change menu-button' : 'menu-button'}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        <div className='homepage-search-box'>
          <input onChange={handleChange} className='searchbar' placeholder='search'></input>
          {users.length !== 0 &&
          <div className='homepage-search-results'>
            {users.map(user => <UserResult user={user} />)}
          </div>}
        </div>
      </div>
      <div className={ isChanged ? 'change home-content' : 'home-content' }>
        <div className='home-sidebar'>
          <Sidebar />
        </div>
        <div className='home-content-center'>
          {path === '/home' && <RecipeList />}
          {path === '/friends' && <FriendsPage />}
        </div>
      </div>
      <Footer greenBackground={true} />
    </div>
  );
};

export default HomePage;