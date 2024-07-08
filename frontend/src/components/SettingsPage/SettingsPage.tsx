import { useContext } from 'react';

import './SettingsPage.css';
import { UserDetailsContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const user = useContext(UserDetailsContext);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <div className='settings-page-container'>
      <button onClick={onBackClick} className='settings-page-back-button'>Back</button>
      <div className='settings-page-form'>
        <h1 className='settings-page-h1'>Settings</h1>
        <h3 className='settings-page-h3'>Username: {user.username}</h3>
        <div className='settings-page-user-details-box'>
          <div className='settings-page-user-name-box'>
            <h3 className='settings-page-h3'> Change user details</h3>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>Current first name: {user.firstName}</h5>
              <input className='settings-page-input' type='text' placeholder='New first name'></input>
            </div>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>Current last name: {user.lastName}</h5>
              <input className='settings-page-input' type='text' placeholder='New last name'></input>
            </div>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>Current email: {user.email}</h5>
              <input className='settings-page-input' type='text' placeholder='New first name'></input>
            </div>
            <button className='settings-page-button'>Confirm changes</button>
          </div>
          <div className='settings-page-password-box'>
            <h3 className='settings-page-h3'> Change password</h3>
            <input className='settings-page-input settings-page-password-input' type='password' placeholder='Current password'></input>
            <input className='settings-page-input settings-page-password-input' type='password' placeholder='New password'></input>
            <input className='settings-page-input settings-page-password-input' type='password' placeholder='New password again'></input>
            <button className='settings-page-button'>Confirm new password</button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SettingsPage;