/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser';

import { decodeToken } from '../services/auth';

async function auth(request, response, next) {
  try {
    const token = request.headers.authorization;
    if (token != null) {
      const user = await decodeToken(token);
      request.user = user;
    } else {
      request.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
}

export default app => {
  app.use(bodyParser.json());
  app.use(auth);
};
