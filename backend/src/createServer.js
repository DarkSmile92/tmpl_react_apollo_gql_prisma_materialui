const { GraphQLServer } = require("graphql-yoga");
const mkdirp = require("mkdirp");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");
const { uploadPath } = require("./constants");

// Ensure upload directory exists
mkdirp.sync(uploadPath);

// Create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({
      ...req,
      db
    }),
    // debug: true
  });
}

module.exports = createServer;
