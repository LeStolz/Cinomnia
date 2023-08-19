import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: String
  },
  {
    timestamps: true,
  }
);

export const Genre = mongoose.model("Genre", GenreSchema);
