export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://localhost/twitter-clone',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'twitterclonesecret'
};
