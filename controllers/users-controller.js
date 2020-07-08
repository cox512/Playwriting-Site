const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/users.js');

userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser,
    });
})

userRouter.post('/', (req, res) => {
    //Salt password to anonymize
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(9));
    User.create(req.body, (err, createdUser) => {
        console.log('new user:', createdUser);
        res.redirect('/plays');
    })
})

module.exports = userRouter;