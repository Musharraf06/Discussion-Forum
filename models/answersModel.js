const mongoose = require("mongoose");

var answersSchema = new mongoose.Schema({
  answer: {
    type: String,
    require: true,
  },
  question_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  postedOn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("answersModel", answersSchema);
