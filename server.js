
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const Authentication = require('smart-auth-middleware');
const { buildFederatedSchema } = require('@apollo/federation');
const { ApolloServer } = require('apollo-server-express');

const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');

const SmartHttp = require('smart-http');

const { typeDefs, resolvers } = require('./graphql');

const routes = require('./routes');

const {PORT, IDENTITY_SERVICE_URL } = require('./config');

const app = express();

const schema = buildFederatedSchema({
  typeDefs,
  resolvers,
});

/**
 * Start the app by listening <port>
 * */

 const server = app.listen(PORT);
//  .then(() => {
//   console.log(`
//     Server is running!
//     Listening on port `+PORT+`
//     Explore at https://studio.apollographql.com/dev
//   `);
// });
/**
 * List of all middlewares used in project cors, compression, helmet
 * */
try {
 
  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.enable('trust proxy');
  app.use(SmartHttp());

  app.use(cors({
    exposedHeaders: [ 'token', 'slug', 'message', 'set-password', 'password', 'is-password-already-set', 'public-id', 'x-coreplatform-paging-limit',
      'x-coreplatform-total-records', 'x-coreplatform-concurrencystamp' ],
  }));
  
  app.use(compression());
  app.use(helmet());
  app.use(express.urlencoded({
    extended: true,
  }));
  
  app.use(express.json());

  app.use(Authentication({
    IDENTITY_SERVICE_URL,
    AUDIENCE: 'platform',
    ignorePaths: [ '/graphql', '/ping', '/healtcheck' ],
  }));

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
      user: req && req.user,
      Headers: req.Headers,
    }),
    plugins: [ ApolloServerPluginInlineTraceDisabled() ],
  });
  app.use('/', routes);
  app.get("/get", (req, res) => {
    return res
      .status(200)
      .send({ message: "YAY! Congratulations! Your first endpoint is working" });
  });
  apolloServer.applyMiddleware({ app });
} catch (e) {
  
  server.close();
}

module.exports = server;
