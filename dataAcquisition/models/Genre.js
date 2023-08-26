const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      require: [true, "Required"],
    },
    name: String
  },
  {
    timestamp: true,
  }
);

const Genres = mongoose.model("Genres", genreSchema);

module.exports = Genres;
