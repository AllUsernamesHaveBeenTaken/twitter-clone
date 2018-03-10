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
  const me = await User.findById(user._id);
  if (!user || !user._id || !me) {
    throw new Error('Unauthorized!');
  }
  return me;
}
