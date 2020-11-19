const express = require("express");
const router = express.Router();

const upload = require("../services/file-upload");

const singleUpload = upload.single("image");

//changed below from "image-upload"
router.post("/image-upload", function (req, res) {
  // if (req.file.filename) {
  //   req.body.prodStill = `/images/${req.file.filename}`;
  // }

  singleUpload(req, res, function (err) {
    if (err) {
      return res
        .status(422)
        .send({
          errors: [{ title: "File Upload Error", detail: err.message }],
        });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
