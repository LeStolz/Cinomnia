import mongoose from "mongoose";

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
    ownedShows: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Show",
      default: [],
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
  {
    statics: {},
  }
);

export const User = mongoose.model("User", UserSchema);
