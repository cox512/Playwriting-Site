const express = require('express');
const User = require('../models/users');
const sessionsRouter = express.Router();
const bcrypt = require('bcrypt');

sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser,
    titleBar: 'Log-In'
    });
})

sessionsRouter.post('/', (req, res) => {
    //Check to see if the user exists
    User.findOne( { username: req.body.username }, (err, foundUser) => {
        //Check for an error in the query
        if (err) {
            console.log(err);
            res.send('Something bad happened in the database');
        } else if (!foundUser) {
            //if user isn'found in db. Re-direct and message.
            res.send("<a href='/plays/'>Sorry, user not found.</a>")
        } else {
            //User exists and the passwords can be compared
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                //If passwords match
                req.session.currentUser =foundUser;
                res.redirect('/plays');
            } else {
                //Let them know if the password is incorrect
                res.send('<a href="/plays">Incorrect password.</a>')
            }
        }
    })
})

//DELETE route for logging out
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/plays');
    })
})

module.exports = sessionsRouter