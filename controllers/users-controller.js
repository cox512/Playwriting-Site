const express = require('express');
const userRouter = express.Router();

userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs');
})



module.exports = userRouter;