import React, { useContext, useState } from 'react';

import './SettingsPage.css';
import { UserDetailsContext, UserSetDetailsContext, UserTokenContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { changePassword, changeUserDetails } from '../../services/userService';
import { ChangePassword, ChangeUserDetails } from '../../interfaces/userInterfaces';
import { isEmailValid, isPasswordValid, arePasswordsSame } from '../../validations/signupValidation';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const navigate = useNavigate();
  const token = useContext(UserTokenContext);
  const user = useContext(UserDetailsContext);
  const setUser = useContext(UserSetDetailsContext);

  const { t } = useTranslation('translation', { keyPrefix: 'settingsPage' });

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
  const passwordChangeMessage = passwordChangeSuccesful ? t('passwordChangeSuccessful') : passwordChangeSuccesful === false ? t('passwordChangeUnsuccessful') : '';

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);


  const passwordError = isPasswordValid(passwordChangeForm.password, t);
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
      <button onClick={onBackClick} className='settings-page-back-button'>{t('back') }</button>
      <div className='settings-page-form'>
        <h1 className='settings-page-h1'>{t('settings') }</h1>
        <h3 className='settings-page-h3'>{t('username')}{user.username}</h3>
        <div className='settings-page-user-details-box'>
          <div className='settings-page-user-name-box'>
            <h3 className='settings-page-h3'>{ t('changeDetails')}</h3>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>{t('currentFirstName') }{user.firstName}</h5>
              <input className='settings-page-input' onChange={handleUserDetailsChange} value={userDetailsForm.firstName} name='firstName' type='text' placeholder={t('newFirstName') }></input>
            </div>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>{ t('currentLastName')}{user.lastName}</h5>
              <input className='settings-page-input' onChange={handleUserDetailsChange} value={userDetailsForm.lastName} name='lastName' type='text' placeholder={t('newLastName') }></input>
            </div>
            <div className='settings-page-current-and-input'>
              <h5 className='settings-page-h5'>{t('currentEmail') }{user.email}</h5>
              <input
                className='settings-page-input'
                onChange={handleUserDetailsChange}
                onFocus={() => setEmailTouched(true)}
                onBlur={() => setEmailTouched(false)}
                value={userDetailsForm.email}
                name='email'
                type='text'
                placeholder={t('newEmail') }>
              </input>
              {emailError && <p className='settings-page-error-text'>{t('errors.email') }</p>}
            </div>
            <button onClick={onClickUserDetails} className='settings-page-button'>{t('confirm') }</button>
          </div>
          <div className='settings-page-password-box'>
            <h3 className='settings-page-h3'> {t('changePassword') }</h3>
            {passwordChangeMessage && <h3 className={passwordChangeSuccesful ? 'settings-page-succesful settings-page-h3' : 'settings-page-error settings-page-h3'}>{passwordChangeMessage}</h3>}
            <input
              className='settings-page-input settings-page-password-input'
              onChange={handlePasswordChange}
              value={passwordChangeForm.oldPassword}
              name='oldPassword'
              type='password'
              placeholder={t('currentPassword') }>
            </input>
            <input
              className='settings-page-input settings-page-password-input'
              onChange={handlePasswordChange}
              onFocus={() => setPasswordTouched(true)}
              onBlur={() => setPasswordTouched(false)}
              value={passwordChangeForm.password}
              name='password'
              type='password'
              placeholder={t('newPassword') }>
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
              placeholder={t('confirmPassword') }>  
            </input>
            {confirmPasswordError && <p className='settings-page-error-text'>{t('errors.samePasswords') }</p>}
            <button className='settings-page-button' onClick={onClickPassword}>{t('confirmPasswordButton') }</button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SettingsPage;