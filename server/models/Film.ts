import mongoose from "mongoose";

const genre = new mongoose.Schema({
  id: Number,
});

const cast = new mongoose.Schema({
  id: Number,
  name: String,
});

const director = new mongoose.Schema({
  id: Number,
  name: String,
});

const video = new mongoose.Schema({
  name: String,
  link: String,
});

const videos = new mongoose.Schema({
  trailers: [video],
  video_full: String,
});

const review = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const FilmSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: [true, "Required"],
    },
    title: String,
    release_date: Date,
    rating: Number,
    ranking: Number,
    review: [review],
    poster: { img_500: String, img_1280: String },
    genres: [genre],
    casts: [cast],
    directors: [director],
    videos: videos,
    price: Number,
    durations: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      required: true,
      default: "default",
    },
  },
  {
    timestamps: true,
  }
);

export const Film = mongoose.model("Film", FilmSchema);
