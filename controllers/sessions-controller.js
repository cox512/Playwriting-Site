const express = require("express");
const User = require("../models/users");
const sessionsRouter = express.Router();
const bcrypt = require("bcrypt");

sessionsRouter.get("/new", (req, res) => {
  res.render("sessions/new.ejs", {
    currentUser: req.session.currentUser,
    titleBar: "Log-In",
  });
});

sessionsRouter.post("/", (req, res) => {
  //Check to see if the user exists
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    //Check for an error in the query
    if (err) {
      console.log(err);
      res.send("Something bad happened in the database");
    } else if (!foundUser) {
      res.send("<a href='/'>Sorry, user not found.</a>");
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/plays");
      } else {
        res.send('<a href="/">Incorrect password.</a>');
      }
    }
  });
});

//DELETE route for logging out
sessionsRouter.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/plays");
  });
});

module.exports = sessionsRouter;
