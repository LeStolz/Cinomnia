import { ProductAction } from "./Context";
export const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c: any) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c: any) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const productReducer = (state: any, action: ProductAction) => {
  switch (action.type) {
    case "FILTER_BY_GENRE":
      return { ...state, selectedGenres: action.payload,};
    case "SORT_BY_PRICE":
      return { ...state, sortByPrice: action.payload, sortByName: !action.payload};
    case "SORT_BY_NAME":
      return { ...state, sortByName: action.payload, sortByPrice: !action.payload };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "FILTER_BY_BOUGHT":
      return { ...state, byBought: !state.byBought };
    case "CLEAR_FILTERS":
      return { byRating: 0, byBought: false, selectedGenres: []};
    default:
      return state;
  }
};
