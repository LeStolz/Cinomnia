import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { Film } from "../configs/Model";
import AppReducer from "./AppReducer";

// Interface for movie object

// Interface for the state object
interface AppState {
  watchlist: Film[];
  watched: Film[];
  store: Film[];
}

// Define the type for the context value
interface GlobalContextValue extends AppState {
  addMovieToWatchlist: (movie: Film) => void;
  removeMovieFromWatchlist: (id: number) => void;
  addMovieToWatched: (movie: Film) => void;
  moveToWatchlist: (movie: Film) => void;
  removeFromWatched: (id: number) => void;
  addMovieToStore: (movie: Film) => void;
  removeMovieFromStore: (id: number) => void;
  // Add any other action functions you have in the GlobalState here
}

// Initial state
const initialState: AppState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist")!)
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched")!)
    : [],
  store: localStorage.getItem("store")
    ? JSON.parse(localStorage.getItem("store")!)
    : [],
};

// Create context
export const GlobalContext = createContext<GlobalContextValue>({
  ...initialState,
  addMovieToWatchlist: () => {
    ("");
  },
  removeMovieFromWatchlist: () => {
    ("");
  },
  addMovieToWatched: () => {
    ("");
  },
  moveToWatchlist: () => {
    ("");
  },
  removeFromWatched: () => {
    ("");
  },
  addMovieToStore: () => {
    ("");
  },
  removeMovieFromStore: () => {
    ("");
  },
  // Add any other action functions with empty implementations here
});

// Provider components
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
    localStorage.setItem("store", JSON.stringify(state.store));

  }, [state]);

  // Actions
  const addMovieToWatchlist = (movie: Film) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };
  const removeMovieFromWatchlist = (id: number) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToWatched = (movie: Film) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist = (movie: Film) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  const removeFromWatched = (id: number) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };
  const addMovieToStore = (movie: Film) => {
    dispatch({ type: "ADD_MOVIE_TO_STORE", payload: movie });
  };
  const removeMovieFromStore = (id: number) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_STORE", payload: id });
  };
  // Add any other action functions here

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
        addMovieToStore,
        removeMovieFromStore
        // Add any other action functions here
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
