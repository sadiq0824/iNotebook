const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  }
});
const user=mongoose.model("users", userSchema);


module.exports = user;
