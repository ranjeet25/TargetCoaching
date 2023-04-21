const express = require("express");
const router = express.Router();
const path = require("path");
const test = require("./Login");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/admin.html"));
});

// ************ STAFF ROUTES ************

const TeacherModel = require("../models/Teachers");

var admin_branch_id;
router.post("/branch_id", (req, res) => {
  admin_branch_id = req.body.branch_id;
});

router.post("/manage_staff", (req, res) => {
  TeacherModel.create({
    staff_name: req.body.staff_name,
    staff_username: req.body.staff_username,
    staff_password: req.body.staff_password,
    date: req.body.date,
    branch_id: req.body.branch_id,
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
  res.sendFile(path.join(__dirname, "../pages/alert/removed.html"));
});

// router.get("/staffDetails", (req, res) => {
//   TeacherModel.find().then((result) => {
//     res.send(result);
//   });
// });

router.post("/update", (req, res) => {
  const staff_id = req.body.staff_id;

  // console.log(req.body.branch_name);

  TeacherModel.findOneAndUpdate(
    { _id: staff_id },
    {
      staff_name: req.body.staff_name,
      staff_username: req.body.staff_username,
      staff_password: req.body.staff_password,
      date: req.body.date,
    },

    { new: true }
  ).catch((err) => console.log(err));

  res.sendFile(path.join(__dirname, "../pages/alert/update.html"));
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
    branch_id: req.body.branch_id,
    role: "student",
    batch: req.body.batch,
  }).then((result) => {
    res.status(200);
    // console.log(result);
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
  res.sendFile(path.join(__dirname, "../pages/alert/removed.html"));
});

// router.get("/studentDetails", (req, res) => {
//   console.log(admin_branch_id);
//   StudentsInfo.find({ branch_id: admin_branch_id })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post("/student_update", (req, res) => {
  const student_id = req.body.student_id;

  // console.log(req.body.student_id);

  StudentsInfo.findOneAndUpdate(
    { _id: student_id },
    {
      course: req.body.student_Course,
      fees_pending: req.body.pending_fees,
    },

    { new: true }
  ).catch((err) => console.log(err));

  res.sendFile(path.join(__dirname, "../pages/alert/update.html"));
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
    course_fees: req.body.course_fees,
    course_time: req.body.course_time,
    branch_id: req.body.branch_id,
  }).then((result) => {
    res.status(200);
    // console.log(result);
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
  res.sendFile(path.join(__dirname, "../pages/alert/removed.html"));
});

// router.get("/courseDetails", (req, res) => {
//   CoursesInfo.find({ branch_id: admin_branch_id }).then((result) => {
//     res.send(result);
//   });
// });

router.post("/course_update", (req, res) => {
  const course_id = req.body.course_id;

  // console.log(req.body.course_id);

  CoursesInfo.findOneAndUpdate(
    { _id: course_id },
    {
      course_name: req.body.course_name,
      course_subject: req.body.course_subject,
      course_incharge: req.body.course_incharge,
      course_fees: req.body.course_fees,
      course_time: req.body.course_time,
    },

    { new: true }
  ).catch((err) => console.log(err));

  res.sendFile(path.join(__dirname, "../pages/alert/update.html"));
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
    branch_id: req.body.branch_id,
  }).then((result) => {
    res.status(200);
    // console.log(result);
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
  res.sendFile(path.join(__dirname, "../pages/alert/removed.html"));
});

// router.get("/batchDetails", (req, res) => {
//   BatchesInfo.find({ branch_id: admin_branch_id }).then((result) => {
//     res.send(result);
//   });
// });

router.post("/update_batch", (req, res) => {
  const batch_id = req.body.batch_id;

  // console.log(req.body.batch_id);

  BatchesInfo.findOneAndUpdate(
    { _id: batch_id },
    {
      batch_name: req.body.batch_name,
      batch_time: req.body.batch_time,
      batch_course: req.body.batch_course,
      batch_incharge: req.body.batch_incharge,
    },

    { new: true }
  ).catch((err) => console.log(err));

  res.sendFile(path.join(__dirname, "../pages/alert/update.html"));
});

// ************ BATCHES ROUTES ENDS ************

// ************ UPDATE ROUTES ENDS  ************

module.exports = router;
