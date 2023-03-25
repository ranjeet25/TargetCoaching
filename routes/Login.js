const express = require("express");
const router = express.Router();
const path = require("path");
const UserModel = require("../models/User");
const adminModel = require("../models/Branch");
const staffModel = require("../models/Teachers");
const studentModel = require("../models/Students");
const courseModel = require("../models/Courses");
const batchModel = require("../models/Batches");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/login.html"));
});

var superAdminData = new Object();
var adminData = new Object();
var studentData = new Object();
var staffData = new Array();

router.post("/", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body.role;

  if (role == "super_admin") {
    UserModel.findOne({ username: username }).then((result) => {
      if (result.password === password) {
        superAdminData = result;
        res.sendFile(path.join(__dirname, "../pages/superAdmin.html"));
      } else {
        res.send("wrong Login Info");
      }
    });
  } else if (role == "admin") {
    adminModel.findOne({ branch_Admin_username: username }).then((result) => {
      if (result.branch_Admin_password === password) {
        adminData = result;
        // console.log(adminData);
        res.sendFile(path.join(__dirname, "../pages/admin.html"));
      } else {
        res.send("wrong Login Info");
      }
    });
  } else if (role == "staff") {
    courseModel.findOne({ course_incharge: username }).then((result) => {
      staffData.push(result);
    });

    batchModel.findOne({ batch_incharge: username }).then((result) => {
      staffData.push(result);
    });

    staffModel.findOne({ staff_username: username }).then((result) => {
      if (result.staff_password === password) {
        staffData.push(result);
        res.sendFile(path.join(__dirname, "../pages/staff.html"));
      } else {
        res.send("wrong Login Info");
      }
    });
  } else if (role == "student") {
    studentModel.findOne({ student_username: username }).then((result) => {
      if (result.student_password === password) {
        studentData = result;
        res.sendFile(path.join(__dirname, "../pages/student.html"));
      } else {
        res.send("wrong Login Info");
      }
    });
  }
});

router.get("/superAdminData", (req, res) => {
  res.send(superAdminData);
});
router.get("/adminData", (req, res) => {
  res.send(adminData);
});
router.get("/staffData", (req, res) => {
  res.send(staffData);
});
router.get("/studentData", (req, res) => {
  res.send(studentData);
});

module.exports = router;
