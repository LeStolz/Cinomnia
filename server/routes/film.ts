import express from "express";
import { Film } from "../models/Film";
import { Genre } from "../models/Genre";
import { Actor } from "../models/Actor";
import { authenticate, authorize } from "..";

export const films = express.Router();

films.get(
  "/",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
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
  }
);

films.post("/up-film", async (req, res) => {
  const { title } = req.body;

  try {
    const film = await Film.findOne({ title });

    if (film) {
      return res.status(400).json({ error: `${title} already exists.` });
    } else {
      await Film.create({
        id: new Date().valueOf(),
        title,
      });

      return res.status(200).send();
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to add film." });
  }
});

films.delete(
  "/dl-film/:title",
  async (req, res, next) => authorize(req, res, next),
  async (req, res) => {
    try {
      await Film.deleteOne({ title: req.params.title });
      return res.status(200).send("Deleted film.");
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
);

films.get(
  "/:id",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
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
  }
);

films.get(
  "/search/:keyword",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
    const keyword = req.params.keyword;

    try {
      const matchingActors = await Actor.find({
        name: { $regex: keyword, $options: "i" },
      });
      const matchingActorIds = matchingActors.map((actor) => actor._id);
      const films = await Film.find({
        $or: [
          { "directors.name": { $regex: keyword, $options: "i" } },
          { casts: { $in: matchingActorIds } },
        ],
      });

      res.json(films);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch films." });
    }
  }
);

films.get(
  "/genre/:id",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
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
  }
);

films.put(
  "/update-film/:id",
  async (req, res, next) => authorize(req, res, next),
  async (req, res) => {
    const filmId = req.params.id;

    console.log(
      req.body.directors?.map((x: any) => ({
        id: x.id,
      }))
    );

    try {
      await Film.updateOne(
        { id: filmId },
        {
          $set: {
            title: req.body.title,
            release_date: req.body.date,
            rating: req.body.rating,
            price: req.body.price,
            overview: req.body.overview,
            "poster.img_1280": req.body.poster,
            genres: req.body.genres?.map((x: any) => ({
              id: x.id,
            })),
            casts: req.body.casts?.map((x: any) => ({
              id: typeof x.id === "number" ? x.id : Number(x.id),
            })),
            directors: req.body.directors?.map((x: any) => ({
              id: typeof x.id === "number" ? x.id : Number(x.id),
            })),
            "videos.trailers": [
              {
                name: req.body.trailer,
                link: req.body.trailer,
              },
            ],
            "videos.video_full": req.body.video,
          },
        }
      );
    } catch (err) {
      res.status(500).json({ error: "Failed to update film." });
    }
  }
);

films.post(
  "/:id",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
    const filmId = req.params.id;
    const newReview = {
      film: req.body.film,
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
  }
);

films.delete(
  "/:id/reviews/:reviewId",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
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
  }
);

films.put(
  "/:id/reviews/:reviewId",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
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
  }
);

films.put(
  "/:id/update-duration",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
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
  }
);
films.get(
  "/ratings",
  async (req, res, next) => authenticate(req, res, next),
  async (req, res) => {
    try {
      const films = await Film.find({}, { _id: 0, rating: 1 });
      console.log(films);
      const ratings = films.map((film) => film.rating);
      res.json(ratings);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch ratings." });
    }
  }
);
