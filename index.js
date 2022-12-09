const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const database = require('./config/db')

// Connected Databse
database()

// Server
const server = new ApolloServer({ typeDefs, resolvers })

// Run server
server.listen().then(({url}) => {
  console.log(`Server run on ${url}`)
})