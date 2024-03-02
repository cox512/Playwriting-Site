const express = require("express");
const serverless = require("serverless-http");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const db = mongoose.connection;
const session = require("express-session");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

//===============================
// DATABASE
//===============================
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
db.on("open", () => {
  console.log("connected to Mongo");
});

//===============================
// MIDDLEWARE
//===============================
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

//===============================
// CONTROLLERS
//===============================
const playsController = require("./controllers/plays-controller.js");
app.use("/plays", playsController);

const userController = require("./controllers/users-controller.js");
app.use("/users", userController);

const sessionController = require("./controllers/sessions-controller.js");
app.use("/sessions", sessionController);

const contactController = require("./controllers/contact-controller.js");
app.use("/contact", contactController);

//===============================
// Landing Page Route
//===============================
app.get("/", (req, res) => {
  res.render("about.ejs", {
    titleBar: "Home",
    currentUser: req.session.currentUser,
  });
});

app.listen(PORT, () => console.log("Listening on port:", PORT));

/**
 * ------------ EXPORT -------
 */
// Export the API for Vercel function

module.export = app;
//module.export handler = serverless(app);
