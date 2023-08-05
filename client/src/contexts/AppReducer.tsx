interface Movie {
  id: number;
  // Add any other properties specific to the movie object
}

interface State {
  watchlist: Movie[];
  watched: Movie[];
  store: Movie[];
  // Add any other properties specific to the state object
}

interface Action {
  type: string;
  payload: Movie | number;
}

const initialState: State = {
  watchlist: [],
  watched: [],
  store: [],
};

const movieReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload as Movie, ...state.watchlist],
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload as number
        ),
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== (action.payload as Movie).id
        ),
        watched: [(action.payload as Movie), ...state.watched],
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== (action.payload as Movie).id
        ),
        watchlist: [(action.payload as Movie), ...state.watchlist],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload as number
        ),
      };
      case "ADD_MOVIE_TO_STORE":
        return {
          ...state,
          store: [action.payload as Movie, ...state.store],
        };
      case "REMOVE_MOVIE_FROM_STORE":
        return {
          ...state,
          store: state.store.filter(
            (movie) => movie.id !== action.payload as number
          ),
        };
    default:
      return state;
  }
};

export default movieReducer;
