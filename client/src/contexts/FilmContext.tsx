import { ReactNode, createContext, useContext } from "react";
import { User, Film, ListFilm } from "../configs/Model";
import { useAuth } from "./AuthContext";
import { api } from "../utils/api";

type FilmContext = {
  addFilmToWishlist: (movieData: Film, status: string) => Promise<void>;
  removeFilmFromWishlist: (movieData: Film) => Promise<void>;
  // getWishlist: () => Promise<ListFilm[]>;
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
        filmId: movieData,
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

  const getWishlist = async () => {
    try {
      const user = await getUser();
      const response = await api.get(`/users/wishlist/${user.email}`);
      return response.data;
    } catch (error) {
      console.error("Error getting wishlist:", error);
      return [];
    }
  };

  const value = {
    addFilmToWishlist,
    removeFilmFromWishlist,
    getWishlist,
  };

  return <FilmContext.Provider value={value}>{children}</FilmContext.Provider>;
}
