const mongoose = require("mongoose");

const playSchema = new mongoose.Schema({
  title: { type: String, required: true },
  length: String,
  genre: String,
  synopsis: String,
  castSize: { type: "Number" }, // CAN THIS JUST BE ... Number?
  castingMale: { type: "Number" },
  castingFemale: { type: "Number" },
  castingNeutral: { type: "Number" },
  specialCasting: String,
  development: { type: [String] }, // WHY ARE YOU WRITING IT LIKE THIS? SEE HONORS.
  honors: Array,
  prodStill: { type: String, default: "" },
  dialogue: String,
  story: String,
});

const Play = mongoose.model("Play", playSchema);

module.exports = Play;
