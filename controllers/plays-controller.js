const express = require('express');
const router = express.Router();
const Play = require('../models/plays.js')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/sessions/new');
    }
}

//ROUTES


//NEW Route
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new.ejs', {
    currentUser: req.session.currentUser,
    titleBar: 'New Play',
    });
})

//INDEX route
router.get('/', (req, res) => {
    // console.log(req.body);
    Play.find({}, (err, foundPlays) => {
        res.render("index.ejs", {
            plays: foundPlays,
            currentUser: req.session.currentUser,
            titleBar: "Plays",
        })
    })    
})

//CREATE route
router.post('/', isAuthenticated, (req, res) => {
    console.log('This is the Create route')
    Play.create(req.body, (err, createdPlay) => {
        console.log(err)
        console.log(req.body);
        console.log(createdPlay);


        // res.send(createdPlay);
        res.redirect('/plays');
    })
})

//Show Route
router.get('/:id', (req, res) => {
    Play.findById(req.params.id, (err, foundPlay) =>{
        res.render('show.ejs', {
            play: foundPlay,
            currentUser: req.session.currentUser,
            titleBar: foundPlay.title
        });
    });
});

//DELETE route
router.delete('/:id', isAuthenticated, (req, res) => {
    // console.log("inside delete route")
    Play.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data) => {
        res.redirect('/plays');
    })
})

//EDIT route -- add isAuthenticated back
router.get('/:id/edit', (req, res) => {
    Play.findById(req.params.id, (err, foundPlay) => {
        res.render('edit.ejs', {
            play: foundPlay,
            currentUser: req.session.currentUser,
            titleBar: 'Update Page',
        })
    })
})

//UPDATE route -- add isAuthenticated back
router.put('/:id', (req, res) => {
    
   Play.findByIdAndUpdate(req.params.id, req.body, {new:true, useFindAndModify: false}, (err, updatedModel) => {
       console.log(err);
       console.log(req.body);
       res.redirect('/plays/' + req.params.id);
   })
})

module.exports = router;