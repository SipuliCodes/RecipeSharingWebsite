import jwt from 'jsonwebtoken';

import { SECRET} from './config';
import { parseSecret } from './parsers';

export const createToken = (username: string, id: string): string => {

  const userForToken = {
    username,
    id
  };

  const stringSecret: string = parseSecret(SECRET);
  const token = jwt.sign(userForToken, stringSecret);

  return token;
};