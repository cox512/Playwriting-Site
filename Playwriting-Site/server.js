//Dependencies
const express = require('express');
const app = express ();
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;
const Play = require('./models/plays.js')

// const playsController = require('./
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

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON

//use method override
app.use(methodOverride('_method'));


// Routes
//INDEX route
app.get('/plays', (req, res) => {
    // console.log(req.body);
    Play.find({}, (err, foundPlays) => {
        res.render("index.ejs", {
            plays: foundPlays,
        })
    })    
})


//CREATE route
app.post('/plays', (req, res) => {
    Play.create(req.body, (err, createdPlay) => {
        // res.send(createdPlay);
        res.redirect('/plays');
    })
})
 
//NEW Route
app.get('/plays/new', (req, res) => {
    res.render('new.ejs');
})

//Show Route
app.get('/plays/:id', (req, res) => {
       console.log(req.params.id);
    Play.findById(req.params.id, (err, foundPlay) =>{
        res.render('show.ejs', {
            play: foundPlay
        });
    });
});

//DELETE route
app.delete('/plays/:id', (req, res) => {
    console.log("inside delete route")
    Play.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/plays');
    })
})

//EDIT route
app.get('/plays/:id/edit', (req, res) => {
    Play.findById(req.params.id, (err, foundPlay) => {
        res.render('edit.ejs', {
            play: foundPlay
        })
    })
})

//UPDATE route
app.put('/plays/:id', (req, res) => {
   Play.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
       res.redirect('/plays/' + req.params.id);
   })
})
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));