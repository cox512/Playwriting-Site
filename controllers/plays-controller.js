const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only");
  }
};

const path = require("path");
const helpers = require("../helpers");
const Play = require("../models/plays.js");

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
    res.render("index.ejs", {
      plays: foundPlays,
      currentUser: req.session.currentUser,
      titleBar: "Plays",
    });
  });
});

router.post("/", upload.single("prodStill"), isAuthenticated, (req, res) => {
  if (req.file.filename) {
    req.body.prodStill = `/images/${req.file.filename}`;
  }
  Play.create(req.body, (err, createdPlay) => {
    res.redirect("/plays");
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

router.put("/:id", upload.single("prodStill"), isAuthenticated, (req, res) => {
  if (req.file) {
    req.body.prodStill = `/images/${req.file.filename}`;
  }
  Play.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, useFindAndModify: false },
    (err, updatedModel) => {
      console.log("updatedModel: ", updatedModel);
      res.redirect("/plays/" + req.params.id);
    }
  );
});

module.exports = router;
