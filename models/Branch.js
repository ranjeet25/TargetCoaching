const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  branch_name: String,
  location: String,
  date: Date,
  branch_Admin_name: String,
  branch_Admin_username: String,
  branch_Admin_password: String,
  role: String,
});

BranchModel = mongoose.model("BranchInfo", BranchSchema);

module.exports = BranchModel;
