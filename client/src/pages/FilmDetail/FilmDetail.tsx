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
          setMovie(JSON.parse(cachedFilm));
        } else {
          try {
            const filmDocument = await FilmDetailModel.fetchMovieById(id);
            if (filmDocument) {
              setMovie(filmDocument);
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
