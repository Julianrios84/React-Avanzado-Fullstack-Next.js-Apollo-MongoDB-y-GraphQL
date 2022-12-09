const { gql } = require('apollo-server')

// Schema
const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastname: String
    email: String
    createAt: String
  }

  type Query {
    
  }

  type Mutation {
    createUser: String
  }
`

module.exports = typeDefs