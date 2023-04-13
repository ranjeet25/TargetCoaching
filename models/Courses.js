const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  course_name: String,
  course_subject: String,
  course_incharge: String,
  course_time: String,
  course_fees: String,
  branch_id: String,
});

CoursesModel = mongoose.model("CoursesInfo", CourseSchema);

module.exports = CoursesModel;
