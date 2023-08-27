import { useEffect, useState } from "react";
import { FilterModel } from "./FilterModel";
import { FilterView } from "./FilterView";
import { Film } from "../../configs/Model";

export function Filter() {
  const [moviesFromDb, setMovies] = useState<Film[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMovies = await FilterModel.fetchData();
        setMovies(fetchedMovies);

        // Chuyển đổi dữ liệu từ mảng Film sang mảng productType
        // const products: productType[] = fetchedMovies.map((movie: Film) => ({
        //   qty: 1,
        //   id: movie.id,
        //   title: movie.title,
        //   price: movie.price,
        //   image: movie.poster.img_500,
        //   ratings: movie.rating,
        //   genres: movie.genres,
        //   isBought: false,
        // }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const movies: productType[] = moviesFromDb.map((movie: Film) => ({
  //   qty: 1,
  //   id: movie.id,
  //   title: movie.title,
  //   price: movie.price,
  //   image: movie.poster.img_500,
  //   ratings: movie.rating,
  //   genres: movie.genres,
  //   isBought: false,
  // }));

  return <FilterView movies={moviesFromDb}/>;
}
