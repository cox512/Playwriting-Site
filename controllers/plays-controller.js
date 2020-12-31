const express = require("express");
const router = express.Router();
const Play = require("../models/plays.js");

const upload = require("../services/file-upload");
const singleUpload = upload.single("prodStill");

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

//ROUTES

router.get("/new", isAuthenticated, (req, res) => {
  res.render("new.ejs", {
    currentUser: req.session.currentUser,
    titleBar: "New Play",
  });
});

router.get("/", (req, res) => {
  Play.find({}, (err, foundPlays) => {
    // Can you add some error handling here?
    res.render("index.ejs", {
      plays: foundPlays,
      currentUser: req.session.currentUser,
      titleBar: "Plays",
    });
  });
});

router.post("/uploads", function (req, res) {
  // ADD IS AUTHENTICATED?
  singleUpload(req, res, function (err) {
    if (req.file !== undefined) {
      req.body.prodStill = req.file.location;
    }
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    }
    Play.create(req.body, (err, createdPlay) => {
      res.redirect("/plays");
    });
  });
});

router.get("/:id", (req, res) => {
  Play.findById(req.params.id, (err, foundPlay) => {
    res.render("show.ejs", {
      play: foundPlay,
      currentUser: req.session.currentUser,
      titleBar: foundPlay.title,
    });
  });
});

router.delete("/:id", isAuthenticated, (req, res) => {
  Play.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: false },
    (err, data) => {
      res.redirect("/plays");
    }
  );
});

router.get("/:id/edit", isAuthenticated, (req, res) => {
  Play.findById(req.params.id, (err, foundPlay) => {
    res.render("edit.ejs", {
      play: foundPlay,
      currentUser: req.session.currentUser,
      titleBar: "Update Page",
    });
  });
});

router.put("/uploads/:id", isAuthenticated, (req, res) => {
  singleUpload(req, res, function (err) {
    if (req.file !== undefined) {
      req.body.prodStill = req.file.location;
    }

    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    }
    Play.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, useFindAndModify: false },
      (err, updatedModel) => {
        res.redirect("/plays/" + req.params.id);
      }
    );
  });
});

module.exports = router;
