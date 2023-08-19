import { api } from "../../utils/api";
import { Film } from "./Filter";
import { Genre } from "./Filter";
import { Director } from "./Filter";
import { Actor } from "./Filter";

export class FilterModel {
  assignGenreToFilms = (films: Film[], genreData: Genre[]): Film[] => {
    return films.map((film) => {
      const updatedGenres = film.genres.map((genre) => {
        const matchedGenre = genreData.find((item) => item.id === genre.id);
        return { ...genre, name: matchedGenre ? matchedGenre.name : "" };
      });
      return {
        ...film,
        genres: updatedGenres,
      };
    });
  };

  //lay the loai 
  static async getGenres() {
    try {
      const response = await api.get("/genres");
      return response.data as Genre[];
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  }

  static async getActors() {
    try {
      const response = await api.get("/actors");
      return response.data as Actor[];
    } catch (error) {
      console.error("Error fetching actors:", error);
      return [];
    }
  }

  static async getDirectors() {
    try {
      const response = await api.get("/directors");
      return response.data as Director[];
    } catch (error) {
      console.error("Error fetching directors:", error);
      return [];
    }
  }

  static async fetchMovie() {
    try {
      const response = await api.get("/films");
      return response.data as Film[];
    } catch (error) {
      console.error("Error fetching films:", error);
      return [];
    }
  }

  static async fetchData() {
    try {
      const movies = await this.fetchMovie();
      const genre = await this.getGenres();
      const filterModel = new FilterModel();
      return filterModel.assignGenreToFilms(movies, genre);
    } catch (error) {
      console.error("Error fetching films:", error);
      return [];
    }
  }
}
