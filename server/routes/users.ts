import express from "express";
import { User } from "../models/User";

export const users = express.Router();

users.get("/", async (req: any, res) => {
  try {
    const allUsers = req.query?.search
      ? await User.find({
          email: { $regex: req.query.search, $options: "i" },
        })
      : await User.find();

    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

users.post("/signin", async (req, res) => {
  const { email } = req.body;

  if ((await User.findOne({ email })) == null) {
    try {
      await User.create({ email });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  return res.status(200).send();
});

users.put("/add-bought", async (req, res) => {
  const { email, filmId, status, currentDuration } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const filmExists = user.bought.some(
      (item) => item.film.toString() === filmId
    );
    if (!filmExists) {
      user.bought.push({ film: filmId, status, currentDuration });
      await user.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error buying film:", error);
    return res.status(500).send("Internal server error");
  }
});

users.put("/remove-bought", async (req, res) => {
  const { email, filmId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const filmExists = user.bought.some(
      (item) => item.film.toString() === filmId
    );

    if (!filmExists) {
      user.bought.pull({ film: filmId._id });
      await user.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

users.put("/add-wishlish", async (req, res) => {
  const { email, filmId, status, currentDuration } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    user.wishlist.push({ film: filmId, status, currentDuration });
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error buying film:", error);
    return res.status(500).send("Internal server error");
  }
});
users.put("/remove-wishlist", async (req, res) => {
  const { email, filmId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const index = user.wishlist.findIndex(
      (item) => item.film.toString() === filmId
    );
    if (index === -1) {
      return res.status(400).send("Film not found in wishlist");
    }
    user.wishlist.splice(index, 1);
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error removing film from wishlist:", error);
    return res.status(500).send("Internal server error");
  }
});

users.get("/wishlist/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email }).populate({
      path: "wishlist.film",
      populate: { path: "genres" },
    });
    if (!user) {
      return res.status(400).send("User not found");
    }
    return res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return res.status(500).send("Internal server error");
  }
});

users.get("/bought/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email }).populate({
      path: "bought.film",
      populate: { path: "genres" },
    });
    if (!user) {
      return res.status(400).send("User not found");
    }
    return res.status(200).json(user.bought);
  } catch (error) {
    console.error("Error getting bought:", error);
    return res.status(500).send("Internal server error");
  }
});

users.put("/update-status", async (req, res) => {
  const { email, filmId, newStatus, duration } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const filmIndex = user.bought.findIndex(
      (item) => item.film.toString() === filmId
    );
    if (filmIndex !== -1) {
      if (user.bought[filmIndex].status !== newStatus) {
        user.bought[filmIndex].status = newStatus;
        await user.save();
      } else {
        return res.status(400).send("Film already has the same status");
      }
    } else {
      return res.status(400).send("Film not found in bought");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating film status:", error);
    return res.status(500).send("Internal server error");
  }
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

users.put("/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    await User.updateOne({ email: userEmail }, { $set: req.body });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).json({ error: "Failed to edit user." });
  }
});

users.post("/", async (req, res) => {
  const { userEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (user) {
      return res.status(400).json({ error: `${userEmail} already exists.` });
    } else {
      await User.create({
        email: userEmail,
      });

      return res.status(200).send();
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to add user." });
  }
});

users.delete("/:email", async (req, res) => {
  try {
    await User.deleteOne({ email: req.params.email });
    return res.status(200).send("Deleted user.");
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});
