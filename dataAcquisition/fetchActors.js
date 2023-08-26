const express = require("express");
const mongoose = require("mongoose");
const Films = require("./models/Film.js");
const Actor = require("./models/Actor.js");
const app = express();

const options = { method: "GET", headers: { accept: "application/json" } };
const DB = "Cinomnia"
const code =
  `mongodb+srv://admin:123@cinomnia.e8sbbzh.mongodb.net/${DB}?retryWrites=true&w=majority`;

const apiKey = "api_key=3c83856efcaf8df7bef87e6e10139306";

let filmLists;
let actorsList = [];

async function connectToMongo() {
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
  const person = await Actor.create(actorsList);
  console.log("Posted success");
}

async function getReq() {
  app.get("/", (req, res) => {
    res.send(actorsList);
  });
}

function dropDuplicate(data) {
  const idUnique = [];
  const unique = data.filter((element) => {
    const isDuplicate = idUnique.includes(element);

    if (!isDuplicate) {
      idUnique.push(element);

      return true;
    }
    return false;
  });

  return idUnique;
}

async function fetchApi(url) {
  try {
    let res = await fetch(url, options);

    return res.ok ? res.json() : false;
  } catch (error) {
    console.log(error);
  }
}

async function getDb() {
  const films = await Films.find();

  filmLists = films;
}

async function fetchCrew(id) {
  let info = new Object();

  let data = await fetchApi(
    "https://api.themoviedb.org/3/person/" + id + "/movie_credits?" + apiKey
  );

  if (data) {
    let crewLists = [];

    for (let element of data.cast) {
      const crew = new Object();

      crew.id = element.id;
      crew.job = element.character;
      crew["img_character"] = new Object();

      if (element["backdrop_path"]) {
        crew["img_character"].img_500 =
          "https://image.tmdb.org/t/p/w500/" + element["backdrop_path"];
        crew["img_character"].img_1280 =
          "https://image.tmdb.org/t/p/w1280/" + element["backdrop_path"];
      }
      crewLists.push(crew);
    }

    info["crews"] = crewLists;
  } else return false;
  return info;
}

async function fetchInfoPersonal(id) {
  const checkGender = (val) => {
    if (val == 0) return "Not set / not specified";
    else if (val == 1) return "Female";
    else if (val == 2) return "Male";
    else return "Non-binary";
  };

  let infoPersonal = new Object();

  let data = await fetchApi(
    "https://api.themoviedb.org/3/person/" + id + "?" + apiKey
  );

  if (data) {
    infoPersonal.id = data.id;
    infoPersonal.name = data.name;
    infoPersonal.biography = data.biography;
    infoPersonal.birthday = data.birthday;
    infoPersonal.gender = checkGender(data.gender);
    infoPersonal.img = new Object();
    if (data["profile_path"]) {
      infoPersonal.img.img_500 =
        "https://image.tmdb.org/t/p/w500" + data["profile_path"];
      infoPersonal.img.img_1280 =
        "https://image.tmdb.org/t/p/w1280" + data["profile_path"];
    }
  } else return false;

  return infoPersonal;
}

async function fetchActors(amountActor, amountFilm) {
  for (let i = 0; i < amountFilm && i < filmLists.length; i++) {
    for (let j = 0; j < amountActor && j < filmLists[i].casts.length; j++) {
      let infoPersonal = await fetchInfoPersonal(filmLists[i].casts[j].id);
      let crews = await fetchCrew(filmLists[i].casts[j].id);

      if (crews && infoPersonal) {
        const actor = { ...infoPersonal, ...crews };
        actorsList.push(actor);
      }
    }
  }

  actorsList = dropDuplicate(actorsList);
}

async function main() {
  await connectToMongo();

  await getDb();

  await fetchActors(4, filmLists.length);

  await postToMongo();

  getReq();
}

main();
