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
//SEED route
router.get('/seed', (req, res) => {
    Play.create([
        {
            title: "Koalas",
            length: "fullLength",
            genre: "tragi-comedy",
            synopsis: "The only thing more territorial than the escaped koala living in Ray Slinger’s backyard is Ray himself. His sense of protectionism goes into overdrive when Natalie (Nate), his gender-nonconforming daughter, pops in for a stay and, John, his unemployed brother, shows up with a suitcase full of woe. When John discovers that Ray is about to lose his visitation rights, he teams up with Ray’s neighbor, Gabby, and goes about trying to convince Natalie that Ray is worthy of her time. Their plan backfires when the duo stumbles onto something that hits Ray a little too close to his heart. Can this twentieth-century man survive the dawning of the twenty-first? Koalas is a full-length tragi-comic play that explores the changing definition of what it means to be a man. It has a unit set and a cast of 5-6 including one Andrew Lloyd Webber-loving koala.",
            castSize: 5,
            castingMale: 3,
            castingFemale: 1,
            castingNeutral: 1,
            specialCasting: 'Requires a child actor, any gender, capable of play a 10 year-old',
            development: ['Seven Devils Playwrights Foundry', 'Portland Stage Company', 'Palm Beach Dramaworkshop'],
            honors: ['Princess Grace Fellowship - Finalist', 'Playwrights First Award - Top Five Plays'],
            img:'/images/Ray_Consoles_Nate.jpeg',
            dialogue: "This is some sample dialogue to use in the design process.",
            story: "This is the story of a man and a Koala."
        }
    ])
})

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