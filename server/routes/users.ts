import express from "express";
import { User } from "../models/User";

export const users = express.Router();

users.post("/signin", async (req, res) => {
  const { email } = req.body;

  if ((await User.findOne({ email })) == null) {
    try {
      await User.create({ email });
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  return res.status(200).send();
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

// users.put("/:id", async (req, res) => {
//   const userId = req.params.id;
//   const userEmail = req.body.userEmail;

//   try {
//     if (await User.findOne({ email: userEmail })) {
//       return res.status(400).json({ error: `${userEmail} already exists.` });
//     } else {
//       await User.updateOne({ id: userId }, { $set: { email: userEmail } });
//       return res.status(200).send();
//     }
//   } catch (err) {
//     return res.status(500).json({ error: "Failed to edit user." });
//   }
// });

// users.post("/", async (req, res) => {
//   const { userEmail } = req.body;

//   try {
//     const user = await User.findOne({ email: userEmail });

//     if (user) {
//       return res.status(400).json({ error: `${userEmail} already exists.` });
//     } else {
//       await User.create({
//         id: new Date().valueOf(),
//         email: userEmail,
//       });

//       return res.status(200).send();
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add user." });
//   }
// });

users.delete("/:email", async (req, res) => {
  try {
    await User.deleteOne({ email: req.params.email });
    return res.status(200).send("Deleted user.");
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});
