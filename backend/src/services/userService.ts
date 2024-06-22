import bcrypt from 'bcrypt';

import { IUser, NewUser, LoginUser } from '../interfaces/userInterfaces';
import User from '../models/user';

const addUser = async (user: NewUser): Promise<IUser> => {
  const { firstName, lastName, username, email, password } = user;

  const saltRounds = 10;
  const passwordHash: string = await bcrypt.hash(password, saltRounds);

  const addedUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: passwordHash,
  });
  
  if (addedUser) {
    console.log(1, addedUser);
    return await addedUser.save();
  }

  throw new Error('Signup failed');
};

const loginUser = async (user: LoginUser): Promise<IUser> => {
  const { username, password } = user;

  const loggedInUser = await User.findOne({ username }).populate('friends');
  if (loggedInUser) {
    if (await bcrypt.compare(password, loggedInUser.password)) {
      return loggedInUser;
    }
  }

  throw new Error('Login failed');
};

export default {
  addUser,
  loginUser
};