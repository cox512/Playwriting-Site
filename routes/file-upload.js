const express = require("express");
const router = express.Router();

const upload = require("../services/file-upload");

//CHAGED 'IMAGE' TO 'FILE'
const singleUpload = upload.single("prodStill");

//changed below from "image-upload"
router.post("/uploads", function (req, res) {
  // if (req.file.filename) {
  //   req.body.prodStill = `/images/${req.file.filename}`;
  // }

  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    }
    console.log("POST console:", req.file.location);
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
