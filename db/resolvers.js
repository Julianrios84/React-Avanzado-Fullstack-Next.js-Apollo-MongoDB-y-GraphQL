// Resolver
const resolvers = {
  Query: {
    getUsers: () => 'Users'
  },
  Mutation: {
    createUser: (_, {input}) => {
      
    }
  }
}

module.exports = resolvers