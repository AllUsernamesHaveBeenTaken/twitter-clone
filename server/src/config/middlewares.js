/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import constants from '../config/constants';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import { decodeToken } from '../services/auth';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

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
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: constants.GRAPHQL_PATH
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
};
