const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/superadmin.html"));
});

const BranchModel = require("../models/Branch");

const TeacherModel = require("../models/Teachers");
const CoursesInfo = require("../models/Courses");
const StudentsInfo = require("../models/Students");
const BatchesInfo = require("../models/Batches");

router.post("/", (req, res) => {
  BranchModel.create({
    branch_name: req.body.branch_name,
    location: req.body.location,
    date: req.body.date,
  }).then((result) => {
    // console.log(result);
    branchData = result;
    res.status(200);
  });
  // res.send("Data submited");
  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.post("/removeBranch", (req, res) => {
  const branch_id = req.body.branch_id;
  BranchModel.deleteOne({ _id: branch_id }).catch((err) => {
    console.log(err);
  });

  // res.send("Branch Removed");
  res.sendFile(path.join(__dirname, "../pages/alert/removed.html"));
});

router.post("/addAdmin", (req, res) => {
  const branch_id = req.body.branch_id;
  const admin_name = req.body.admin_name;
  const admin_username = req.body.admin_email;
  const admin_pass = req.body.admin_pass;

  BranchModel.findOneAndUpdate(
    { _id: branch_id },
    {
      branch_Admin_name: admin_name,
      branch_Admin_username: admin_username,

      branch_Admin_password: admin_pass,
      role: "admin",
    },

    { new: true }
  ).catch((err) => console.log(err));

  res.sendFile(path.join(__dirname, "../pages/alert/submit.html"));
});

router.get("/branchDetails", (req, res) => {
  BranchModel.find().then((result) => {
    res.send(result);
  });
});

router.post("/update", (req, res) => {
  const branch_id = req.body.branch_id;

  // console.log(req.body.branch_name);

  BranchModel.findOneAndUpdate(
    { _id: branch_id },
    {
      branch_name: req.body.branch_name,
      location: req.body.location,
      date: req.body.date,
    },

    { new: true }
  ).catch((err) => console.log(err));

  res.sendFile(path.join(__dirname, "../pages/alert/update.html"));
});

// *********** Get DETAILS BY BRANCH id *************

// router.post("/getDetails", (req, res) => {
//   var array = new Array();
//   // var test = ["hello", [{ data: "data" }, "is good"]];
//   // array.push(test);
//   const branch_id = req.body.branch_id;
//   console.log(branch_id);
//   TeacherModel.find({ branch_id: branch_id })
//     .then((result) => {
//       // console.log(result);
//       // branchInfo.push(result);
//       array.push(result);
//     })
//     .catch((err) => console.log(err));

//   StudentsInfo.find({ branch_id: branch_id })
//     .then((result) => {
//       // console.log(result);
//       array.push(result);
//     })
//     .catch((err) => console.log(err));

//   CoursesInfo.find({ branch_id: branch_id })
//     .then((result) => {
//       // console.log(result);
//       array.push(result);
//       // console.log(array);
//     })
//     .catch((err) => console.log(err));

//   BatchesInfo.find({ branch_id: branch_id })
//     .then((result) => {
//       // console.log(result);
//     })
//     .catch((err) => console.log(err));

//   console.log(array);
//   res.send(array);
// });
var branchInfo = [];
router.post("/getDetails", async (req, res) => {
  branchInfo = [];
  try {
    const teacherResult = TeacherModel.find({
      branch_id: req.body.branch_id,
    }).exec();

    const studentResult = StudentsInfo.find({
      branch_id: req.body.branch_id,
    }).exec();
    const courseResult = CoursesInfo.find({
      branch_id: req.body.branch_id,
    }).exec();
    const batchResult = BatchesInfo.find({
      branch_id: req.body.branch_id,
    }).exec();

    const [teachers, students, courses, batches] = await Promise.all([
      teacherResult,
      studentResult,
      courseResult,
      batchResult,
    ]);

    branchInfo.push(teachers, students, courses, batches);
    // console.log(branchInfo);

    res.sendFile(path.join(__dirname, "../pages/superadmin.html"));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/branchinfo", (req, res) => {
  res.send(branchInfo);
});

module.exports = router;
