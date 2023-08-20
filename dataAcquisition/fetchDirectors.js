const express = require("express");
const mongoose = require("mongoose");
const Films = require("./models/Film.js");
const Director = require("./models/Director.js");
const app = express();

const options = { method: "GET", headers: { accept: "application/json" } };
const DB = "Cinomnia"
const code =
  `mongodb+srv://admin:123@cinomnia.e8sbbzh.mongodb.net/${DB}?retryWrites=true&w=majority`;

const apiKey = "api_key=3c83856efcaf8df7bef87e6e10139306";

let filmLists;

let directorsList = [];

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
  const person = await Director.create(directorsList);
  console.log("Posted success");
}

async function getReq() {
  app.get("/", (req, res) => {
    res.send(directorsList);
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

async function fetchDirection(id) {
  let info = new Object();

  let data = await fetchApi(
    "https://api.themoviedb.org/3/person/" + id + "/movie_credits?" + apiKey
  );

  if (data) {
    let crewsLists = [];

    for (let element of data.crew) {
      if (element.department === "Directing") {
        const crews = new Object();

        crews.id = element.id;
        crews.job = element.job;

        crewsLists.push(crews);
      }
    }

    info["crews"] = crewsLists;
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

async function fetchDirectors(amountFilm) {
  for (let i = 0; i < amountFilm && i < filmLists.length; i++) {
    for (let elm of filmLists[i].directors) {
      let infoPersonal = await fetchInfoPersonal(elm.id);

      let directors = await fetchDirection(elm.id);

      if (directors && infoPersonal) {
        const director = { ...infoPersonal, ...directors };
        directorsList.push(director);
      }
    }
  }

  directorsList = dropDuplicate(directorsList);
}

async function main() {
  await connectToMongo();

  await getDb();

  await fetchDirectors(100);

  await postToMongo();
}

main();
