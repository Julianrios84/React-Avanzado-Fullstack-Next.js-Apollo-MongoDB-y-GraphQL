const { gql } = require("apollo-server");

// Schema
const typeDefs = gql`
  # ========= Users =========
  type User {
    id: ID
    name: String
    surnames: String
    email: String
    createAt: String
  }

  type Token {
    token: String
  }

  input UserInput {
    name: String!
    surnames: String!
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
    surnames: String
    company: String
    email: String
    mobile: String
    createAt: String
  }

  input ClientInput {
    name: String!
    surnames: String!
    company: String!
    email: String!
    mobile: String
  }

  # ========= Orders =========
  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: Client
    vendor: ID
    status: StatusOrder
    createAt: String
  }

  type OrderGroup {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    status: StatusOrder
  }

  input OrderProductInput {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  enum StatusOrder {
    PENDING
    CANCELLED
    COMPLETE
  }

  # ========= search's Advanced =========
  type BestCustomers {
    client: [Client]
    total: Float
  }

  type BestSellers {
    vendor: [User]
    total: Float
  }

  type Query {
    # ========= Users =========
    userGet: User
    # ========= Products =========
    productsGet: [Product]
    productGet(id: ID!): Product
    # ========= Clients =========
    clientsGet: [Client]
    clientGet(id: ID!): Client
    clientsForSellerGet: [Client]
    # ========= Orders =========
    ordersGet: [Order]
    ordersForSellerGet: [Order]
    orderGet(id: ID!): Order
    ordersForStatusGet(status: String!): [Order]
    # ========= search's Advanced =========
    bestCustomers: [BestCustomers]
    bestSellers: [BestSellers]
    searchProduct(text: String!): [Product]
  }

  type Mutation {
    # ========= Users =========
    userCreate(input: UserInput): User
    userAuth(input: AuthInput): Token
    # ========= Products =========
    productCreate(input: ProductInput): Product
    productUpdate(id: ID!, input: ProductInput): Product
    productDelete(id: ID!): String
    # ========= Clients =========
    clientCreate(input: ClientInput): Client
    clientUpdate(id: ID!, input: ClientInput): Client
    clientDelete(id: ID!): String
    # ========= Orders =========
    orderCreate(input: OrderInput): Order
    orderUpdate(id: ID!, input: OrderInput): Order
    orderDelete(id: ID!): String
  }
`;

module.exports = typeDefs;
