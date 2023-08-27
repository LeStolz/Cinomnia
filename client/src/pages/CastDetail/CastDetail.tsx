import { useEffect, useState } from "react";
import { CastDetailView } from "./CastDetailView";
import { CastDetailModel } from "./CastDetailModel";
import { useParams } from "react-router-dom";
import { Film, Person } from "../../configs/Model";

export function CastDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState<Person | undefined>(undefined);
  const [relatedFilms, setRelatedFilms] = useState<Film[]>([]);
  const [type, setType] = useState("");

  useEffect(() => {
    if (id) {
      const getPlayer = async () => {
        const cachedFilm = sessionStorage.getItem(`cachedFilm${id}`);
        if (cachedFilm) {
          const parsedCachedFilm = JSON.parse(cachedFilm);
          setPerson(parsedCachedFilm.person);
          setRelatedFilms(parsedCachedFilm.relatedFilms);
          setType(parsedCachedFilm.type);
        } else {
          try {
            const castDocument = await CastDetailModel.fetchMovieById(id);
            if (castDocument && castDocument.person) {
              setPerson(castDocument.person);
              setRelatedFilms(castDocument.relatedFilms);
              setType(castDocument.type);
              sessionStorage.setItem(
                `cachedFilm${id}`,
                JSON.stringify(castDocument)
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

  return (
    <CastDetailView person={person} relatedFilms={relatedFilms} type={type} />
  );
}
