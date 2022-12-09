require("dotenv").config({ path: ".env" });
// Packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Models
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Client = require("../models/client.model");

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
      try {
        // Verify token
        return await jwt.verify(token, process.env.TOKEN_SECRET);
      } catch (error) {}
    },
    // ========= Products =========
    getProducts: async () => {
      try {
        return await Product.find({});
      } catch (error) {
      }
    },
    getProduct: async (_, { id }) => {
      try {
        // Check product
        const product = await Product.findById(id);
        if (!product) throw new Error("Product not found!");
        return product;
      } catch (error) {}
    },
    // ========= Clients =========
    getClients: async () => {
      try {
        return await Client.find({});
      } catch (error) {}
    },
    getClientsForVendor: async (_, {}, ctx) => {
      try {
        return await Client.find({ vendor: ctx.user.id.toString() })
      } catch (error) {}
    },
  },
  Mutation: {
    // ========= Users =========
    createUser: async (_, { input }) => {
      try {
        // Destructuring
        const { email, password } = input;
        // Check user unique
        const exists = await User.findOne({ email });
        if (exists) throw new Error("The user is already registered.");
        // Hashear password
        const salt = await bcrypt.getSalt(10);
        input.password = await bcrypt.hash(password, salt);
        // Save database
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {}
    },
    authUser: async (_, { input }) => {
      try {
        // Destructuring
        const { email, password } = input;
        // Check user exists
        const user = await User.findOne({ email });
        if (user) throw new Error("Username does not exist.");
        // Check password is correct
        const passwordIsCorrect = await bcrypt.compare(
          password,
          exists.password
        );
        if (!passwordIsCorrect) throw new Error("The password is not correct.");
        // Crerate token
        return {
          token: createToken(
            user,
            process.env.TOKEN_SECRET,
            process.env.TOKEN_EXPIRESIN
          ),
        };
      } catch (error) {}
    },
    // ========= Products =========
    createProduct: async (_, { input }) => {
      try {
        // Save database
        const product = new Product(input);
        return await product.save();
      } catch (error) {}
    },
    updateProduct: async (_, { id, input }) => {
      try {
        // Check product
        let product = await Product.findById(id);
        if (!product) throw new Error("Product not found!");
        // Save product update
        return await Product.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });
      } catch (error) {}
    },
    deleteProduct: async (_, { id }) => {
      try {
        // Check product
        let product = await Product.findById(id);
        if (!product) throw new Error("Product not found!");
        await Product.deleteOne({ _id: id });
        return "Product delete!";
      } catch (error) {}
    },
    // ========= Clients =========
    createClient: async (_, { input }, ctx) => {
      try {
        // Destructuring
        const { email } = input;
        // Check client
        let exits = await Client.findOne({ email });
        if (!exits) throw new Error("The client is already registered.");

        // Create instance client
        const client = new Client(input);
        // Assign vendor
        client.vendor = ctx.user.id;
        // Save database
        return await client.save();
      } catch (error) {}
    },
  },
};

module.exports = resolvers;
