import { CartState } from "../context/Context";
import Filters from "./MovieFilter";
import SingleProduct from "./SingleProduct";
import { productType } from "../context/Context";

const Home = () => {
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
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sortByPrice) {
      sortedProducts = sortedProducts.sort((a: productType, b: productType) =>
        sortByPrice === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (sortByName) {
      sortedProducts = sortedProducts.sort((a: productType, b: productType) =>
        sortByName === "lowToHigh"
          ? a.name > b.name
            ? 1
            : -1
          : b.name > a.name
          ? 1
          : -1
      );
    }

    if (selectedGenres.length > 0) {
      sortedProducts = sortedProducts.filter((product: any) =>
        selectedGenres.every((selectedGenre: string) =>
          product.genre.some((g: any) => g.name === selectedGenre)
        )
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod: productType) =>
        prod.name.toLowerCase().includes(searchQuery)
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
        {transformProducts().map((prod: productType) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
