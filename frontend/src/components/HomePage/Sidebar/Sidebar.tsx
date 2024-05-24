import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='profile-details'>
        <img className='profilepic' src='./src/pictures/default_profile.png' />
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