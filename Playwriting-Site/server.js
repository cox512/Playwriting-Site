//Dependencies
const express = require('express');
const app = express ();
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;
const Play = require('./models/plays.js')

// const playsController = require('./controllers/plays-controller.js');
// app.use( playsController);
require('dotenv').config();

//Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useUnifiedTopology: true });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{
    console.log('connected to Mongo');
});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON

//use method override
app.use(methodOverride('_method'));


// Routes
//INDEX PAGE
app.get('/jjoseph/plays', (req, res) => {
    // console.log("got this far")
    res.render('index.ejs');
})

//NEW PAGE
app.get('/jjoseph/plays/new', (req, res) => {
    res.render('new.ejs');
})

//CREATE PAGE
app.post('/jjoseph/plays/', (req, res) => {
    Play.create(req.body, (err, createdPlay) => {
        res.send(createdPlay);
    })
})

//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));