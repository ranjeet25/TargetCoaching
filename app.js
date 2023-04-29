const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8100;
const mongoose = require("mongoose");
require("dotenv").config();

const bodyparser = require("body-parser");
app.use(express.json());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// *************** INDEX ROUTE ***************

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// *************** MONGODB CONNECTION ***************
const mongourl = process.env.DBURL;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
    console.log(err);
  });

// *************** LOGIN ROUTE ***************

const userLogin = require("./routes/Login");
app.use("/login", userLogin);

// *************** REGISTRATION ROUTE ***************

const userRegister = require("./routes/Register");
app.use("/register", userRegister);

// *************** SuperAdmin ROUTE ***************

const superAdmin = require("./routes/SuperAdmin");
app.use("/superAdmin", superAdmin);

// *************** Admin ROUTE ***************

const Admin = require("./routes/Admin");
app.use("/admin", Admin);

// *************** student ROUTE ***************

const Student = require("./routes/Student");
app.use("/student", Student);

// *************** Staff ROUTE ***************

const Staff = require("./routes/Staff");
app.use("/staff", Staff);

// ***************  APP LISTEN ***************

app.listen(PORT, () => {
  console.log("sucess! server started ON " + `http://localhost:${PORT}`);
});
