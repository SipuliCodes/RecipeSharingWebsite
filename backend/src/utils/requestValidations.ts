import { NewUser } from "../interfaces/userInterfaces";
import { parseEmail, parseFirstName, parseLastName, parsePassword, parseUsername } from "./parsers";

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('firstName' in object && 'lastName' in object && 'username' in object && 'email' in object && 'password' in object) {

    const newUser: NewUser = {
      firstName: parseFirstName(object.firstName),
      lastName: parseLastName(object.lastName),
      username: parseUsername(object.username),
      email: parseEmail(object.email),
      password: parsePassword(object.password)
    };

    return newUser;
  }
  
  throw new Error('Incorrect data: some fields are missing');
};

