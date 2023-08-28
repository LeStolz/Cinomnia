import express from "express";
import { Genre } from "../models/Genre";
import { Film } from "../models/Film";
const genres = express.Router();

genres.get("/", async (req: any, res) => {
  try {
    const allGenres = req.query?.search
      ? await Genre.find({
          name: { $regex: req.query.search, $options: "i" },
        })
      : await Genre.find();

    res.json(allGenres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genres." });
  }
});

genres.get("/:id", async (req, res) => {
  const genreId = req.params.id;

  try {
    const genre = await Genre.find({ id: genreId });

    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ error: "Genre not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genre." });
  }
});

genres.put("/:id", async (req, res) => {
  const genreId = req.params.id;
  const genreName = req.body.genreName;

  try {
    if (await Genre.findOne({ name: genreName })) {
      return res.status(400).json({ error: `${genreName} already exists.` });
    } else {
      await Genre.updateOne({ id: genreId }, { $set: { name: genreName } });
      return res.status(200).send();
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to edit genre." });
  }
});

genres.post("/", async (req, res) => {
  const { genreName } = req.body;

  try {
    const genre = await Genre.findOne({ name: genreName });

    if (genre) {
      return res.status(400).json({ error: `${genreName} already exists.` });
    } else {
      await Genre.create({
        id: new Date().valueOf(),
        name: genreName,
      });

      return res.status(200).send();
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to add genre." });
  }
});

genres.delete("/:id", async (req, res) => {
  try {
    const filmsWithGenre = await Film.find({ "genres.id": req.params.id });

    if (filmsWithGenre.length !== 0) {
      return res.status(400).json({
        error: "Please delete all films associated with this genre first.",
      });
    }

    await Genre.deleteOne({ id: req.params.id });
    return res.status(200).send("Deleted genre.");
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export { genres };
