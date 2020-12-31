const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");
const NEW = process.env.NEW;

//====================
// Gets the new user creation path on a hidden route
//====================
userRouter.get(`/${NEW}`, (req, res) => {
  res.render("users/new.ejs", {
    currentUser: req.session.currentUser,
    titleBar: "Create User",
  });
});

//===================
// Hashes new user's password and creates a new user in db
//===================
userRouter.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(9));
  User.create(req.body, (err, createdUser) => {
    res.redirect("/plays");
  });
});

module.exports = userRouter;
