import { useEffect, useState } from "react";
import { FilmDetailView } from "./FilmDetailView";
import { FilmDetailModel } from "./FilmDetailModel";
import { useParams } from "react-router-dom";
import { Film } from "../../configs/Model";

export function FilmDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Film | undefined>(undefined);
  const [movies, setMovies] = useState<Film[]>([]);
  const [filmRatingIndex, setFilmRatingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const getPlayer = async () => {
        const cachedFilm = sessionStorage.getItem(`cachedFilm${id}`);
        const cachedMovies = sessionStorage.getItem("cachedMovies");
        const ratingFilm = sessionStorage.getItem(`ratingFilm${id}`);
        if (cachedFilm && cachedMovies && ratingFilm) {
          setMovie(JSON.parse(cachedFilm).film);
          setMovies(JSON.parse(cachedMovies));
          setFilmRatingIndex(JSON.parse(ratingFilm));
        } else {
          try {
            const model = new FilmDetailModel();
            const filmDocument = await model.fetchMovieById(id);
            console.log(filmDocument);
            const movies = await model.fetchData();
            if (filmDocument && movies) {
              const ratings = movies.map((film) => film.rating);
              const filmRating = filmDocument.film.rating;
              const sortedRatings = [...ratings].sort((a, b) => b - a);
              const filmRatingIndex = sortedRatings.indexOf(filmRating);
              setMovie(filmDocument.film);
              setFilmRatingIndex(filmRatingIndex + 1);
              sessionStorage.setItem(
                `cachedFilm${id}`,
                JSON.stringify(filmDocument)
              );
              sessionStorage.setItem(
                `ratingFilm${id}`,
                JSON.stringify(filmRatingIndex + 1)
              );
              sessionStorage.setItem("cachedMovies", JSON.stringify(movies));
            } else {
              console.error("Film not found.");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };

      getPlayer();
    }
  }, [id]);

  return <FilmDetailView movie={movie} filmRatingIndex={filmRatingIndex} />;
}
