import axios from 'axios';

import { config } from '../utils/config';
import { User } from '../interfaces/userInterfaces';

const signup = (user: User) => {
  axios.post(`${config.apiUrl}/signup`, user)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { signup };