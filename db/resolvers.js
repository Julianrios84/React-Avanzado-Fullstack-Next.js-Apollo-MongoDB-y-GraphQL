require("dotenv").config({ path: ".env" });
// Packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Models
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Client = require("../models/client.model");
const Order = require("../models/order.model");

// Functions
const createToken = (user, secret, expiresIn) => {
  const { id, email, name, surnames } = user;
  return jwt.sign({ id, email, name, surnames }, secret, { expiresIn });
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
      } catch (error) {}
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
    getClient: async (_, { id }, ctx) => {
      try {
        // Check if the client exists
        const client = await Client.findById(id);
        if (!client) throw new Error("Client not found.");
        // Check if the client is mine
        if (client.vendor.toString() !== ctx.user.id)
          throw new Error("Not your client.");

        return client;
      } catch (error) {}
    },
    getClientsForSeller: async (_, {}, ctx) => {
      try {
        return await Client.find({ vendor: ctx.user.id.toString() });
      } catch (error) {}
    },
    // ========= Orders =========
    getOrders: async () => {
      try {
        return await Order.find({});
      } catch (error) {}
    },
    getOrdersForSeller: async (_, {}, ctx) => {
      try {
        return await Order.find({ vendor: ctx.user.id });
      } catch (error) {}
    },
    getOrder: async (_, { id }, ctx) => {
      try {
        // Check if the order exists
        const order = await Order.findById(id);
        if (!order) throw new Error("Order not found.");
        // Check if the order is mine
        if (order.vendor.toString() !== ctx.user.id)
          throw new Error("Not your order.");
        // Return result
        return order;
      } catch (error) {}
    },
    getOrdersForStatus: async (_, { status }, ctx) => {
      try {
        return await Order.find({ vendor: ctx.user.id, status });
      } catch (error) {}
    },
    // ========= search's Advanced =========
    bestCustomers: async () => {
      try {
        return await Order.aggregate([
          {
            $match: {
              status: "COMPLETE",
            },
          },
          {
            $group: {
              _id: "$client",
              total: { $sum: "$total" },
            },
          },
          {
            $lookup: {
              from: "clients",
              localField: "_id",
              foreignField: "_id",
              as: "client",
            },
          },
          {
            $sort: {
              total: -1
            }
          }
        ]);
      } catch (error) {}
    },
  },
  Mutation: {
    // ========= Users =========
    createUser: async (_, { input }) => {
      try {
        // Destructuring
        const { email, password } = input;
        // Check if user is unique
        const exists = await User.findOne({ email });
        if (exists) throw new Error("The user is already registered.");
        // Hashed password
        const salt = await bcrypt.getSalt(10);
        input.password = await bcrypt.hash(password, salt);
        // Save in database
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {}
    },
    authUser: async (_, { input }) => {
      try {
        // Destructuring
        const { email, password } = input;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (user) throw new Error("Username does not exist.");
        // Check password is correct
        const passwordIsCorrect = await bcrypt.compare(
          password,
          exists.password
        );
        if (!passwordIsCorrect) throw new Error("The password is not correct.");
        // Create token
        return {
          token: createToken(
            user,
            process.env.TOKEN_SECRET,
            process.env.TOKEN_EXPIRES
          ),
        };
      } catch (error) {}
    },
    // ========= Products =========
    createProduct: async (_, { input }) => {
      try {
        // Save in database
        const product = new Product(input);
        return await product.save();
      } catch (error) {}
    },
    updateProduct: async (_, { id, input }) => {
      try {
        // Check if the product exists
        let product = await Product.findById(id);
        if (!product) throw new Error("Product not found!");
        // Save updated product
        return await Product.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });
      } catch (error) {}
    },
    deleteProduct: async (_, { id }) => {
      try {
        // Check if the product exists
        let product = await Product.findById(id);
        if (!product) throw new Error("Product not found!");
        // Deleted product
        await Product.findOneAndDelete({ _id: id });
        return "Product delete!";
      } catch (error) {}
    },
    // ========= Clients =========
    createClient: async (_, { input }, ctx) => {
      try {
        // Destructuring
        const { email } = input;
        // Check if the client exists
        let exits = await Client.findOne({ email });
        if (!exits) throw new Error("The client is already registered.");
        // Create instance client
        const client = new Client(input);
        // Assign seller
        client.vendor = ctx.user.id;
        // Save in database
        return await client.save();
      } catch (error) {}
    },
    updateClient: async (_, { id, input }, ctx) => {
      try {
        // Check if the client exists
        let client = await Client.findById(id);
        if (!client) throw new Error("Client not found!");
        // Check if the client is mine
        if (client.vendor.toString() !== ctx.user.id)
          throw new Error("Not your client.");
        // Save updated product
        return await Client.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });
      } catch (error) {}
    },
    deleteClient: async (_, { id }, ctx) => {
      try {
        // Check if the client exists
        let client = await Client.findById(id);
        if (!client) throw new Error("Product not found!");
        // Check if the client is mine
        if (client.vendor.toString() !== ctx.user.id)
          throw new Error("Not your client.");
        // Deleted client
        await Client.findOneAndDelete({ _id: id });
        return "Client delete!";
      } catch (error) {}
    },
    // ========= Orders =========
    createOrder: async (_, { input }, ctx) => {
      try {
        // Destructuring
        const { client: id } = input;
        // Check if the client exists
        let client = await Client.findById(id);
        if (!client) throw new Error("Client not found!");
        // Check if the client is mine
        if (client.vendor.toString() !== ctx.user.id)
          throw new Error("Not your client.");
        // Check if stock available
        for await (const item of input.order) {
          const { id } = item;
          const product = await Product.findById(id);
          if (item.stock > product.stock) {
            throw new Error(
              `Product ${product.name} exceeds quantity available.`
            );
          } else {
            product.stock = product.stock - item.stock;
            await product.save();
          }
        }
        // Create an order instance
        const order = new Order(input);
        // Assign seller
        order.vendor = ctx.user.id;
        // Save in database
        return await order.save();
      } catch (error) {}
    },
    updateOrder: async (_, { id, input }, ctx) => {
      try {
        // Check if the order exists
        const order = await Order.findById(id);
        if (!order) throw new Error(`Order not found.`);
        // Check if the client exists
        const client = await Client.findById(id);
        if (!client) throw new Error(`Client not found.`);
        // Check if the client and order is mine
        if (order.vendor.toString() !== ctx.user.id)
          throw new Error("Not your order.");
        if (client.vendor.toString() !== ctx.user.id)
          throw new Error("Not your client.");
        // Check if stock available
        if (input.order) {
          for await (const item of input.order) {
            const { id } = item;
            const product = await Product.findById(id);
            if (item.stock > product.stock) {
              throw new Error(
                `Product ${product.name} exceeds quantity available.`
              );
            } else {
              product.stock = product.stock + item.stock;
              await product.save();
            }
          }
        }
        // Save in database
        return await Order.findOneAndUpdate({ _id: id }, input, { new: true });
      } catch (error) {}
    },
    deleteOrder: async (_, { id }, ctx) => {
      try {
        // Check if the client exists
        let order = await Order.findById(id);
        if (!order) throw new Error("Order not found!");
        // Check if the client is mine
        if (order.vendor.toString() !== ctx.user.id)
          throw new Error("Not your order.");
        // Deleted client
        await Order.findOneAndDelete({ _id: id });
        return "Order delete!";
      } catch (error) {}
    },
  },
};

module.exports = resolvers;
