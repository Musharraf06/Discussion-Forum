const mongoose = require("mongoose");

// Schema
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  userQuestion: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  logo: {
    type: String,
    required: true,
  },
});

// Models
var userModel = mongoose.model("userModel", userSchema);
module.exports = mongoose.model("userModel");
