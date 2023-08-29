import { useEffect, useState } from "react";
import { FilmUpdateView } from "./FilmUpdateView";
import { FilmUpdateModel } from "./FilmUpdateModel";
import { useParams } from "react-router-dom";
import { Film } from "../../configs/Model";

export type FilmUpdateViewProps = any;

export function FilmUpdate() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Film | undefined>(undefined);
  const [title, setTitle] = useState<any>();
  const [date, setDate] = useState<any>();
  const [rating, setRating] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [overview, setOverview] = useState<any>();
  const [poster, setPoster] = useState<any>();
  const [genres, setGenre] = useState<any>();
  const [casts, setCast] = useState<any>();
  const [directors, setDirector] = useState<any>();
  const [trailer, setTrailer] = useState<any>();
  const [video, setVideo] = useState<any>();
  const model = new FilmUpdateModel();

  const funcs = {
    setTitle: (x: any) => {
      setTitle(x);
    },
    setDate: (x: any) => {
      setDate(x);
    },
    setRating: (x: any) => {
      setRating(x);
    },
    setPrice: (x: any) => {
      setPrice(x);
    },
    setOverview: (x: any) => {
      setOverview(x);
    },
    setPoster: (x: any) => {
      setPoster(x);
    },
    setGenre: (x: any) => {
      setGenre(x);
    },
    setCast: (x: any) => {
      setCast(x);
    },
    setDirector: (x: any) => {
      setDirector(x);
    },
    setTrailer: (x: any) => {
      setTrailer(x);
    },
    setVideo: (x: any) => {
      setVideo(x);
    },
  };

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

  const onSubmit = () => {
    model.updateFilm({
      id,
      title,
      date,
      rating,
      price,
      overview,
      poster,
      genres,
      casts,
      directors,
      trailer,
      video,
    });
  };

  return <FilmUpdateView movie={movie} onSubmit={onSubmit} {...funcs} />;
}
