require("dotenv").config({ path: ".env" });
// Packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Models
const User = require("../models/user.model");
const Product = require("../models/product.model");

// Functions
const createToken = (user, secret, expiresIn) => {
  const { id, email, name, lastname } = user;
  return jwt.sign({ id, email, name, lastname }, secret, { expiresIn });
};

// Resolver
const resolvers = {
  Query: {
    // ========= Users =========
    getUser: async (_, { token }) => {
      // Verify token
      return await jwt.verify(token, process.env.TOKEN_SECRET);
    },
    // ========= Products =========
    getProducts: async () => {
      try {
        return await Product.find({});
      } catch (error) {
        console.log("🚀 ~ file: resolvers.js:30 ~ getProducts: ~ error", error);
      }
    },
    getProduct: async (_, { id }) => {
      try {
        // Check product
        const product = await Product.findById(id);
        if (!product) throw new Error("Product not found!");
        return product;
      } catch (error) {
        console.log("🚀 ~ file: resolvers.js:40 ~ getProduct: ~ error", error);
      }
    },
  },
  Mutation: {
    // ========= Users =========
    createUser: async (_, { input }) => {
      // Destructuring
      const { email, password } = input;
      // Check user unique
      const exists = await User.findOne({ email });
      if (exists) throw new Error("The user is already registered.");
      // Hashear password
      const salt = await bcrypt.getSalt(10);
      input.password = await bcrypt.hash(password, salt);
      // Save database
      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {
        console.log("🚀 ~ file: resolvers.js:26 ~ error", error);
      }
    },
    authUser: async (_, { input }) => {
      // Destructuring
      const { email, password } = input;
      // Check user exists
      const user = await User.findOne({ email });
      if (user) throw new Error("Username does not exist.");
      // Check password is correct
      const passwordIsCorrect = await bcrypt.compare(password, exists.password);
      if (!passwordIsCorrect) throw new Error("The password is not correct.");
      // Crerate token
      return {
        token: createToken(
          user,
          process.env.TOKEN_SECRET,
          process.env.TOKEN_EXPIRESIN
        ),
      };
    },
    // ========= Products =========
    createProduct: async (_, { input }) => {
      try {
        const product = new Product(input);
        return await product.save();
      } catch (error) {
        console.log(
          "🚀 ~ file: resolvers.js:60 ~ createProduct: ~ error",
          error
        );
      }
    },
  },
};

module.exports = resolvers;
