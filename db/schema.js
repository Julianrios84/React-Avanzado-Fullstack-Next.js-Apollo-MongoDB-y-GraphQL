const { gql } = require("apollo-server");

// Schema
const typeDefs = gql`
  # ========= Users =========
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

  # ========= Products =========

  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createAt: String
  }

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  type Query {
    # ========= Users =========
    getUser(token: String!): User
    # ========= Products =========
    getProducts: [Product]
    getProduct: (id: ID!): Product
  }

  type Mutation {
    # ========= Users =========
    createUser(input: UserInput): User
    authUser(input: AuthInput): Token
    # ========= Products =========
    createProduct(input: ProductInput): Product
  }
`;

module.exports = typeDefs;
