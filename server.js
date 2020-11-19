const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const db = mongoose.connection;
const session = require("express-session");
require("dotenv").config();
// const aws = require("aws-sdk");

//Port
const PORT = process.env.PORT;

//Database
const DB_URI = process.env.DB_URI;

mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("the connection with mongod is established");
  }
);

db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", DB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// open the connection to mongo
db.on("open", () => {
  console.log("connected to Mongo");
});

//Middleware
//express-session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//use public folder for static assets
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));

//CONTROLLERS
const playsController = require("./controllers/plays-controller.js");
const uploadRoute = require("./routes/file-upload"); //Might not need
app.use("/plays", playsController);
app.use("/plays", uploadRoute); //Might not need

const userController = require("./controllers/users-controller.js");
app.use("/users", userController);

const sessionController = require("./controllers/sessions-controller.js");
app.use("/sessions", sessionController);

const contactController = require("./controllers/contact-controller.js");
app.use("/contact", contactController);

//Landing page
app.get("/", (req, res) => {
  res.render("about.ejs", {
    titleBar: "Home",
    currentUser: req.session.currentUser,
  });
});

app.listen(PORT, () => console.log("Listening on port:", PORT));

// const S3_BUCKET = process.env.S3_BUCKET;

// aws.config.region = "us-east-2";
