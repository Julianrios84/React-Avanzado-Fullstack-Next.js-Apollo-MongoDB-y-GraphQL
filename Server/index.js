require("dotenv").config({ path: "development.env" });

const { ApolloServer, gql } = require("apollo-server");
const jwt = require("jsonwebtoken");

const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const database = require("./config/db");

// Connected Database
database();

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    console.log("🚀 ~ file: index.js:19 ~ token", token)
    if (token != "") {
      try {
        const user = jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET);
        return { user };
      } catch (error) {
        console.log("🚀 ~ file: index.js:24 ~ error", error);
        // return error.message 
      }
    }
  },
});

// Run server
server.listen().then(({ url }) => {
  console.log(`Server run on ${url}`);
});
