import express from "express";
import { Film } from "../models/Film";
import { Genre } from "../models/Genre";

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
      $or: [{ title: { $regex: searchKey, $options: "i" } }, { id: searchKey }],
    });
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch films." });
  }
});

films.get("/genre/:id", async (req, res) => {
  const filmId = req.params.id;
  try {
    const film = await Film.find({ id: filmId });
    if (film.length === 0) {
      return res.status(404).json({ error: "Film not found." });
    }

    const filmData = film[0] as {
      id: number;
      title: String;
      genres: { id: number }[];
    };

    const genreIds = filmData.genres.map((genre) => genre.id);
    const relatedFilms = await Film.find({
      genres: { $elemMatch: { id: { $in: genreIds } } },
    });

    res.json(relatedFilms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch related films." });
  }
});

films.post("/:id", async (req, res) => {
  const filmId = req.params.id;
  const newReview = {
    user: req.body.user,
    content: req.body.review,
  };

  try {
    const film = await Film.findOneAndUpdate(
      { id: filmId },
      { $push: { review: newReview } },
      { new: true }
    );

    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Film not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to add review." });
  }
});

films.delete("/:id/reviews/:reviewId", async (req, res) => {
  const filmId = req.params.id;
  const reviewId = req.params.reviewId;

  try {
    const film = await Film.findOneAndUpdate(
      { id: filmId },
      { $pull: { review: { _id: reviewId } } },
      { new: true }
    );

    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Film not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review." });
  }
});

films.put("/:id/reviews/:reviewId", async (req, res) => {
  const filmId = req.params.id;
  const reviewId = req.params.reviewId;
  const updatedContent = req.body.content;

  try {
    const film = await Film.findOneAndUpdate(
      { id: filmId, "review._id": reviewId },
      { $set: { "review.$.content": updatedContent } },
      { new: true }
    );

    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Film or review not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to edit review." });
  }
});

films.put("/:id/update-duration", async (req, res) => {
  const filmId = req.params.id;
  const duration = req.body.duration; 

  try {
    const film = await Film.findOneAndUpdate(
      { id: filmId },
      { $set: { duration: duration } },
      { new: true }
    );

    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Film not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update duration." });
  }
});
