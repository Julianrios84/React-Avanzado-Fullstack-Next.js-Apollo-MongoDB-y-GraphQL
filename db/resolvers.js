const User = require('../models/user.model')

// Resolver
const resolvers = {
  Query: {
    getUsers: () => 'Users'
  },
  Mutation: {
    createUser: (_, {input}) => {
      // Destructuring
      const { email, password } = input
      // Check user unique
      const exist = await User.findOne({ email })
      if(exist) throw new Error('The user is already registered.')
      // Hashear password

      // Save database
      try {
        const user = new User(input)
        user.save()
        return user
      } catch (error) {
        console.log("🚀 ~ file: resolvers.js:26 ~ error", error)
      }
    }
  }
}

module.exports = resolvers