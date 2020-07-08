//Dependencies
const express = require('express');
const app = express ();
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;
const session = require('express-session');
require('dotenv').config();
const bcrypt = require('bcrypt');

//Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;

//Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('the connection with mongod is established')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{
    console.log('connected to Mongo');
});

//Middleware
//express-session
app.use(
    session({
        secret: process.env.SECRET, //may need to change
        resave: false,
        saveUninitialized: false
    }))

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON

//use method override
app.use(methodOverride('_method'));

//CONTROLLERS
//Plays controller
const playsController = require('./controllers/plays-controller.js');
app.use('/plays', playsController);

//User controller
const userController = require('./controllers/users-controller.js');
app.use('/users', userController);

//Sessions controller
const sessionController = require('./controllers/sessions-controller.js');
app.use('/sessions', sessionController);

//Listener
app.listen(PORT, () => console.log( 'Listening on port:', PORT));