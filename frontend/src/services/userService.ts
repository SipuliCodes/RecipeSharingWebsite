import axios from 'axios';

import { config } from '../utils/config';
import { LoggedInUserWithToken, LoginFormData, BasicUser } from '../interfaces/userInterfaces';

const signup = async (user: BasicUser): Promise<LoggedInUserWithToken> => {
  try {
    const response = await axios.post(`${config.apiUrl}/signup`, user);
    return response.data;
  } catch(error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const login = async (user: LoginFormData): Promise<LoggedInUserWithToken> => {
  try {
    const response = await axios.post(`${config.apiUrl}/login`, user);
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

export { signup, login };