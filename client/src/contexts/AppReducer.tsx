import { Film } from "../configs/Model";
import { User } from "../configs/Model";
interface State {
  watchlist: Film[];
  watched: Film[];
  watching: Film[];
  store: Film[];
  // Add any other properties specific to the state object
}

interface Action {
  type: string;
  payload: Film | string;
}

const initialState: State = {
  watchlist: [],
  watched: [],
  watching: [],
  store: [],
};

const movieReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload as Film, ...state.watchlist],
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie._id !== (action.payload as string)
        ),
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload as Film, ...state.watched],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie._id !== (action.payload as string)
        ),
      };

    case "ADD_MOVIE_TO_WATCHING":
      return {
        ...state,
        watching: [action.payload as Film, ...state.watching],
      };
    case "REMOVE_FROM_WATCHING":
      return {
        ...state,
        watching: state.watching.filter(
          (movie) => movie._id !== (action.payload as string)
        ),
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie._id !== (action.payload as Film)._id
        ),
        watchlist: [action.payload as Film, ...state.watchlist],
      };
    case "REMOVE_MOVIE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie._id !== (action.payload as string)
        ),
      };
    case "ADD_MOVIE_TO_STORE":
      return {
        ...state,
        store: [action.payload as Film, ...state.store],
      };
    case "REMOVE_MOVIE_FROM_STORE":
      return {
        ...state,
        store: state.store.filter(
          (movie) => movie._id !== (action.payload as string)
        ),
      };
    default:
      return state;
  }
};

export default movieReducer;
