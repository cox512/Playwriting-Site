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

router.post("/uploads", function (req, res) {
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
