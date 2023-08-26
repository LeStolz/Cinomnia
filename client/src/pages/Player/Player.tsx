import { useEffect, useState } from "react";
import { PlayerView } from "./PlayerView";
import { PlayerModel } from "./PlayerModel";
import { useParams } from "react-router-dom";
import { Film } from "../../configs/Model";

export function Player() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Film | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const getPlayer = async () => {
        const cachedFilm = sessionStorage.getItem(`cachedFilm${id}`);
        if (cachedFilm) {
          setMovie(JSON.parse(cachedFilm));
        } else {
          const model = new PlayerModel();
          try {
            const filmDocument = await model.fetchMovieById(id);
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

  return <PlayerView movie={movie} />;
}
