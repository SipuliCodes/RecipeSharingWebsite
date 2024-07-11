import { useContext, useState } from 'react';

import './SettingsPage.css';
import { UserDetailsContext, UserSetDetailsContext, UserTokenContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { changeUserDetails } from '../../services/userService';
import { ChangeUserDetails } from '../../interfaces/userInterfaces';
import { isEmailValid } from '../../validations/signupValidation';

const SettingsPage = () => {
  const navigate = useNavigate();
  const token = useContext(UserTokenContext);
  const user = useContext(UserDetailsContext);
  const setUser = useContext(UserSetDetailsContext);

  const [userDetailsForm, setUserDetailsForm] = useState<ChangeUserDetails>({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = !isEmailValid(userDetailsForm.email) && emailTouched;

  const onClickUserDetails = () => {
    const newFirstname = userDetailsForm.firstName ? userDetailsForm.firstName : user.firstName;
    const newLastname = userDetailsForm.lastName ? userDetailsForm.lastName : user.lastName;
    const newEmail = userDetailsForm.email ? userDetailsForm.email : user.email;
    changeUserDetails(newFirstname, newLastname, newEmail, token)
      .then(
        user => {
          setUser(user);
          setUserDetailsForm({
            firstName: '',
            lastName: '',
            email: ''
          });
        })
      .catch(error => console.log(error));
  };

  const handleUserDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetailsForm({
      ...userDetailsForm,
      [name]: value,
    });
  };

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
              <input className='settings-page-input' onChange={handleUserDetailsChange} value={userDetailsForm.firstName} name='firstName' type='text' placeholder='New first name'></input>
            </div>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>Current last name: {user.lastName}</h5>
              <input className='settings-page-input' onChange={handleUserDetailsChange} value={userDetailsForm.lastName} name='lastName' type='text' placeholder='New last name'></input>
            </div>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>Current email: {user.email}</h5>
              <input className='settings-page-input' onChange={handleUserDetailsChange} onFocus={() => setEmailTouched(true)} onBlur={() => setEmailTouched(false)} value={userDetailsForm.email} name='email' type='text' placeholder='New first name'></input>
              {emailError && <p className='settings-page-error-text'>Not a valid email</p>}
            </div>
            <button onClick={onClickUserDetails} className='settings-page-button'>Confirm changes</button>
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