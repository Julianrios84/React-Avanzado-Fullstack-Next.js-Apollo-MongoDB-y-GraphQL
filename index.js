const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')

// Server
const server = new ApolloServer({ typeDefs, resolvers, context: () => {
    return {
      myContext: 'Hello World!'
    }
} })

// Run server
server.listen().then(({url}) => {
  console.log(`Server run on ${url}`)
})