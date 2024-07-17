import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { useContext, useEffect, useState } from 'react';

import './Sidebar.css';
import { removeToken} from '../../../utils/localStorage';
import { UserDetailsContext, UserSetDetailsContext, UserSetTokenContext } from '../../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { SidebarProps } from '../../../interfaces/props';
import AddProfilePic from './AddProfilePic/AddProfilePic';

const Sidebar = ({ toggleClass }: SidebarProps) => {
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();
  const setTokenContext = useContext(UserSetTokenContext);
  const setUserContext = useContext(UserSetDetailsContext);
  const userDetails = useContext(UserDetailsContext);

  useEffect(() => {
    if (userDetails.profilePicUrl) {
      setProfilePic(userDetails.profilePicUrl);
    }
  }, [userDetails.profilePicUrl]);

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
    toggleClass();
    navigate(`/${id}`);
  };

  return (
    <div className='sidebar'>
      <div className='profile-details'>
        {profilePic ? <img src={profilePic} className='profilepic'/> : <FontAwesomeIcon className='profilepic' icon={findIconDefinition({ prefix: 'fas', iconName: 'user' })} />}
        <AddProfilePic setProfilePic={setProfilePic} />
        <h4 className='username'>@{userDetails.username}</h4>
      </div>
      <div className='link-list'>
        <h3 onClick={handleClick} id='home' className='sidebar-links'>Home</h3>
        <h3 onClick={handleClick} id='liked-recipes' className='sidebar-links'>Liked recipes</h3>
        <h3 onClick={handleClick} id='friends' className='sidebar-links'>Friends</h3>
        <h3 onClick={handleClick} id='settings' className='sidebar-links'>Settings</h3>
      </div>
      <button onClick={logout} className='logout-button'>Log out</button>
    </div>
  );
};

export default Sidebar;