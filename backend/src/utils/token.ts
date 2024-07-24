import jwt from 'jsonwebtoken';
import { Request } from 'express';

import { SECRET} from './config';
import { parseSecret } from '../parsers/tokenParsers';
import { isString } from '../parsers/parserHelpers';
import { DecodedToken } from '../interfaces/tokenInterfaces';

export const createToken = (username: string, id: string): string => {

  const userForToken = {
    username,
    id
  };

  const stringSecret: string = parseSecret(SECRET);
  const token = jwt.sign(userForToken, stringSecret);

  return token;
};

const getTokenFrom = (req: Request): string => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return '';
};

export const verifyToken = (req: Request): DecodedToken => {
  const decodedToken = jwt.verify(getTokenFrom(req), parseSecret(SECRET)) as { username: string, id: string };
  if (isString(decodedToken) || !decodedToken.id) {
    throw new Error('invalid token');
  }

  return decodedToken;
};

