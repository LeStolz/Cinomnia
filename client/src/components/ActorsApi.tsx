import { useEffect, useState } from "react";
import { api } from "../utils/api";

type Crew = {
  id: number;
  job: string;
  img: string;
};

type Actor = {
  id: number;
  name: string;
  biography: string;
  birthday: Date;
  gender: string;
  img: string;
  crews: [Crew];
};
export function ActorsApi() {
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await api.get("/actors");
        setActors(response.data);
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
          {actors.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
