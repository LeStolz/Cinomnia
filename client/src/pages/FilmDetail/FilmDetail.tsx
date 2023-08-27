import { useEffect, useState } from "react";
import { FilmDetailView } from "./FilmDetailView";
import { FilmDetailModel } from "./FilmDetailModel";
import { useParams } from "react-router-dom";
import { Film } from "../../configs/Model";

export function FilmDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Film | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const getPlayer = async () => {
        const cachedFilm = sessionStorage.getItem(`cachedFilm${id}`);
        if (cachedFilm) {
          const parsedCachedFilm = JSON.parse(cachedFilm);
          setMovie(parsedCachedFilm.film);
        } else {
          try {
            const model = new FilmDetailModel();
            const filmDocument = await model.fetchMovieById(id);
            if (filmDocument) {
              setMovie(filmDocument.film);
              sessionStorage.setItem(
                `cachedFilm${id}`,
                JSON.stringify(filmDocument)
              );
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

  return <FilmDetailView movie={movie} />;
}
