import React, { useContext, useState } from 'react';

import './SettingsPage.css';
import { UserDetailsContext, UserSetDetailsContext, UserTokenContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { changePassword, changeUserDetails } from '../../services/userService';
import { ChangePassword, ChangeUserDetails } from '../../interfaces/userInterfaces';
import { isEmailValid, isPasswordValid, arePasswordsSame } from '../../validations/signupValidation';

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

  const [passwordChangeForm, setPasswordChangeForm] = useState<ChangePassword>({
    password: '',
    confirmPassword: '',
    oldPassword: ''
  });

  const [passwordChangeSuccesful, setPasswordChangeSuccesful] = useState<boolean | undefined>(undefined);
  const passwordChangeMessage = passwordChangeSuccesful ? 'Password changed' : passwordChangeSuccesful === false ? 'Failed to change password' : '';

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);


  const passwordError = isPasswordValid(passwordChangeForm.password);
  const confirmPasswordError = !arePasswordsSame(passwordChangeForm.password, passwordChangeForm.confirmPassword) && confirmPasswordTouched;
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

  const onClickPassword = () => {
    if (passwordChangeForm.password === passwordChangeForm.confirmPassword) {
      changePassword(passwordChangeForm.oldPassword, passwordChangeForm.password, token)
        .then(success => {
          setPasswordChangeSuccesful(success);
          setTimeout(() => setPasswordChangeSuccesful(undefined), 5000);
          setPasswordChangeForm({
            password: '',
            confirmPassword: '',
            oldPassword: ''
          });
        });
    }
  };

  const handleUserDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetailsForm({
      ...userDetailsForm,
      [name]: value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordChangeForm({
      ...passwordChangeForm,
      [name]: value
    });
  };

  const onBackClick = () => {
    navigate(-1);
  };

  console.log(passwordChangeSuccesful);
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
              <input
                className='settings-page-input'
                onChange={handleUserDetailsChange}
                onFocus={() => setEmailTouched(true)}
                onBlur={() => setEmailTouched(false)}
                value={userDetailsForm.email}
                name='email'
                type='text'
                placeholder='New first name'>
              </input>
              {emailError && <p className='settings-page-error-text'>Not a valid email</p>}
            </div>
            <button onClick={onClickUserDetails} className='settings-page-button'>Confirm changes</button>
          </div>
          <div className='settings-page-password-box'>
            <h3 className='settings-page-h3'> Change password</h3>
            {passwordChangeMessage && <h3 className={passwordChangeSuccesful ? 'settings-page-succesful settings-page-h3' : 'settings-page-error settings-page-h3'}>{passwordChangeMessage}</h3>}
            <input
              className='settings-page-input settings-page-password-input'
              onChange={handlePasswordChange}
              value={passwordChangeForm.oldPassword}
              name='oldPassword'
              type='password'
              placeholder='Current password'>
            </input>
            <input
              className='settings-page-input settings-page-password-input'
              onChange={handlePasswordChange}
              onFocus={() => setPasswordTouched(true)}
              onBlur={() => setPasswordTouched(false)}
              value={passwordChangeForm.password}
              name='password'
              type='password'
              placeholder='New password'>
            </input>
            {(passwordTouched && passwordError ) && <p className='settings-page-error-text'>{passwordError}</p>}
            <input
              className='settings-page-input settings-page-password-input'
              onChange={handlePasswordChange}
              onFocus={() => setConfirmPasswordTouched(true)}
              onBlur={() => setConfirmPasswordTouched(false)}
              value={passwordChangeForm.confirmPassword}
              name='confirmPassword'
              type='password'
              placeholder='New password again'>  
            </input>
            {confirmPasswordError && <p className='settings-page-error-text'>Passwords must be same</p>}
            <button className='settings-page-button' onClick={onClickPassword}>Confirm new password</button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SettingsPage;