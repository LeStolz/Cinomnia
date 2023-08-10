import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import { cartReducer, productReducer } from "./Reducers";

export type ProductAction =
  | { type: "SORT_BY_PRICE"; payload: string }
  | { type: "SORT_BY_NAME"; payload: string }
  | { type: "FILTER_BY_RATING"; payload: number }
  | { type: "FILTER_BY_BOUGHT"}
  | { type: "FILTER_BY_GENRE", payload: string[]}
  | { type: "FILTER_BY_SEARCH"; payload: string }
  | { type: "CLEAR_FILTERS" };

// Kiểu cho trạng thái sản phẩm
export interface ProductState {
  byRating: number;
  searchQuery: string;
  sortByPrice: string;
  sortByName: string;
  byBought: boolean;
  selectedGenres: string[];
}

interface CartContextProps {
  state: any; // Thay any bằng kiểu phù hợp nếu có
  dispatch: Dispatch<any> | null;
  productState: ProductState;
  productDispatch: Dispatch<ProductAction> | null;
}

export const Cart = createContext<CartContextProps>({
  state: {},
  dispatch: null,
  productState: {
    byRating: 0,
    searchQuery: "",
    sortByPrice: "",
    sortByName: "",
    byBought: false,
    selectedGenres: []
  },
  productDispatch: null,
});

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomFilm(name: string, isBought: boolean, genre: Array<object>) {
  return {
    id: getRandomInt(1000),
    name: name,
    price: getRandomInt(100),
    image: "https://image.tmdb.org/t/p/w500//rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    ratings: getRandomInt(5),
    isBought: isBought,
    genre: genre
  };
}

interface ContextProps {
  children: ReactNode;
}

export interface productType {
  qty: number;
  id: number;
  name: string;
  price: number;
  image: string;
  ratings: number;
  isBought: boolean;
}

const Context = ({ children }: ContextProps) => {
  const film1 = randomFilm("D", true, [{name: "Animation"}, {name:"Action"}, {name:"History"}]);
  const film2 = randomFilm("B", false, [{name: "Science Fiction"}, {name: "Romance"}]);
  const film3 = randomFilm("A", false, [{name: "Science Fiction"}, {name: "War"}]);
  const film4 = randomFilm("F", true, [{name: "Action"}, {name: "History"}]);

  const products = [film1, film2, film3, film4];

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byRating: 0,
    selectedGenres:[],
    searchQuery: "",
    byBought: false
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return React.useContext(Cart);
};

export default Context;
