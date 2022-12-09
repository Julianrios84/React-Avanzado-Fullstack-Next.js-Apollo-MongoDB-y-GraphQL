// Resolver
const resolvers = {
  Query: {
    getUsers: () => 'Users'
  },
  Mutation: {
    createUser: () => 'Create user!'
  }
}

module.exports = resolvers