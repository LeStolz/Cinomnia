const express = require("express");
const mongoose = require("mongoose");
const Film = require("./models/Film.js");
const app = express();

const options = { method: "GET", headers: { accept: "application/json" } };
const DB = "Cinomnia"
const code =
  `mongodb+srv://admin:123@cinomnia.e8sbbzh.mongodb.net/${DB}?retryWrites=true&w=majority`;

const apiKey = "api_key=3c83856efcaf8df7bef87e6e10139306";

let filmLists = [];

let filmsInfo = [
  { title: "A Bucket of Blood", year: 1959, video_full: "https://www.youtube.com/watch?v=xzT7SRyW264" },
  { title: "A Farewell to Arms", year: 1932, video_full: "https://www.youtube.com/watch?v=URovu3dZtsk" },
  { title: "A Lady to Love", year: 1930, video_full: "https://www.youtube.com/watch?v=ffAXo84IhmQ" },
  { title: "Abraham Lincoln", year: 1930, video_full: "https://www.youtube.com/watch?v=d0BjEZUbwmo&t=903s" },
  { title: "Africa Screams", year: 1949, video_full: "https://www.youtube.com/watch?v=5myY1ILoN8E" },
  { title: "Aladdin and His Wonderful Lamp", year: 1939, video_full: "https://www.youtube.com/watch?v=AlnZq_D_tAg" },
  { title: "Angel and the Badman", year: 1947, video_full: "https://www.youtube.com/watch?v=EMqvUjAthqc" },
  { title: "At War with the Army", year: 1950, video_full: "https://www.youtube.com/watch?v=3ZLw4H-cRg4" },
  { title: "Beau Ideal", year: 1931, video_full: "https://www.youtube.com/watch?v=TEuo4JVM5PI" },
  { title: "Becky Sharp", year: 1935, video_full: "https://www.youtube.com/watch?v=B0rY25U-zMU" },
  { title: "Behind Office Doors", year: 1931, video_full: "https://www.youtube.com/watch?v=-HlO--dEfpI" },
  { title: "Bird of Paradise", year: 1932, video_full: "https://www.youtube.com/watch?v=aN5qrz28etw" },
  { title: "Blue Steel", year: 1934, video_full: "https://www.youtube.com/watch?v=y-5ZHTzd1hQ" },
  { title: "Captain Kidd", year: 1945, video_full: "https://www.youtube.com/watch?v=6Q5j56oDL8s" },
  { title: "Carnival of Souls", year: 1962, video_full: "https://www.youtube.com/watch?v=vNYg4YWkp0k" },
  { title: "Charade", year: 1963, video_full: "https://www.youtube.com/watch?v=-uc86VH8hdA" },
  { title: "Check and Double Check", year: 1930, video_full: "https://www.youtube.com/watch?v=CoidcEyyDYM" },
  { title: "Conspiracy", year: 1930, video_full: "https://www.youtube.com/watch?v=i5b9KrFisKM" },
  { title: "Cyrano de Bergerac", year: 1950, video_full: "https://www.youtube.com/watch?v=0J0RFoHGFtY" },
  { title: "Danger Lights", year: 1930, video_full: "https://www.youtube.com/watch?v=qascLQdI5-I" },
  { title: "Dementia 13", year: 1963, video_full: "https://www.youtube.com/watch?v=0Pp1WYmeXbw" },
  { title: "Detour", year: 1945, video_full: "https://www.youtube.com/watch?v=tap67KjjPu8" },
  { title: "Fear and Desire", year: 1953, video_full: "https://www.youtube.com/watch?v=bjJzQvjhndw" },
  { title: "Glen or Glenda", year: 1953, video_full: "https://www.youtube.com/results?search_query=Glen+or+Glenda" },
  { title: "Go for Broke", year: 1951, video_full: "https://www.youtube.com/watch?v=qRqwLrZKDw0" },
  { title: "God's Little Acre", year: 1958, video_full: "https://www.youtube.com/watch?v=rerSnFYllqM" },
  { title: "Gulliver's Travels", year: 1939, video_full: "https://www.youtube.com/watch?v=rehNT9wIjUg" },
  { title: "House on Haunted Hill", year: 1959, video_full: "https://www.youtube.com/watch?v=cxtswm5yVN4" },
  { title: "Indestructible Man", year: 1956, video_full: "https://www.youtube.com/watch?v=bkTgEQ1JM08" },
  { title: "Jack and the Beanstalk", year: 1952, video_full: "https://www.youtube.com/watch?v=nbsZWsUU5sE" },
  { title: "Lawful Larceny", year: 1930, video_full: "https://www.youtube.com/watch?v=BCyqViMfJXs" },
  { title: "Leathernecking", year: 1930, video_full: "https://www.youtube.com/watch?v=Qs4L8T2XCCI" },
  { title: "Letter of Introduction", year: 1938, video_full: "https://www.youtube.com/watch?v=qtqwv2ol_44" },
  { title: "Lonely Wives", year: 1931, video_full: "https://www.youtube.com/watch?v=gRNW6gs1f-U" },
  { title: "Malice in the Palace", year: 1949, video_full: "https://www.youtube.com/watch?v=Rv7b9-ustaU" },
  { title: "Manos: The Hands of Fate", year: 1966, video_full: "https://www.youtube.com/watch?v=D3LBZLA0V3k" },
  { title: "My Man Godfrey", year: 1936, video_full: "https://www.youtube.com/watch?v=fiSjeLhg25w" },
  { title: "Night of the Living Dead", year: 1968, video_full: "https://www.youtube.com/watch?v=H91BxkBXttE" },
  { title: "Plan 9 from Outer Space", year: 1959, video_full: "https://www.youtube.com/watch?v=qsb74pW7goU" },
  { title: "Santa Claus Conquers the Martians", year: 1964, video_full: "https://www.youtube.com/watch?v=L4SZyeUGSM4" },
  { title: "Santa Fe Trail", year: 1940, video_full: "https://www.youtube.com/watch?v=9F-Y_yEy-eE" },
  { title: "Sin Takes a Holiday", year: 1930, video_full: "https://www.youtube.com/watch?v=diYTwVa3fGc" },
  { title: "Sing a Song of Six Pants", year: 1947, video_full: "https://www.youtube.com/watch?v=z1WfCjqqhzM&pp=ygUfc2luZyBhIHNvbmcgb2Ygc2l4cGVuY2UgKDE5NDcpIA%3D%3D" },
  { title: "Teenagers from Outer Space", year: 1959, video_full: "https://www.youtube.com/watch?v=8M_epWZz7lM&pp=ygUaVGVlbmFnZXJzIGZyb20gT3V0ZXIgU3BhY2U%3D" },
  { title: "The Animal Kingdom", year: 1932, video_full: "https://www.youtube.com/watch?v=XinHZFlxQjo&pp=ygUXVGhlIEFuaW1hbCBLaW5nZG9tIDE5MzI%3D" },
  { title: "The Big Wheel", year: 1949, video_full: "https://www.youtube.com/watch?v=wUOsqViP0To&pp=ygUNVGhlIEJpZyBXaGVlbA%3D%3D" },
  { title: "The Brain That Wouldn't Die", year: 1962, video_full: "https://www.youtube.com/watch?v=ekvQGuZgV1s&pp=ygUbVGhlIEJyYWluIFRoYXQgV291bGRuJ3QgRGll" },
  { title: "The Dance of Life", year: 1929, video_full: "https://www.youtube.com/watch?v=aHsuP8UmJlo&pp=ygURVGhlIERhbmNlIG9mIExpZmU%3D" },
  { title: "The Devil Bat", year: 1940, video_full: "https://www.youtube.com/watch?v=CVzHNeafl5Y&pp=ygUNVGhlIERldmlsIEJhdA%3D%3D" },
  { title: "The Emperor Jones", year: 1933, video_full: "https://www.youtube.com/watch?v=TJEhMLLEd-A&pp=ygURVGhlIEVtcGVyb3IgSm9uZXM%3D" },
  { title: "The Front Page", year: 1931, video_full: "https://www.youtube.com/watch?v=SS2Kezl0EZ4&pp=ygUOVGhlIEZyb250IFBhZ2U%3D" },
  { title: "The Gorilla", year: 1939, video_full: "https://www.youtube.com/watch?v=IP1xlXj76Mw&pp=ygUQVGhlIEdvcmlsbGEgMTkzOQ%3D%3D" },
  { title: "The Great Flamarion", year: 1945, video_full: "https://www.youtube.com/watch?v=g6pGxgbJa7o&pp=ygUTVGhlIEdyZWF0IEZsYW1hcmlvbg%3D%3D" },
  { title: "The Hitch-Hiker", year: 1953, video_full: "https://www.youtube.com/watch?v=PuV2tVlRDd0&pp=ygUUdGhlIGhpdGNoLWhpa2VyIDE5NTM%3D" },
  { title: "The Inspector General", year: 1949, video_full: "https://www.youtube.com/watch?v=TjON5Bq5rPk&pp=ygUVVGhlIEluc3BlY3RvciBHZW5lcmFs" },
  { title: "The Jackie Robinson Story", year: 1950, video_full: "https://www.youtube.com/watch?v=nguw2muH1D4&pp=ygUZVGhlIEphY2tpZSBSb2JpbnNvbiBTdG9yeQ%3D%3D" },
  { title: "The Last Time I Saw Paris", year: 1954, video_full: "https://www.youtube.com/watch?v=LbR5X_kItWQ&pp=ygUZVGhlIExhc3QgVGltZSBJIFNhdyBQYXJpcw%3D%3D" },
  { title: "The Little Princess", year: 1939, video_full: "https://www.youtube.com/watch?v=AJaHhDqrI_Q&pp=ygUTVGhlIExpdHRsZSBQcmluY2Vzcw%3D%3D" },
  { title: "The Man from Utah", year: 1934, video_full: "https://www.youtube.com/watch?v=4ljub_Qd1jI&pp=ygURVGhlIE1hbiBmcm9tIFV0YWg%3D" },
  { title: "The Man with the Golden Arm", year: 1955, video_full: "https://www.youtube.com/@TimelessClassicMovie" },
  { title: "The Painted Hills", year: 1951, video_full: "https://www.youtube.com/watch?v=x0V2GLAQ61Y&t=1s&pp=ygUWVGhlIFBhaW50ZWQgSGlsbHMgMTk1MQ%3D%3D" },
  { title: "The Silver Horde", year: 1930, video_full: "https://www.youtube.com/watch?v=N_dnqe4U3P8&pp=ygUQVGhlIFNpbHZlciBIb3JkZQ%3D%3D" },
  { title: "The Terror", year: 1963, video_full: "https://www.youtube.com/watch?v=_VhCHcAFCFk&pp=ygUPVGhlIFRlcnJvciAxOTYz" },
  { title: "Three Guys Named Mike", year: 1951, video_full: "https://www.youtube.com/watch?v=jhI4RiZOEKU&pp=ygUVVGhyZWUgR3V5cyBOYW1lZCBNaWtl" },
  { title: "Vengeance Valley", year: 1951, video_full: "https://www.youtube.com/watch?v=T_3qWcDsljo&pp=ygUQVmVuZ2VhbmNlIFZhbGxleQ%3D%3D" },
  { title: "White Zombie", year: 1932, video_full: "https://www.youtube.com/watch?v=NV3B2z0HkKA&pp=ygURd2hpdGUgem9tYmllIDE5MzI%3D" },
  { title: "Wives Under Suspicion", year: 1938, video_full: "https://www.youtube.com/watch?v=wYFsA6RhD-8&pp=ygUaV2l2ZXMgVW5kZXIgU3VzcGljaW9uIDE5Mzg%3D" },
];

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
    film.rating = detail["vote_average"] * 5 / 10;
    film.price = (detail["vote_average"] * 5 / 10) * 10000;
    film.ranking = 0;
    film.review = [];
    film.poster = new Object();

    if (detail["poster_path"]) {
      film.poster.img_500 = "https://image.tmdb.org/t/p/w500" + detail["poster_path"] 
      film.poster.img_1280 = "https://image.tmdb.org/t/p/w1280" + detail["poster_path"];
    }

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
  const info = await fetchInfo(data.results[0].id);
  const cast = await fetchCast(data.results[0].id);
  const videos = await fetchVideo(data.results[0].id);

  if (info && cast) {
    const film = { ...info, ...cast };
    film.videos = videos;
    film.overview = data.results[0].overview
    filmLists.push(film);
  }
}
filmLists = dropDuplicate(filmLists);

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
  for (let i = 1; i <= amount; i++) {
    const query = filmsInfo[i - 1].title.split(" ").join("%20");
    const primary_release_year = filmsInfo[i - 1].year;
    try {
      let data = await fetchApi(
        "https://api.themoviedb.org/3/search/movie?" +
          apiKey +
          "&" +
          "query=" +
          query +
          "&primary_release_year=" +
          primary_release_year
      );

      await handle(data);
      filmLists[i-1].videos.video_full = filmsInfo[i-1].video_full
    } catch (err) {
      console.log(err);
    }
  }
}

async function main() {
  await connectToMongo(code);

  await fetchFilm(filmsInfo.length);

  getReq(filmLists);

  await postToMongo();
}

main();
