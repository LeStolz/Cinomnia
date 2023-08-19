import mongoose from "mongoose";

const Film = new mongoose.Schema({
    id: Number,
    job: String,
    img_character: {img_500: String, img_1280: String},
  });
  

const ActorSchema = new mongoose.Schema(
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

export const Actor = mongoose.model("Actor", ActorSchema);
