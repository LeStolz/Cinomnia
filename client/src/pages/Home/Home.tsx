// import { useEffect, useState } from "react";
// import { api } from "../../utils/api";
// import { HomeModel } from "./HomeModel";
// import { HomeView } from "./HomeView";

// type Film = {
//   _id: string;
//   title: string; 
// };

// export function Home() {
//   const [movies, setMovies] = useState<Film[]>([]);
//   const shuffleArray = (array: any[]) => {
//     const shuffledArray = [...array];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//     }
//     return shuffledArray;
//   };


//   useEffect(() => {
//     const fetchMovies = async () => {
//       const cachedMovies = localStorage.getItem("cachedMovies");

//       if (cachedMovies) {
//         setMovies(JSON.parse(cachedMovies));
//       } else {
//         try {
//           const fetchedMovies = await api.get("/");
//           setMovies(fetchedMovies.data);

//           localStorage.setItem("cachedMovies", JSON.stringify(fetchedMovies));
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//     };

//     fetchMovies();
//   }, []);
//   const shuffleMovies = shuffleArray(movies);

  
//   return <HomeView movies={shuffleMovies} />;
// }
// dang cap nhat api tu mongo
import { useEffect, useState } from "react";
import { HomeModel } from "./HomeModel";
import { HomeView } from "./HomeView";

export function Home() {
  const [movies, setMovies] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMovies = await HomeModel.fetchMovie("");
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(movies)
  return <HomeView movies={movies} />;
}
