import { config } from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { users } from "./routes/users";
import { films } from "./routes/film"; 
import { genres } from "./routes/genre";
import { actors } from "./routes/actor";
import { directors } from "./routes/director";

config();

mongoose.connect(process.env.DATABASE_URL!);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/users", users);
app.use("/films", films); 
app.use("/genres", genres);
app.use("/actors", actors);
app.use("/directors", directors);


app.listen(parseInt(process.env.PORT!), () => {
  console.log("listening on port " + parseInt(process.env.PORT!));
});

app.get("/", (req, res) => {
  res.send("hello");
});


