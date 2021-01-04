const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

//===============================
// ROUTES
//===============================
router.get("/", (req, res) => {
  res.render("contact.ejs", {
    currentUser: req.session.currentUser,
    titleBar: "Contact",
  });
});

router.post("/", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: USERNAME,
      pass: PASSWORD,
    },
  });

  const mailOpts = {
    from: `${req.body.name} ${req.body.email}`,
    to: USERNAME,
    subject: "New message from Playwriting contact form",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
  };

  transporter.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render("messages/failure.ejs", {
        currentUser: req.session.currentUser,
        titleBar: "Contact",
      });
    } else {
      res.render("messages/success.ejs", {
        currentUser: req.session.currentUser,
        titleBar: "Contact",
      });
    }
  });
});

module.exports = router;
