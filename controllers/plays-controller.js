const express = require('express');
const router = express.Router();
const Play = require('../models/plays.js')


//ROUTES

//NEW Route
router.get('/new', (req, res) => {
    res.render('new.ejs', {
    currentUser: req.session.currentUser,
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
router.post('/', (req, res) => {
    Play.create(req.body, (err, createdPlay) => {
        // res.send(createdPlay);
        res.redirect('/plays');
    })
})

//Show Route
router.get('/:id', (req, res) => {
    //    console.log(req.params.id);
    Play.findById(req.params.id, (err, foundPlay) =>{
        res.render('show.ejs', {
            play: foundPlay,
            currentUser: req.session.currentUser
        });
    });
});

//DELETE route
router.delete('/:id', (req, res) => {
    // console.log("inside delete route")
    Play.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data) => {
        res.redirect('/plays');
    })
})

//EDIT route
router.get('/:id/edit', (req, res) => {
    Play.findById(req.params.id, (err, foundPlay) => {
        res.render('edit.ejs', {
            play: foundPlay,
            currentUser: req.session.currentUser

        })
    })
})

//UPDATE route
router.put('/:id', (req, res) => {
   Play.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
       res.redirect('/plays/' + req.params.id);
   })
})



module.exports = router;