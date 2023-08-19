import express from "express";
import { Actor } from "../models/Actor";

export const actors = express.Router();

actors.get("/", async (req, res) => {
  try {
    const allActors = await Actor.find();
    res.json(allActors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch actors." });
  }
});

actors.get("/:id", async (req, res) => {
  const actorId = req.params.id;
  try {
    const actor = await Actor.find({id: actorId});
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ error: "Actor not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch actor." });
  }
});
