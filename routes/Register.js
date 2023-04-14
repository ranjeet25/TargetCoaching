const express = require("express");
const router = express.Router(); // Instance of Router in Express
const path = require("path");
const UserModel = require("../models/User");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/register.html"));
});

router.post("/", (req, res) => {
  UserModel.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((data) => {
    if (data == null) {
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
        res.sendFile(path.join(__dirname, "../pages/alert/sucess.html"));
        // console.log(result);
      });
    } else {
      res.sendFile(path.join(__dirname, "../pages/alert/registered.html"));
    }
  });
});

module.exports = router;
