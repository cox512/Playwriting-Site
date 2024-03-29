const express = require("express");
const router = express.Router();
const Play = require("../models/plays.js");
const upload = require("../services/file-upload");
const singleUpload = upload.single("prodStill");

//==============================
// Verifies current user has admin privileges
//==============================
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

//===============================
// ROUTES
//===============================
router.get("/new", isAuthenticated, (req, res) => {
  res.render("new.ejs", {
    currentUser: req.session.currentUser,
    titleBar: "New Play",
  });
});

router.get("/", (req, res) => {
  Play.find({}, (err, foundPlays) => {
    res.render("index.ejs", {
      plays: foundPlays,
      currentUser: req.session.currentUser,
      titleBar: "Plays",
    });
    if (err) {
      console.log("Error:", err);
    }
  });
});

router.post("/uploads", isAuthenticated, function (req, res) {
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
      res.redirect("/plays/" + createdPlay._id);
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

router.delete("/:id", isAuthenticated, (req, res) => {
  Play.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: false },
    (err, data) => {
      res.redirect("/plays");
    }
  );
});

module.exports = router;
