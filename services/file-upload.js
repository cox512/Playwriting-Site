//===============================
// Multer/AWS File Upload Set-Up
//===============================

const aws = require("aws-sdk");

const { S3 } = require("@aws-sdk/client-s3");

const multer = require("multer");
const multerS3 = require("multer-s3");

// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  region: process.env.AMAZON_REGION,
});

const s3 = new S3({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  },

  region: process.env.AMAZON_REGION,
});

const checkFileType = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Make sure the file has a jpeg, jpg, png, or gif extension."
      ),
      false
    );
  }
};

const upload = multer({
  fileFilter: checkFileType,
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
