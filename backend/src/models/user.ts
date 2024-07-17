import { Schema, model } from "mongoose";

import { IUser, IUserDocument } from "../interfaces/userInterfaces";
import { emailValidator } from "../utils/validators";


const schema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true, minlength: 3 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator
  },
  password: { type: String, required: true},
  friends: { type: [Schema.Types.ObjectId], ref: 'User' },
  sentRequests: { type: [Schema.Types.ObjectId], ref: 'User' },
  receivedRequests: { type: [Schema.Types.ObjectId], ref: 'User'},
  recipes: { type: [Schema.Types.ObjectId], ref: 'Recipe' },
  likedRecipes: { type: [Schema.Types.ObjectId], ref: 'Recipe' },
  profilePicUrl: { type: String }
});

schema.set('toJSON', {
  transform: (_document, returnedObejct: Partial<IUserDocument> & { id?: string }) => {
    if (returnedObejct._id) {
      returnedObejct.id = returnedObejct._id.toString();
      delete returnedObejct._id;
    }
    delete returnedObejct.__v;
    delete returnedObejct.password;
  }
});

const User = model<IUser>('User', schema);

export default User;