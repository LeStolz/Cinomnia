import { ReactNode, createContext, useContext } from "react";
import { User, Film, ListFilm } from "../configs/Model";
import { useAuth } from "./AuthContext";
import { api } from "../utils/api";

type FilmContext = {
  addFilmToWishlist: (movieData: Film, status: string) => Promise<void>;
  removeFilmFromWishlist: (movieData: Film) => Promise<void>;
  addFilmToStore: (movieData: Film, price: number) => Promise<void>;
  removeFilmFromStore: (movieData: Film) => Promise<void>;
};

const FilmContext = createContext<FilmContext | null>(null);

export function useFilm() {
  return useContext(FilmContext) as FilmContext;
}

type FilmProviderProps = {
  children: ReactNode;
};

export function FilmProvider({ children }: FilmProviderProps) {
  const { getUser } = useAuth();
  const addFilmToWishlist = async (movieData: Film, status: string) => {
    try {
      await api.put("/users/add-wishlish", {
        email: (await getUser()).email,
        filmId: movieData._id,
        status: status,
      });
    } catch (error) {
      console.error("Error add film to wishlish:", error);
    }
  };
  const removeFilmFromWishlist = async (movieData: Film) => {
    try {
      await api.put("/users/remove-wishlist", {
        email: (await getUser()).email,
        filmId: movieData._id,
      });
    } catch (error) {
      console.error("Error removing film from wishlist:", error);
    }
  };

  const addFilmToStore = async (movieData: Film, price: number) => {
    try {
      await api.put("/users/add-store", {
        email: (await getUser()).email,
        filmId: movieData._id,
        price: price,
      });
    } catch (error) {
      console.error("Error add film to store:", error);
    }
  };

  const removeFilmFromStore = async (movieData: Film) => {
    try {
      await api.put("/users/remove-store", {
        email: (await getUser()).email,
        filmId: movieData._id,
      });
    } catch (error) {
      console.error("Error removing film from store:", error);
    }
  };

  const value = {
    addFilmToWishlist,
    removeFilmFromWishlist,
    addFilmToStore,
    removeFilmFromStore,
  };

  return <FilmContext.Provider value={value}>{children}</FilmContext.Provider>;
}
