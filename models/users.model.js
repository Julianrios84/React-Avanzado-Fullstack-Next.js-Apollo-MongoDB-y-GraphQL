const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
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
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

//Export the model
module.exports = mongoose.model("User", userSchema);
