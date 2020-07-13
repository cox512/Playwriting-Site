const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    title: { type: String, required: true },
    length: String,
    genre: String,
    synopsis: String,
    castSize: { type: 'Number'},
    castingMale: { type: 'Number'},
    castingFemale: { type: 'Number'},
    castingNeutral: { type: 'Number'},
    specialCasting: String,
    development: {type: [String]},
    honors: Array,
    img: {type: String, default:''},
    dialogue: String,
    story: String,
})

const Play = mongoose.model('Play', playSchema);

module.exports = Play;