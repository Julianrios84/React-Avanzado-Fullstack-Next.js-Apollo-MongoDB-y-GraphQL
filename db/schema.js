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

  # ========= Clients =========

  type Client {
    id: ID
    name: String
    lastname: String
    company: String
    email: String
    mobile: String
    createAt: String
  }

  input ProductInput {
    name: String!
    lastname: String!
    company: String!
    email: String!
    mobile: String
  }

  type Query {
    # ========= Users =========
    getUser(token: String!): User
    # ========= Products =========
    getProducts: [Product]
    getProduct: (id: ID!): Product
    # ========= Clients =========
    getClients: [Client]
    getClientsForVendor: [Client]
  }

  type Mutation {
    # ========= Users =========
    createUser(input: UserInput): User
    authUser(input: AuthInput): Token
    # ========= Products =========
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
    # ========= Clients =========
    createClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): String
  }
`;

module.exports = typeDefs;
