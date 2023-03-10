const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  role: String,
  phone: Number,
  gender: String,
  username: String,
  password: String,
});

userModel = mongoose.model("userInfo", UserSchema);

module.exports = userModel;
