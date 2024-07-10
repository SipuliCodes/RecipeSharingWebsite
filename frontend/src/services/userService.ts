import axios from 'axios';

import { config } from '../utils/config';
import { LoggedInUserWithToken, LoginFormData, BasicUser, LoggedInUser, SignupFormData } from '../interfaces/userInterfaces';

const signup = async (user: SignupFormData): Promise<LoggedInUserWithToken> => {
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

const getUserData = async (token: string): Promise<LoggedInUser> => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/users/me`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const getOneUser = async (userId:string, token: string): Promise<LoggedInUser> => {
  try {
    const response = await axios.get(`${config.apiUrl}/users/user?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const searchForUsers = async (searchWord: string, token: string): Promise<BasicUser[]> => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/users?searchword=${searchWord}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const sendFriendRequest = async (username: string, token: string) => {
  try {
    await axios.post(
      `${config.apiUrl}/users/send-request`,
      { username },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const removeFriend = async (username: string, token: string) => {
  try {
    await axios.post(
      `${config.apiUrl}/users/remove-friend`,
      { username },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const handleFriendRequest = async (isAccepted: boolean, username: string, token: string) => {
  try {
    await axios.post(
      `${config.apiUrl}/users/requests`,
      { isAccepted, username },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

const changeUserDetails = async (firstName: string, lastName: string, email: string, token: string): Promise<LoggedInUser> => {
  try {
    const response = await axios.put<LoggedInUser>(
      `${config.apiUrl}/users/change-user-details`,
      { firstName, lastName, email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
};

export { signup, login, getUserData, getOneUser, searchForUsers, sendFriendRequest, handleFriendRequest, removeFriend, changeUserDetails };