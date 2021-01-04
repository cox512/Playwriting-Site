const mongoose = require("mongoose");

const playSchema = new mongoose.Schema({
  title: { type: String, required: true },
  length: { type: String, required: true },
  genre: String,
  synopsis: String,
  castSize: String, // Using String as the castSize datatype for now, so I'm able to add a number range. Will fix once I dig into the mongoose docs some more.
  castingMale: Number,
  castingFemale: Number,
  castingNeutral: Number,
  specialCasting: String,
  //Add validation to 'development' and 'honors' to handle an empty field if all the input boxes have been deleted on the Edit form.
  development: Array,
  honors: Array,
  prodStill: { type: String, default: "" },
  dialogue: String,
  story: String,
});

const Play = mongoose.model("Play", playSchema);

module.exports = Play;
