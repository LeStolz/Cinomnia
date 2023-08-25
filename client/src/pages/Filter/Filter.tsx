import { useEffect, useState } from "react";
import { FilterModel } from "./FilterModel";
import { productType } from "../../contexts/Context";
import { FilterView } from "./FilterView";

export type Film = {
  _id: string;
  id: number;
  title: string;
  poster: {
    img_500: string;
    img_1280: string;
  };
  overview: string;
  release_date: Date;
  rating: number;
  ranking: number;
  review: string[];
  genres: {
    _id: string;
    id: number;
    name: string;
  }[];
  casts: {
    _id: string;
    id: number;
    name: string;
    biography: string;
    birthday: Date;
    gender: string;
    img: {
      img_500: string;
      img_1280: string;
    };
    crews: {
      id: number;
      job: string;
      img_character: {
        img_500: string;
        img_1280: string;
      };
    }[];
  }[];
  directors: {
    _id: string;
    id: number;
    name: string;
    biography: string;
    birthday: Date;
    gender: string;
    img: {
      img_500: string;
      img_1280: string;
    };
    crews: {
      id: number;
      job: string;
      img_character: {
        img_500: string;
        img_1280: string;
      };
    }[];
  }[];
  videos: {
    trailers: {
      _id: string;
      name: string;
      link: string;
    }[];
    video_full: string;
  };
  price: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Actor = {
  id: number;
  name: string;
  biography: string;
  birthday: Date;
  gender: string;
  img: { img_500: string; img_1280: string };
  crews: {
    id: number;
    job: string;
    img_character: { img_500: string; img_1280: string };
  }[];
};

export type Director = {
  id: number;
  name: string;
  biography: string;
  birthday: Date;
  gender: string;
  img: { img_500: string; img_1280: string };
  crews: {
    id: number;
    job: string;
    img_character: { img_500: string; img_1280: string };
  }[];
};

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

  const movies: productType[] = moviesFromDb.map((movie: Film) => ({
    qty: 1,
    id: movie.id,
    title: movie.title,
    price: movie.price,
    image: movie.poster.img_500,
    ratings: movie.rating,
    genres: movie.genres,
    isBought: false,
  }));

  return <FilterView movies={movies} />;
}
