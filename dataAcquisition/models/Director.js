const mongoose = require("mongoose");

const Film = mongoose.Schema({
  id: Number,
  job: String,
});

const directorSchema = mongoose.Schema(
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

const Director = mongoose.model("Director", directorSchema);

module.exports = Director;
