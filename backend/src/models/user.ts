import { Schema, model } from "mongoose";

import { IUser, IUserDocument } from "../interfaces/userInterfaces";


const schema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: { type: [Schema.Types.ObjectId]}
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