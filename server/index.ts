import { config } from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { users } from "./routes/users";

config();

mongoose.connect(process.env.DATABASE_URL!);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/users", users);

app.listen(parseInt(process.env.PORT!), () => {
  console.log("listening on port " + parseInt(process.env.PORT!));
});
