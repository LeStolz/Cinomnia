import mongoose from "mongoose";

type SignupProps = {
  email: string;
  password: string;
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
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
  },
  {
    statics: {
      async signup(user: SignupProps) {
        return await this.create(user);
      },
    },
  }
);

export const User = mongoose.model("User", UserSchema);
