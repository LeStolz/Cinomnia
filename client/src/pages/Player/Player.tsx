import { useEffect, useState } from "react";
import { PlayerView } from "./PlayerView";
import { PlayerModel } from "./PlayerModel";
import { useParams } from "react-router-dom";
import { Film } from "../../configs/Model";
import { useAuth } from "../../contexts/AuthContext";

export function Player() {
  const { getUser } = useAuth();
  const { id } = useParams();
  const [movie, setMovie] = useState<Film>();
  const [progress, setProgress] = useState<string>();
  const [relatedFilms, setRelatedFilms] = useState<Film[]>([]);

  useEffect(() => {
    if (id) {
      const getPlayer = async () => {
        const cachedFilm = sessionStorage.getItem(`cachedFilm${id}`);
        const progress = sessionStorage.getItem(`progress-${id}`);
        if (cachedFilm) {
          const parsedCachedFilm = JSON.parse(cachedFilm);
          setMovie(parsedCachedFilm.film);
          setRelatedFilms(parsedCachedFilm.relatedFilms);
          if (progress !== null) {
            setProgress(progress);
          }
        } else {
          const model = new PlayerModel();
          try {
            const filmData = await model.fetchMovieById(id);
            if (filmData) {
              setMovie(filmData.film);
              setRelatedFilms(filmData.relatedFilms);
              sessionStorage.setItem(
                `cachedFilm${id}`,
                JSON.stringify(filmData)
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

  const updateFilmStatus = async (movieData: Film, status: string) => {
    const model = new PlayerModel();
    model.updateFilmStatus(await getUser(), movieData, status);
  };

  const updateFilmStatusInFilm = async (movieData: Film, status: string) => {
    const model = new PlayerModel();
    model.updateFilmStatusInFilm(movieData.id, status);
  };

  const updateFilmDuration = async (movieData: Film, duration: number) => {
    const model = new PlayerModel();
    model.updateFilmDuration(movieData.id, duration);
  };
  return (
    <PlayerView
      movieData={movie}
      relatedFilms={relatedFilms}
      progress={progress}
      updateFilmStatus={updateFilmStatus}
      updateFilmStatusInFilm={updateFilmStatusInFilm}
      updateFilmDuration={updateFilmDuration}
    />
  );
}
