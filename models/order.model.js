const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Client",
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  order: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'PENDING'
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
