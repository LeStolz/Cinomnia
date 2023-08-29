import { config } from "dotenv";
config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { User } from "./models/User";
import { users } from "./routes/users";
import { films } from "./routes/film";
import { genres } from "./routes/genre";
import { actors } from "./routes/actor";
import { directors } from "./routes/director";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to MongoDB"));

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

export const authenticate = async (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!(await User.findOne({ email: decoded.email }))) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.__user = decoded;

    next();
  });
};

export const authorize = async (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findOne({ email: decoded.email });

    if (!user || user.type != "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  });
};

app.use("/users", users);
app.use("/films", films);
app.use("/genres", genres);
app.use("/actors", actors);
app.use("/directors", directors);

app.listen(parseInt(process.env.PORT!), () => {
  console.log("listening on port " + parseInt(process.env.PORT!));
});
