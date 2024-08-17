import { useState } from 'react';
import { LoginFormData } from '../../../interfaces/userInterfaces';
import { useContext } from 'react';

import './LoginForm.css';
import { login } from '../../../services/userService';
import { LoginFormProps } from '../../../interfaces/props';
import { UserSetDetailsContext, UserSetTokenContext } from '../../../contexts/userContext';
import { setToken} from '../../../utils/localStorage';
import { useTranslation } from 'react-i18next';

const LoginForm = ({setLeftContent}: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'loginForm' });

  const setTokenContext = useContext(UserSetTokenContext);
  const setUserContext = useContext(UserSetDetailsContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { token, user } = await login(formData);
      setTokenContext(token);
      setToken(token);
      setUserContext(user);
    } catch (error) {
      setErrorMessage('Password or username was wrong');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-header-grid'>
        <div>
          <button onClick={() => setLeftContent('buttons') } id='close-button' className='login-close-button'>
            <div className='login-close-button-bar1'></div>
            <div className='login-close-button-bar2'></div>
          </button>
        </div>
        <h1 className='login-h1'>{t('login') }</h1>
      </div>
      <form onSubmit={onSubmit} className='loginform-flex-container'>
        <input
          className='login-input'
          type="text"
          placeholder={t('username')}
          value={formData.username}
          onChange={handleChange}
          name='username'
        />
        <input
          className='login-input'
          type="password"
          placeholder={t('password')}
          value={formData.password}
          onChange={handleChange}
          name='password'
        />
        {errorMessage && <p className='login-error-message'>{errorMessage}</p>}
        <button className="login-button" type="submit">{t('login') }</button>
      </form>
    </div>
  );
};

export default LoginForm;