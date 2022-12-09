const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

//Export the model
module.exports = mongoose.model("Client", clientSchema);
