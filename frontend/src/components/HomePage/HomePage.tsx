import { useState, useContext } from 'react';

import Footer from '../Footer/Footer';
import './HomePage.css';
import Sidebar from './Sidebar/Sidebar';
import RecipeList from './RecipeList/RecipeList';
import { UserTokenContext } from '../../contexts/userContext';
import useAutoNavigation from '../../hooks/useAutoNavigation';

const HomePage = () => {
  const [isChanged, setIsChanged] = useState(false);
  const token = useContext(UserTokenContext);

  useAutoNavigation('/', token, false);

  const toggleClass = () => {
    setIsChanged(!isChanged);
  };

  return (
    <div className='homepage-container'>
      <div className='home-header'>
        <button onClick={toggleClass} className={ isChanged ? 'change menu-button' : 'menu-button'}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        <input className='searchbar' placeholder='search'></input>
      </div>
      <div className={ isChanged ? 'change home-content' : 'home-content' }>
        <div className='home-sidebar'>
          <Sidebar />
        </div>
        <div className='home-content-center'> <RecipeList /></div>
      </div>
      <Footer greenBackground={true} />
    </div>
  );
};

export default HomePage;