import mongoose from "mongoose";

const FilmSchema = new mongoose.Schema({
  film: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Film",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const MovieSchema = new mongoose.Schema({
  film: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Film",
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      default: "client",
    },
    balance: {
      type: Number,
      min: 0,
      default: 0,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    wishlist: [FilmSchema],
    bought: [FilmSchema],
    history: [MovieSchema],
  },
  {
    statics: {},
  }
);

export const User = mongoose.model("User", UserSchema);
