const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.port || 8100;
const mongoose = require("mongoose");

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
const mongourl =
  "mongodb+srv://ranjeet25:admin@cluster0.3qqu0sa.mongodb.net/TargetCoaching?retryWrites=true&w=majority";

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
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

// ***************  APP LISTEN ***************

app.listen(PORT, () => {
  console.log("sucess! server started ON " + "http://localhost:8100/");
});
