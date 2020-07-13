const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});
//Check File Type
const checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only');
    }
}
const path = require('path');
const helpers = require('../helpers')
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
            genre: "Tragi-Comedy",
            synopsis: "The only thing more territorial than the escaped koala living in Ray Slinger’s backyard is Ray himself. His sense of protectionism goes into overdrive when Natalie (Nate), his gender-nonconforming daughter, pops in for a stay and, John, his unemployed brother, shows up with a suitcase full of woe. When John discovers that Ray is about to lose his visitation rights, he teams up with Ray’s neighbor, Gabby, and goes about trying to convince Natalie that Ray is worthy of her time. Their plan backfires when the duo stumbles onto something that hits Ray a little too close to his heart. Can this twentieth-century man survive the dawning of the twenty-first? Koalas is a full-length tragi-comic play that explores the changing definition of what it means to be a man. It has a unit set and a cast of 5-6 including one Andrew Lloyd Webber-loving koala.",
            castSize: 5,
            castingMale: 3,
            castingFemale: 1,
            castingNeutral: 1,
            specialCasting: 'Requires a child actor, any gender, capable of playing a 10 year-old',
            development: ['16th Street Theater - World Premiere', 'Palm Beach Dramaworks - Workshop', 'The Blank Theatre - Workshop', 'Chicago Dramatists - Reading', 'Seven Devils Playwrights Foundry - Workshop', 'Portland Stage Company - Workshop', 'Something Marvelous - Workshop'],
            honors: ["O'Neill National Playwrights Conference - Finalist",'Princess Grace Playwriting Fellowship - Finalist', 'Playwrights First Award - Top Five Plays'],
            prodStill:'/images/Ray_Consoles_Nate.jpeg',
        },
        {
            title: "St. Paulie's Delight",
            length: "fullLength",
            genre: "Comedy",
            synopsis: "Months after the U.S. Supreme Court legalizes same-sex marriage Paul Blinker, event planner extraordinaire, turns into a full-fledged groomzilla. When he receives word that his unknown “shut-in” of an aunt has passed away, he holds a formal memorial service for her. After all, what better opportunity to test out his reception’s color palette? A day-of shift in plans for his aunt’s service coincides with a change in plans for Paul’s own life as input from his friends and fiancé suddenly leaves him with no control over either situation. His well-honed vision for his future in shambles, Paul must confront the possibility of burying his definition of family along with his mysterious aunt.",
            castSize: 6,
            castingMale: 5,
            castingFemale: 1,
            castingNeutral: '',
            specialCasting: '',
            development: ['Playhouse On The Square - Streaming Production', 'Great Plains Theatre Conference', 'Chicago Dramatists - Reading'],
            honors: ['Dayton Playhouse FutureFest - Finalist', 'Austin Film Festival New Play Competition - Top Ten', "O'Neill National Playwrights Conference - Semi-Finalist"],
            prodStill:'',
        },
        {
            title: "Prime Real Estate",
            length: "oneAct",
            genre: "Comedy",
            synopsis: "Married couple, Arthur and Helen, go to the cemetery to put flowers on the graves of her loved ones. When Arthur discovers Helen has already purchased a plot and gravestone for herself next to her late first husband, his insecurities go into overdrive.",
            castSize: 2,
            castingMale: 1,
            castingFemale: 1,
            castingNeutral: '',
            specialCasting: 'Both actors need to be over the age of 60',
            development: ['Whiskey Radio Hour - Radio Production', 'The Greenhouse Ensemble - Production', 'Acorn Theater - Production', 'Seoul Players - Production', 'The Artistic Home - Production'],
            honors: ['Seoul Players Short Play Competition - 1st Place'],
            prodStill:'/images/Program A 046.jpg',
        }
    ])
})

//NEW Route -- ADD isAuthenticated
router.get('/new', (req, res) => {
    // console.log('in New route');
    res.render('new.ejs', {
    currentUser: req.session.currentUser,
    titleBar: 'New Play',
    });
})

// INDEX ROUTE
router.get('/', (req, res) => {
    
    Play.find({}, (err, foundPlays) => {
        res.render("index.ejs", {
            plays: foundPlays,
            currentUser: req.session.currentUser,
            titleBar: "Plays",
        })
    })    
})

//CREATE route
router.post('/', upload.single('prodStill'), isAuthenticated, (req, res) => {
    // console.log(req.file);
    req.body.prodStill = `/images/${req.file.filename}`;
    // console.log(req.body);
    Play.create(req.body, (err, createdPlay) => {
        // console.log(createdPlay);
        res.redirect('/plays');
    })
})

//Show Route
router.get('/:id', (req, res) => {
    
    Play.findById(req.params.id, (err, foundPlay) =>{
        // console.log(foundPlay);
        res.render('show.ejs', {
            play: foundPlay,
            currentUser: req.session.currentUser,
            titleBar: foundPlay.title,
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

//EDIT route 
router.get('/:id/edit', isAuthenticated, (req, res) => {
    Play.findById(req.params.id, (err, foundPlay) => {
        res.render('edit.ejs', {
            play: foundPlay,
            currentUser: req.session.currentUser,
            titleBar: 'Update Page',
        })
    })
})

//UPDATE route
router.put('/:id', upload.single('prodStill'), isAuthenticated, (req, res) => {
    req.body.prodStill = `/images/${req.file.filename}`;
   Play.findByIdAndUpdate(req.params.id, req.body, {new:true, useFindAndModify: false}, (err, updatedModel) => {
    //    console.log(err);
    //    console.log(req.body);
       res.redirect('/plays/' + req.params.id);
   })
})

module.exports = router;