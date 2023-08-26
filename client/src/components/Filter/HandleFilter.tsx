import { CartState } from "../../contexts/Context";
import Filters from "./MovieFilter";
import SingleProduct from "./SingleProduct";
import { Film, Genre } from "../../configs/Model";
import { useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";

const Home = ({ movies }: { movies: Film[] }) => {
  const {
    state: { products },
    productState: {
      sortByName,
      sortByPrice,
      byRating,
      searchQuery,
      // byBought,
      selectedGenres,
    },
    updateProducts,
  } = CartState();

  useEffect(() => {
    updateProducts(movies);
  }, [movies]);

  const transformProducts = () => {
    let sortedProducts = [...products];

    if (sortByPrice) {
      sortedProducts = sortedProducts.sort((a: Film, b: Film) =>
        sortByPrice === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (sortByName) {
      sortedProducts = sortedProducts.sort((a: Film, b: Film) =>
        sortByName === "lowToHigh"
          ? a.title > b.title
            ? 1
            : -1
          : b.title > a.title
          ? 1
          : -1
      );
    }

    if (selectedGenres.length > 0) {
      sortedProducts = sortedProducts.filter((product: Film) =>
        selectedGenres.every((selectedGenre: string) =>
          product.genres.some((genre: Genre) => genre.name === selectedGenre)
        )
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod: Film) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // if (byBought) {
    //   sortedProducts = sortedProducts.filter(
    //     (prod: Film) => prod.isBought
    //   );
    // }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod: Film) => prod.rating >= byRating
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod: Film) => (
          <SingleProduct prod={prod} key={prod.id} />
          // <MovieCard movieData={prod} className=""/>
        ))}
      </div>
    </div>
  );
};

export default Home;
