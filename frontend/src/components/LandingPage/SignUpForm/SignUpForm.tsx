import { useState } from 'react';
import { useContext } from 'react';

import './SignUpForm.css';
import { SignupFormData } from '../../../interfaces/userInterfaces';
import { arePasswordsSame, isEmailValid, isPasswordValid, isUsernameValid } from '../../../validations/signupValidation';
import { signup } from '../../../services/userService';
import { SignUpFormProps } from '../../../interfaces/props';
import { UserSetTokenContext } from '../../../contexts/userContext';
import { setToken } from '../../../utils/localStorage';

const SignUpForm = ({setLeftContent}: SignUpFormProps) => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const setTokenContext = useContext(UserSetTokenContext);

  const onSubmit = async ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { token, user } = await signup(formData);
      setTokenContext(token);
      setToken(token);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const passwordError = isPasswordValid(formData.password);
  const confirmPasswordError = !arePasswordsSame(formData.password, formData.confirmPassword) && confirmPasswordTouched;
  const usernameError = !isUsernameValid(formData.username) && usernameTouched;
  const emailError = !isEmailValid(formData.email) && emailTouched;

  return (
    <div className='signup-container'>
      <div className='signup-header-grid'>
        <div>
          <button onClick={() => setLeftContent('buttons') } className='signup-close-button'>
            <div className='signup-close-button-bar1'></div>
            <div className='signup-close-button-bar2'></div>
          </button>
        </div>
        <h1 className='signup-h1'>Sign Up</h1>
      </div>
      <form onSubmit={onSubmit} className='signupform-flex-container'>
        <input
          type="text"
          className="signup-input"
          placeholder="First name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          className="signup-input"
          placeholder="Last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          className={ usernameError ? 'signup-input input-error' : 'signup-input'}
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onFocus={() => setUsernameTouched(true)}
        />
        {usernameError && <p className='error-text-signupform'>Username must be atleast 3 characters</p>}
        <input
          className={ emailError ? 'signup-input input-error' : 'signup-input'}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setEmailTouched(true)}
        />
        {emailError && <p className='error-text-signupform'>Not a valid email</p>}
        <input
          className={passwordError.length == 0 || !passwordTouched ? 'signup-input' : 'signup-input input-error'}
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setPasswordTouched(true)}
        />
        {(passwordTouched && passwordError ) && <p className='error-text-signupform'>{passwordError}</p>}
        <input
          className={ confirmPasswordError ? 'signup-input input-error' : 'signup-input'}
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onFocus={() => setConfirmPasswordTouched(true)}
        />
        {confirmPasswordError && <p className='error-text-signupform'>Passwords must be same</p>}
        <button type='submit' className='create-button'>Create Account</button>
      </form>
    </div>
  );
  
};

export default SignUpForm;