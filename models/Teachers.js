const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  staff_name: String,
  staff_username: String,
  staff_password: String,
  date: Date,
  role: String,
});

TeacherModel = mongoose.model("teachersInfo", TeacherSchema);

module.exports = TeacherModel;
