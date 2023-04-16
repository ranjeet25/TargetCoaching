const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  student_name: String,
  student_username: String,
  student_password: String,
  course: String,
  fees_paid: String,
  fees_pending: String,
  date: Date,
  role: String,
  branch_id: String,
  batch: String,
});

StudentsModel = mongoose.model("StudentsInfo", StudentSchema);

module.exports = StudentsModel;
