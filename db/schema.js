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

  input UserInput {
    name: String!
    lastname: String!
    email: String!
    password: String! 
  }

  type Query {
    
  }

  type Mutation {
    createUser(input: UserInput): String
  }
`

module.exports = typeDefs