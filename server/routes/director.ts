import express from "express";
import { Director } from "../models/Director";

export const directors = express.Router();

directors.get("/", async (req, res) => {
  try {
    const allDirectors = await Director.find();
    res.json(allDirectors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch directors." });
  }
});

directors.get("/:id", async (req, res) => {
  const directorId = req.params.id;
  try {
    const director = await Director.find({id: directorId});
    if (director) {
      res.json(director);
    } else {
      res.status(404).json({ error: "Director not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch director." });
  }
});
