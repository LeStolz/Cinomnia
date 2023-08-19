import express from "express";
import { Genre } from "../models/Genre";

const genres = express.Router();

genres.get("/", async (req, res) => {
  try {
    const allGenres = await Genre.find();
    res.json(allGenres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genres." });
  }
});

genres.get("/:id", async (req, res) => {
  const genreId = req.params.id;
  try {
    const genre = await Genre.find({id: genreId});
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).json({ error: "Genre not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genre." });
  }
});

export { genres };
