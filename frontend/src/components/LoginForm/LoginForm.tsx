import { useState } from 'react';
import { LoginFormData } from '../../interfaces/userInterfaces';

import './LoginForm.css';
import { login } from '../../services/userService';
import { LoginFormProps } from '../../interfaces/props';

const LoginForm = ({setLeftContent}: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <div className='login-container'>
      <div className='login-header-grid'>
        <div>
          <button onClick={() => setLeftContent('buttons') } className='login-close-button'>
            <div className='login-close-button-bar1'></div>
            <div className='login-close-button-bar2'></div>
          </button>
        </div>
        <h1 className='login-h1'>Login</h1>
      </div>
      <form onSubmit={onSubmit} className='loginform-flex-container'>
        <input
          className='login-input'
          type="text"
          placeholder="Username or email"
          value={formData.username}
          onChange={handleChange}
          name='username'
        />
        <input
          className='login-input'
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          name='password'
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;