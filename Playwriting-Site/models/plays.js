const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    title: { type: String, required: true },
    synopsis: String,
    castingMale: Number,
    castingFemale: Number,
    castingNeutral: Number,
    development: [String],
    honors: [String],
    img: String
})

const Play = mongoose.model('Play', playSchema);

module.exports = Play;