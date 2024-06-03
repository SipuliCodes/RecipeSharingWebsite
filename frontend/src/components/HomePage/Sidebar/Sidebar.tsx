import './Sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core';

const Sidebar = () => {

  return (
    <div className='sidebar'>
      <div className='profile-details'>
        <FontAwesomeIcon className='profilepic' icon={findIconDefinition({prefix: 'fas', iconName: 'user'})} />
        <h4 className='username'>@username</h4>
      </div>
      <div className='link-list'>
        <h3 className='sidebar-links'>Friends</h3>
        <h3 className='sidebar-links'>Settings</h3>
      </div>
    </div>
  );
};

export default Sidebar;