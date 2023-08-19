  import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
  import { cartReducer, productReducer } from "./Reducers";

  export type ProductAction =
    | { type: "SORT_BY_PRICE"; payload: string }
    | { type: "SORT_BY_NAME"; payload: string }
    | { type: "FILTER_BY_RATING"; payload: number }
    | { type: "FILTER_BY_BOUGHT"}
    | { type: "FILTER_BY_GENRE", payload: string[]}
    | { type: "FILTER_BY_SEARCH"; payload: string }
    | { type: "CLEAR_FILTERS" }
    | { type: "UPDATE_PRODUCTS"; payload: productType[] };

  // Kiểu cho trạng thái sản phẩm
  export interface ProductState {
    byRating: number;
    searchQuery: string;
    sortByPrice: string;
    sortByName: string;
    byBought: boolean;
    selectedGenres: string[];
  }

  export interface CartContextProps {
    state: any;
    dispatch: Dispatch<any> | null;
    productState: ProductState;
    productDispatch: Dispatch<ProductAction> | null;
    updateProducts: (newProducts: productType[]) => void;
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateProducts: () => {},
  });

  interface ContextProps {
    children: ReactNode;
  }

  export interface productType {
    qty: number;
    id: number;
    title: string;
    price: number;
    image: string;
    ratings: number;
    genres: object;
    isBought: boolean;
  }

  const Context = ({ children }: ContextProps) => {
    const [state, dispatch] = useReducer(cartReducer, {
      products: [],
      cart: [],
    });

    const [productState, productDispatch] = useReducer(productReducer, {
      byRating: 0,
      selectedGenres:[],
      searchQuery: "",
      byBought: false
    });

    const updateProducts = (newProducts: productType[]) => {
      dispatch({ type: "UPDATE_PRODUCTS", payload: newProducts });
    };

    return (
      <Cart.Provider value={{ state, dispatch, productState, productDispatch, updateProducts }}>
        {children}
      </Cart.Provider>
    );
  };

  export const CartState = () => {
    return React.useContext(Cart);
  };

  export default Context;
