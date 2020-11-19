const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const path = require("path");

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2",
});

const s3 = new aws.S3();

const checkFileType = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  //   const extname = filetypes.test(
  //     path.extname(file.originalname).toLowerCase()
  //   );
  const mimetype = filetypes.test(file.mimetype);
  //Was 'if (mimetype && extname)'
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

//Not sure if I still need the fileFilter key
//   const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       checkFileType(file, cb);
//     },
//   });

const upload = multer({
  fileFilter: checkFileType,
  storage: multerS3({
    s3,
    bucket: "playwritingsite",
    acl: "public-read",
    //The file name is getting set with metadata fieldName and key I think.
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
