import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

type Film = {
  id: number;
  name: string; 
};
export function ActorsComponent() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await api.get("/actors");
        console.log(response);
        setFilms(response.data);
      } catch (error) {
        console.error("Failed to fetch Actor:", error);
      }
    };

    fetchActors();
  }, []);
  return (
    <div>
      <div>
        <h1>Actors</h1>
        <ul>
          {films.map((film) => (
            <li key={film.id}>{film.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}