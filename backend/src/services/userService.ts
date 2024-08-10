import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { BlobServiceClient } from "@azure/storage-blob";

import { IUser, NewUser, LoginUser, NewUserDetails, NewAndOldPassword } from '../interfaces/userInterfaces';
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
    return await addedUser.save();
  }

  throw new Error('Signup failed');
};

const loginUser = async (user: LoginUser): Promise<IUser> => {
  const { username, password } = user;

  const loggedInUser = await User.findOne({ username }).populate('friends').populate('sentRequests').populate('receivedRequests');
  if (loggedInUser) {
    if (await bcrypt.compare(password, loggedInUser.password)) {
      return loggedInUser;
    }
  }

  throw new Error('Login failed');
};

const getUser = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId).populate('friends').populate('sentRequests').populate('receivedRequests').populate('likedRecipes');

  if (user) {
    return user;
  }

  throw new Error('User was not found');
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

const sendFriendRequest = async (userId: string, requestUsername: string) => {
  const newFriend = await User.findOne({ username: requestUsername });

  await User.findByIdAndUpdate(newFriend!._id, { $addToSet: { receivedRequests: userId } });
  await User.findByIdAndUpdate(userId, { $addToSet: { sentRequests: newFriend!._id } });
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
    await User.findByIdAndUpdate(userId, { $addToSet: { friends: newFriendId } });
    await User.findByIdAndUpdate(newFriendId, { $addToSet: { friends: userId } });
    return 'added friend';
  }

  return 'friend request declined';
};

const removeFriend = async (username: string, userId: string) => {
  const friendToRemove = await User.findOne({ username });
  await User.findByIdAndUpdate(friendToRemove!._id, {
    $pull: { friends: userId },
  });
  await User.findByIdAndUpdate(userId, {
    $pull: { friends: friendToRemove!._id},
  });
};

const changeUserDetails = async (newUserDetails: NewUserDetails, userId: string) => {
  const userWithNewDetails = await User.findByIdAndUpdate(userId, {
    firstName: newUserDetails.firstName,
    lastName: newUserDetails.lastName,
    email: newUserDetails.email
  }, { new: true });

  return userWithNewDetails;
};

const changePassword = async (newAndOldPassword: NewAndOldPassword, userId: string): Promise<boolean> => {
  const user = await User.findById(userId);
  const { newPassword, oldPassword } = newAndOldPassword;
  if (user) {
    if (await bcrypt.compare(oldPassword, user.password)) {
      const saltRounds = 10;
      const passwordHash: string = await bcrypt.hash(newPassword, saltRounds);

      await User.findByIdAndUpdate(userId, { password: passwordHash });
      return true;
    }
  }

  return false;
};


const uploadPicture = async (userId: string, fileContent: Express.Multer.File): Promise<boolean> => {
  const connectionString = process.env.CONNECTIONSTRING;
  const containerName = process.env.CONTAINERNAME;
  const user = await User.findById(userId);
  const fileName = `${user!.username}-profilepic`;

  if (!connectionString || !containerName) {
    throw new Error("Connection string or container name is missing");
  }

  try {
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

     const buffer = fileContent.buffer;
    await blockBlobClient.upload(
       buffer,
       buffer.length
     );
    
    const fileUrl = blockBlobClient.url;
    user!.profilePicUrl = fileUrl;
    await user!.save();

    if (fileUrl) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Upload was not successful" + error);
  }
};


export default {
  addUser,
  loginUser,
  getUser,
  getAllUsersWithWord,
  handleFriendRequest,
  sendFriendRequest,
  removeFriend,
  changeUserDetails,
  changePassword,
  uploadPicture
};