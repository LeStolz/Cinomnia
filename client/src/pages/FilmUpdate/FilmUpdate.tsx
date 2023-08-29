import { useEffect, useState } from "react";
import { FilmUpdateView } from "./FilmUpdateView";
import { FilmUpdateModel } from "./FilmUpdateModel";
import { useParams } from "react-router-dom";
import { Film } from "../../configs/Model";

export type FilmUpdateViewProps = {
  movie: Film | undefined;
  onSubmit: () => void;
};

export function FilmUpdate() {
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
            const model = new FilmUpdateModel();
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

  const onSubmit = () => {};

  return <FilmUpdateView movie={movie} onSubmit={onSubmit} />;
}
