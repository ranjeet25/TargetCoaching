const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/superadmin.html"));
});

const BranchModel = require("../models/Branch");

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

  res.send("Data Submited");
});

router.post("/removeBranch", (req, res) => {
  const branch_id = req.body.branch_id;
  BranchModel.deleteOne({ _id: branch_id }).catch((err) => {
    console.log(err);
  });

  res.send("Branch Removed");
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

  res.send("Data Updated");
});

router.get("/branchDetails", (req, res) => {
  BranchModel.find().then((result) => {
    res.send(result);
  });
});

module.exports = router;
