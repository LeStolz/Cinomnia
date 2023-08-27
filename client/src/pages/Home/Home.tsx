import { useEffect, useState } from "react";
import { HomeModel } from "./HomeModel";
import { HomeView } from "./HomeView";
import { Film } from "../../configs/Model";

export function Home() {
  const [movies, setMovies] = useState<Film[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const cachedMovies = sessionStorage.getItem("cachedMovies");
      if (cachedMovies) {
        setMovies(JSON.parse(cachedMovies));
      } else {
        const model = new HomeModel();
        try {
          const fetchedMovies = await model.fetchData();
          setMovies(fetchedMovies);
          sessionStorage.setItem("cachedMovies", JSON.stringify(fetchedMovies));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);
  console.log(movies)
  return <HomeView movies={movies} />;
}
