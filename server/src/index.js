/* eslint-disable no-console */

import express from 'express';
import { createServer } from 'http';
import { makeExecutableSchema } from 'graphql-tools';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import './config/db';
import constants from './config/constants';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
// import mocks from './mocks';
import middlewares from './config/middlewares';

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

middlewares(app);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
    subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`
  })
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(request => ({
    schema,
    context: {
      user: request.user
    }
  }))
);

const grapqlServer = createServer(app);

// mocks().then(() => {
  grapqlServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      new SubscriptionServer({ // eslint-disable-line
        schema,
        execute,
        subscribe
      },{
        server: grapqlServer,
        path: constants.SUBSCRIPTIONS_PATH
      })
      console.log(`App is listening on port: ${constants.PORT}`);
    }
  });
// });
