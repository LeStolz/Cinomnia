import { config } from "dotenv";
config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { users } from "./routes/users";
import { films } from "./routes/film";
import { genres } from "./routes/genre";
import { actors } from "./routes/actor";
import { directors } from "./routes/director";
import { payments } from "./routes/payment";

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to MongoDB"));

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/users", users);
app.use("/films", films);
app.use("/genres", genres);
app.use("/actors", actors);
app.use("/directors", directors);
app.use("/payment", payments);

app.listen(parseInt(process.env.PORT!), () => {
  console.log("listening on port " + parseInt(process.env.PORT!));
});
