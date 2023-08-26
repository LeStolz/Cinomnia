import { CartState } from "../../contexts/Context";
import Filters from "./MovieFilter";
import SingleProduct from "./SingleProduct";
import { productType } from "../../contexts/Context";
import { useEffect } from "react";

const Home = ({ movies }: { movies: productType[] }) => {
  const {
    state: { products },
    productState: {
      sortByName,
      sortByPrice,
      byRating,
      searchQuery,
      byBought,
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
      sortedProducts = sortedProducts.sort((a: productType, b: productType) =>
        sortByPrice === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (sortByName) {
      sortedProducts = sortedProducts.sort((a: productType, b: productType) =>
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
      sortedProducts = sortedProducts.filter((product: any) =>
        selectedGenres.every((selectedGenre: string) =>
          product.genres.some((genre: any) => genre.name === selectedGenre)
        )
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod: productType) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (byBought) {
      sortedProducts = sortedProducts.filter(
        (prod: productType) => prod.isBought
      );
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod: productType) => prod.ratings >= byRating
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().length > 0 ? (
          transformProducts().map((prod: productType) => (
            <SingleProduct prod={prod} key={prod.id} />
          ))
        ) : (
          <h1>We're sorry, no films were found for your search: "{searchQuery}"</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
