const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    //or file.originalname + "-" + Date.now()
    // cb(null, Date.now() + "-" + file.originalname);
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});
//Check File Type
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

//NEW Route
router.get("/new", isAuthenticated, (req, res) => {
  res.render("new.ejs", {
    currentUser: req.session.currentUser,
    titleBar: "New Play",
  });
});

// INDEX ROUTE
router.get("/", (req, res) => {
  Play.find({}, (err, foundPlays) => {
    res.render("index.ejs", {
      plays: foundPlays,
      currentUser: req.session.currentUser,
      titleBar: "Plays",
    });
  });
});

//CREATE route
router.post("/", upload.single("prodStill"), isAuthenticated, (req, res) => {
  console.log(req.file);
  if (req.body.prodStill) {
    req.body.prodStill = `/images/${req.file.filename}`;
  }
  // console.log(req.body);
  Play.create(req.body, (err, createdPlay) => {
    // console.log(createdPlay);
    res.redirect("/plays");
  });
});

//Show Route
router.get("/:id", (req, res) => {
  Play.findById(req.params.id, (err, foundPlay) => {
    // console.log(foundPlay);
    res.render("show.ejs", {
      play: foundPlay,
      currentUser: req.session.currentUser,
      titleBar: foundPlay.title,
    });
  });
});

//DELETE route
router.delete("/:id", isAuthenticated, (req, res) => {
  Play.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: false },
    (err, data) => {
      res.redirect("/plays");
    }
  );
});

//EDIT route
router.get("/:id/edit", isAuthenticated, (req, res) => {
  Play.findById(req.params.id, (err, foundPlay) => {
    res.render("edit.ejs", {
      play: foundPlay,
      currentUser: req.session.currentUser,
      titleBar: "Update Page",
    });
  });
});

//UPDATE route
router.put("/:id", upload.single("prodStill"), isAuthenticated, (req, res) => {
  console.log(req);
  if (req.body.prodStill) {
    req.body.prodStill = `/images/${req.file.filename}`;
  }
  //Get the input field to show the selected file name.
  //Give the option to delete the photo file on the

  Play.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, useFindAndModify: false },
    (err, updatedModel) => {
      res.redirect("/plays/" + req.params.id);
    }
  );
});

module.exports = router;
