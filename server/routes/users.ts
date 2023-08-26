import express from "express";
import { User } from "../models/User";

export const users = express.Router();

users.post("/signin", async (req, res) => {
  const { email } = req.body;

  if ((await User.findOne({ email })) == null) {
    try {
      await User.create({ email });
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  return res.status(200).send();
});

users.get("/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });

  if (user == null) {
    return res.status(400).send("User not found");
  } else {
    return res.status(200).json(user);
  }
});
