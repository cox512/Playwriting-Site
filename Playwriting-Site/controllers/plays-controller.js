const express = require('express');
const router = express.Router();
// const Play = require('../models/plays.js')


//ROUTES

//INDEX PAGE
router.get('/jjoseph/plays', (req, res) => {
    console.log("got this far")
    res.render('./views/index.ejs');
})


module.exports = router;