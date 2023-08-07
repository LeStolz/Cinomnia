const mongoose = require("mongoose");

const Film = mongoose.Schema({
  id: Number,
  job: String,
  img_character: {img_500: String, img_1280: String},
});

const actorSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      require: [true, "Required"],
    },
    name: String,
    biography: String,
    birthday: Date,
    gender: String,
    img: {img_500: String, img_1280: String},
    crews: [Film],
  },
  {
    timestamp: true,
  }
);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
