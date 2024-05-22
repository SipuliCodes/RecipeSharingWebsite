import axios from 'axios';

import { config } from '../utils/config';
import { LoginFormData, User } from '../interfaces/userInterfaces';

const signup = (user: User) => {
  axios.post(`${config.apiUrl}/signup`, user)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const login = (user: LoginFormData) => {
  axios.post(`${config.apiUrl}/login`, user)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { signup, login };