import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { useContext } from 'react';

import './Sidebar.css';
import { removeToken} from '../../../utils/localStorage';
import { UserDetailsContext, UserSetDetailsContext, UserSetTokenContext } from '../../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const setTokenContext = useContext(UserSetTokenContext);
  const setUserContext = useContext(UserSetDetailsContext);
  const userDetails = useContext(UserDetailsContext);

  const logout = () => {
    removeToken();
    setTokenContext('');
    setUserContext({
      'firstName': '',
      'lastName': '',
      'username': '',
      'email': '',
      'friends': [],
      'id': '',
      'recipes': [],
      'likedRecipes': []
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const id = event.currentTarget.id;
    navigate(`/${id}`);
  };

  return (
    <div className='sidebar'>
      <div className='profile-details'>
        <FontAwesomeIcon className='profilepic' icon={findIconDefinition({prefix: 'fas', iconName: 'user'})} />
        <h4 className='username'>@{userDetails.username}</h4>
      </div>
      <div className='link-list'>
        <h3 onClick={handleClick} id='home' className='sidebar-links'>Home</h3>
        <h3 onClick={handleClick} id='friends' className='sidebar-links'>Friends</h3>
        <h3 id='settings' className='sidebar-links'>Settings</h3>
      </div>
      <button onClick={logout} className='logout-button'>Log out</button>
    </div>
  );
};

export default Sidebar;