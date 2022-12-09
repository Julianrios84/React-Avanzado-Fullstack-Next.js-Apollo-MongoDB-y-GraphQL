require("dotenv").config({ path: ".env" });

const { ApolloServer, gql } = require("apollo-server");
const jwt = require("jsonwebtoken");

const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const database = require("./config/db");

// Connected Databse
database();

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        return { user };
      } catch (error) {}
    }
  },
});

// Run server
server.listen().then(({ url }) => {
  console.log(`Server run on ${url}`);
});
