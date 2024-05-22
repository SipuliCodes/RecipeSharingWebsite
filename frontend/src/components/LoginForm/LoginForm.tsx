import { useState } from 'react';
import { LoginFormData } from '../../interfaces/userInterfaces';

import './LoginForm.css';
import { login } from '../../services/userService';

const LoginForm = () => {
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
      <h1 className='login-h1'>Login</h1>
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