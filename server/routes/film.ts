import express from "express";
import { Film } from "../models/Film";

export const films = express.Router();

films.get("/", async (req, res) => {
  try {
    const allFilms = await Film.find();
    res.json(allFilms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch films." });
  }
});

films.get("/:id", async (req, res) => {
  const filmId = req.params.id;
  try {
    const film = await Film.find({ id: filmId });
    // console.log(film);
    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Film not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch film with id" });
  }
});

films.get("/:searchKey", async (req, res) => {
  const searchKey = req.params.searchKey;
  try {
    const films = await Film.find({
      $or: [
        { title: { $regex: searchKey, $options: "i" } },
        { id: searchKey }, 
      ],
    });
    console.log(films);
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch films." });
  }
});

