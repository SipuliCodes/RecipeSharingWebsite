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
  await addedUser.save();

  return addedUser;
};

const loginUser = async (user: LoginUser): Promise<IUser> => {
  const { username, password } = user;

  const loggedInUser = await User.findOne({ username });
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