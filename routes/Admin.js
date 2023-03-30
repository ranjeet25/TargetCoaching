const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/admin.html"));
});

// ************ STAFF ROUTES ************

const TeacherModel = require("../models/Teachers");

router.post("/manage_staff", (req, res) => {
  TeacherModel.create({
    staff_name: req.body.staff_name,
    staff_username: req.body.staff_username,
    staff_password: req.body.staff_password,
    date: req.body.date,
    role: "staff",
  }).then((result) => {
    res.status(200);
    // console.log(result);
  });

  // res.send("Staff Added");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.post("/removeStaff", (req, res) => {
  const staff_id = req.body.staff_id;
  TeacherModel.deleteOne({ _id: staff_id }).catch((err) => {
    console.log(err);
  });

  // res.send("Staff Removed");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.get("/staffDetails", (req, res) => {
  TeacherModel.find().then((result) => {
    res.send(result);
  });
});

// ************ STAFF ROUTES ENDS ************

// ************ STUDENTS ROUTES  ************
const StudentsInfo = require("../models/Students");
router.get("/manage_student/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/manage_student.html"));
});
router.post("/manage_student/", (req, res) => {
  StudentsInfo.create({
    student_name: req.body.student_name,
    student_username: req.body.student_username,
    student_password: req.body.student_password,
    course: req.body.course,
    fees_paid: req.body.fees_paid,
    fees_pending: req.body.fees_pending,
    date: req.body.date,
    role: "student",
  }).then((result) => {
    res.status(200);
    console.log(result);
  });

  // res.send("Student Added");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.post("/removeStudent", (req, res) => {
  const student_id = req.body.student_id;
  StudentsInfo.deleteOne({ _id: student_id }).catch((err) => {
    console.log(err);
  });

  // res.send("Student Removed");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.get("/studentDetails", (req, res) => {
  StudentsInfo.find().then((result) => {
    res.send(result);
  });
});

// ************ STUDENTS ROUTES ENDS ************

// ************ COURSE ROUTES ************
const CoursesInfo = require("../models/Courses");
router.get("/manage_courses/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/manage_courses.html"));
});
router.post("/manage_courses/", (req, res) => {
  CoursesInfo.create({
    course_name: req.body.course_name,
    course_subject: req.body.course_subject,
    course_incharge: req.body.course_incharge,
  }).then((result) => {
    res.status(200);
    console.log(result);
  });

  // res.send("Course Added");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.post("/deleteCourse", (req, res) => {
  const course_id = req.body.course_id;
  CoursesInfo.deleteOne({ _id: course_id }).catch((err) => {
    console.log(err);
  });

  // res.send("Course Removed");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.get("/courseDetails", (req, res) => {
  CoursesInfo.find().then((result) => {
    res.send(result);
  });
});

// ************ COURSE ROUTES ENDS ************
// ************ BATCHES ROUTES  ************

const BatchesInfo = require("../models/Batches");
router.get("/manage_batches/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/manage_batches.html"));
});

router.post("/manage_batches/", (req, res) => {
  BatchesInfo.create({
    batch_name: req.body.batch_name,
    batch_time: req.body.batch_time,
    batch_course: req.body.batch_course,
    batch_incharge: req.body.batch_incharge,
  }).then((result) => {
    res.status(200);
    console.log(result);
  });

  // res.send("Batch Added");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.post("/deleteBatch", (req, res) => {
  const batch_id = req.body.batch_id;
  BatchesInfo.deleteOne({ _id: batch_id }).catch((err) => {
    console.log(err);
  });

  // res.send("Batch Deleted");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.get("/batchDetails", (req, res) => {
  BatchesInfo.find().then((result) => {
    res.send(result);
  });
});

// ************ BATCHES ROUTES ENDS ************

module.exports = router;
