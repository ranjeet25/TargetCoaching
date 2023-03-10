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
    console.log(result);
    branchData = result;
    res.status(200);
  });

  res.send("Data Submited");
});

router.get("/branchDetails", (req, res) => {
  BranchModel.find().then((result) => {
    res.send(result);
  });
});

module.exports = router;
