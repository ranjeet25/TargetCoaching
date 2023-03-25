const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  course_name: String,
  course_subject: String,
  course_incharge: String,
});

CoursesModel = mongoose.model("CoursesInfo", CourseSchema);

module.exports = CoursesModel;
