const express = require("express");
const router = express.Router(); // Instance of Router in Express
const path = require("path");
const UserModel = require("../models/User");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/register.html"));
});

router.post("/", (req, res) => {
  UserModel.create({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    role: req.body.role,
    phone: req.body.phone,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
  }).then((result) => {
    res.status(200);
    console.log(result);
  });

  res.send("Data Submited");
});

module.exports = router;
