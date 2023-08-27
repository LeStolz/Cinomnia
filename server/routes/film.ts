import express from "express";
import { Film } from "../models/Film";

export const films = express.Router();

films.get("/", async (req, res) => {
  const searchKey = req.query.search;

  try {
    const films = searchKey
      ? await Film.find({
          $or: [
            { title: { $regex: searchKey, $options: "i" } },
            {
              id: Number.isNaN(Number(searchKey))
                ? undefined
                : Number(searchKey),
            },
          ],
        })
      : await Film.find();

    res.status(200).json(films);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch films." });
  }
});

films.get("/:id", async (req, res) => {
  const filmId = req.params.id;
  try {
    const film = await Film.find({ id: filmId });
    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Film not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch film with id" });
  }
});
