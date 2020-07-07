const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    name: {type: String, required: true},
    synopsis: String,
    casting: String,
    development: Array,
    honors: Array,
    img: String
})

const Play = mongoose.model('Play', playSchema);

module.exports = Play;