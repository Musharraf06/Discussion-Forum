const mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now(),
  },
  votes: {
    type: Number,
    default: 0,
  },
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  tags: [{ type: String, required: true }],
});

var questionModel = mongoose.model("questionModel", questionSchema);
module.exports = mongoose.model("questionModel");
