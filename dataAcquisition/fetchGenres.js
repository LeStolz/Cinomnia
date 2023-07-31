const express = require("express");
const mongoose = require("mongoose");
const Genres = require("./models/Genre.js");
const app = express();

const options = { method: "GET", headers: { accept: "application/json" } };
const code =
  "mongodb+srv://admin:123@cinomnia.e8sbbzh.mongodb.net/?retryWrites=true&w=majority";

const apiKey = "api_key=3c83856efcaf8df7bef87e6e10139306";

let genreList = [];

async function connectToMongo(code) {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(code);

    app.listen(3001, () => {});
    console.log("connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
}

async function postToMongo() {
  const genre = await Genres.create(genreList);
  console.log("Posted success");
}

async function getReq() {
  app.get("/", (req, res) => {
    console.log(genreList.length);
    res.send(genreList);
  });
}

async function fetchApi(url) {
  try {
    let res = await fetch(url, options);
    return res.ok ? res.json() : false;
  } catch (error) {
    console.log(error);
  }
}

async function fetchGenre() {
  const data = await fetchApi(
    "https://api.themoviedb.org/3/genre/movie/list?" + apiKey
  );

  if (data) {
    for (let elm of data.genres) {
      const genre = new Object();
      genre.id = elm.id;
      genre.name = elm.name;
      genreList.push(genre);
    }
  }
}

async function main() {
  await fetchGenre();

  await connectToMongo(code);

  await postToMongo();
}

main();
