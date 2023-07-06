import express from "express";
import { User } from "../models/User";

export const users = express.Router();

users.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.signup({ email, password });
  } catch (err) {
    return res.status(400).send(err);
  }
});
