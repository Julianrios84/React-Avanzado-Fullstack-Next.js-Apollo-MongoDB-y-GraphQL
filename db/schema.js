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

  # ========= Orders =========
  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: ID
    vendor: ID
    status: StatusOrder
    createAt: String
  }

  type OrderGroup {
    id: ID
    stock: Int
  }

  type OrderInput {
    order: [OrderProductInput]
    total: Float!
    client: ID!
    status: StatusOrder
  }

  type OrderProductInput {
    id: ID!
    stock: Int!
  }

  enum StatusOrder {
    PENDING
    CANCELLED
    COMPLETE
  }

  type Query {
    # ========= Users =========
    getUser(token: String!): User
    # ========= Products =========
    getProducts: [Product]
    getProduct(id: ID!): Product
    # ========= Clients =========
    getClients: [Client]
    getClient(id: ID!): Client
    getClientsForVendor: [Client]
    # ========= Orders =========
    
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
    # ========= Orders =========
    createOrder(input: OrderInput): Order

  }
`;

module.exports = typeDefs;
