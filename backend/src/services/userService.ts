import { IUser, NewUser } from '../interfaces/userInterfaces';
import User from '../models/user';

const addUser = async (user: NewUser): Promise<IUser> => {
  const addedUser = new User(user);
  await addedUser.save();

  return addedUser;
};

export default {
  addUser
};