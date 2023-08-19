import mongoose from "mongoose";

const Film = new mongoose.Schema({
    id: Number,
    job: String,
    img_character: {img_500: String, img_1280: String},
  });
  

const DirectorSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: String,
    biography: String,
    birthday: Date,
    gender: String,
    img: {img_500: String, img_1280: String},
    crews: [Film],
  },
  {
    timestamps: true,
  }
);

export const Director = mongoose.model("Director", DirectorSchema);
