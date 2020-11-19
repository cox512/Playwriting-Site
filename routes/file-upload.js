const express = require("express");
const router = express.Router();
const Play = require("../models/plays.js");

const upload = require("../services/file-upload");

//CHAGED 'IMAGE' TO 'FILE'
const singleUpload = upload.single("prodStill");

router.post("/uploads", function (req, res) {
  singleUpload(req, res, function (err) {
    if (req.file.metadata.fieldName) {
      // req.body.prodStill = `/images/${req.file.location}`;
      req.body.prodStill = req.file.location;
    }
    console.log("req.body:", req.body);
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    }
    // return res.json({ imageUrl: req.file.location });
    Play.create(req.body, (err, createdPlay) => {
      res.redirect("/plays");
    });
  });
});

module.exports = router;
