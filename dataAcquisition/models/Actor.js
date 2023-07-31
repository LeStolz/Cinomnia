const mongoose = require("mongoose");

const Film = mongoose.Schema({
  id: Number,
  character: String,
  img_character: String,
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
    img: String,
    crews: [Film],
  },
  {
    timestamp: true,
  }
);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
