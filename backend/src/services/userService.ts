import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

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

const getAllUsersWithWord = async (word: string, userId: string): Promise<IUser[]> => {
  const startRegex = new RegExp(`^${word}`, "i");
  const containRegex = new RegExp(`${word}`, "i");
  const excludeUserObjectId = new Types.ObjectId(userId);

  const users = await User.find({
    username: { $regex: containRegex },
    _id: { $ne: excludeUserObjectId }
  });

  if (!users) {
    return [];
  }

  users.sort((a, b) => {
    const aStartsWith = startRegex.test(a.username);
    const bStartsWith = startRegex.test(b.username);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return 0;
  });

  return users;
};

const handleFriendRequest = async (isAccepted: boolean, userId: string, requestUsername: string):Promise<string> => {
  const newFriend = await User.findOne({ username: requestUsername });
  const newFriendId = new Types.ObjectId(newFriend!._id);
  const userIdAsId = new Types.ObjectId(userId);
  await User.findByIdAndUpdate(newFriendId, {
    $pull: { sentRequests: userIdAsId },
  });
  await User.findByIdAndUpdate(userId, {
    $pull: { receivedRequests: newFriendId },
  });

  console.log(newFriend);

  if (isAccepted && newFriend?.sentRequests?.includes(userIdAsId)) {
    console.log('added friend');
    await User.findByIdAndUpdate(userId, { $push: { friends: newFriendId } });
    await User.findByIdAndUpdate(newFriendId, { $push: { friends: userId } });
    return 'added friend';
  }

  return 'friend request declined';
};

export default {
  addUser,
  loginUser,
  getAllUsersWithWord,
  handleFriendRequest
};