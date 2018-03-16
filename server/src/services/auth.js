import jwt from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../models/User';

export function decodeToken(token) {
  const tokenSplit = token.split(' ');
  if (tokenSplit[0] !== 'Bearer') {
    throw new Error('Token not valid!');
  }

  return jwt.verify(tokenSplit[1], constants.JWT_SECRET);
}

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Unauthorized!');
  }

  const me = await User.findById(user._id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me;
}

