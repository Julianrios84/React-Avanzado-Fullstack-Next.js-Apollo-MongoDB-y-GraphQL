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

  type Token {
    token: String
  }

  input UserInput {
    name: String!
    lastname: String!
    email: String!
    password: String! 
  }

  input AuthInput {
    email: String!
    password: String! 
  }

  type Query {
     getUser(token: String!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    authUser(input: AuthInput): Token
  }
`

module.exports = typeDefs