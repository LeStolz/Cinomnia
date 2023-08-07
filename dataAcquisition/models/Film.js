const mongoose = require("mongoose");

const genre = mongoose.Schema({
  id: Number,
});

const cast = mongoose.Schema({
  id: Number,
  name: String,
});

const director = mongoose.Schema({
  id: Number,
  name: String,
});

const video = mongoose.Schema({
  name: String,
  link: String,
});

const videos = mongoose.Schema({
  trailers: [video],
  teasers: [video],
  behindTheScenes: [video],
  highlights: [video],
  video_full: String
});

const filmSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      require: [true, "Required"],
    },
    title: String,
    release_date: Date,
    rating: Number,
    ranking: Number,
    overview: String,
    review: [],
    poster: {img_500: String, img_1280: String},
    genres: [genre],
    casts: [cast],
    directors: [director],
    videos: videos,
  },
  {
    timestamp: true,
  }
);

const Films = mongoose.model("Films", filmSchema);

module.exports = Films;
