const express = require("express");
const mongoose = require("mongoose");
const Film = require("./models/Film.js");
const app = express();

const options = { method: "GET", headers: { accept: "application/json" } };
const code =
  "mongodb+srv://admin:123@cinomnia.e8sbbzh.mongodb.net/?retryWrites=true&w=majority";

const apiKey = "api_key=3c83856efcaf8df7bef87e6e10139306";

let filmLists = [];

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
  const film = await Film.create(filmLists);
  console.log("Posted success");
}

async function getReq() {
  app.get("/", (req, res) => {
    res.send(filmLists);
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

async function fetchInfo(id) {
  const film = new Object();

  const detail = await fetchApi(
    "https://api.themoviedb.org/3/movie/" + id + "?" + apiKey
  );
  if (detail) {
    film.id = detail.id;
    film.title = detail.title;
    film["release_date"] = detail["release_date"];
    film.rating = 0.0;
    film.ranking = 0.0;
    film.review = [];
    film.poster = "https://image.tmdb.org/t/p/w500/" + detail["poster_path"];

    let genres = [];
    for (let e of detail.genres) {
      const genre = new Object();

      genre.id = e.id;

      genres.push(genre);
    }

    film.genres = genres;
  } else return false;

  return film;
}

async function fetchCast(id) {
  const film = new Object();
  const credits = await fetchApi(
    "https://api.themoviedb.org/3/movie/" + id + "/credits" + "?" + apiKey
  );
  if (credits) {
    let casts = [];

    for (let e of credits.cast) {
      const cast = new Object();

      cast.id = e.id;

      casts.push(cast);
    }

    film.casts = casts;

    let directors = [];

    for (let e of credits.crew) {
      if (e.job === "Director") {
        const director = new Object();

        director.id = e.id;

        directors.push(director);
      }
    }

    film.directors = directors;
  } else return false;
  return film;
}

async function fetchVideo(id) {
  const trailers = [];
  const teasers = []; //teasers
  const behindTheScenes = [];
  const highlights = [];

  const data = await fetchApi(
    "https://api.themoviedb.org/3/movie/" + id + "/videos?" + apiKey
  );
  if (data) {
    let type = {
      Clip: false,
      "Behind the Scenes": false,
      Teaser: false,
      Trailer: false,
    };

    for (let elm of data.results) {
      if (elm.type === "Featurette") continue;

      const body = new Object();

      body.name = elm.name;
      body.link = "https://www.youtube.com/watch?v=" + elm.key;

      if (!type[elm.type]) {
        if (elm.type === "Clip") {
          highlights.push(body);
          type[elm.type] = true;
        } else if (elm.type === "Behind the Scenes") {
          behindTheScenes.push(body);
          type[elm.type] = true;
        } else if (elm.type === "Teaser") {
          teasers.push(body);
          type[elm.type] = true;
        } else if (elm.type === "Trailer") {
          trailers.push(body);
          type[elm.type] = true;
        }
      }
    }
  } else return false;
  const video = {
    trailers: trailers,
    teasers: teasers,
    behindTheScenes: behindTheScenes,
    highlights: highlights,
  };
  return video;
}

async function handle(data) {
  for (let element of data.results) {
    const info = await fetchInfo(element.id);
    const cast = await fetchCast(element.id);
    const videos = await fetchVideo(element.id);

    if (info && cast) {
      const film = { ...info, ...cast };
      film.videos = videos;
      filmLists.push(film);
    }
  }
  filmLists = dropDuplicate(filmLists);
}

function dropDuplicate(data) {
  const ids = [];
  const filmUnique = [];
  const unique = data.filter((element) => {
    const isDuplicate = ids.includes(element.id);

    if (!isDuplicate) {
      filmUnique.push(element);
      ids.push(element.id);

      return true;
    }
    return false;
  });

  return filmUnique;
}

async function fetchFilm(amount) {
  let page = Math.floor(amount / 20);

  for (let i = 1; i <= page; i++) {
    try {
      let data = await fetchApi(
        "https://api.themoviedb.org/3/discover/movie?" +
          `page=${i}` +
          "&" +
          apiKey
      );

      await handle(data);
    } catch (err) {
      console.log(err);
    }
  }
}

async function main() {
  await connectToMongo(code);

  await fetchFilm(150);

  await postToMongo();
}

main();
