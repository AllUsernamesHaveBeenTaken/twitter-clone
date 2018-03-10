/* eslint-disable no-console */

import express from 'express';
import { createServer } from 'http';

import constants from './config/constants';
import './config/db';
// import mocks from './mocks';
import middlewares from './config/middlewares';

const app = express();

middlewares(app);

const grapqlServer = createServer(app);

// mocks().then(() => {
  grapqlServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`App is listening on port: ${constants.PORT}`);
    }
  });
// });
