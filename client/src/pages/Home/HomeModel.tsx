import { api } from "../../utils/api";
import { Film } from "../../configs/Model";
import { Genre } from "../../configs/Model";
import { Director } from "../../configs/Model";
import { Actor } from "../../configs/Model";

export class HomeModel {
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
  async getGenres() {
    try {
      const response = await api.get("/genres");
      console.log("genres", response.data);
      return response.data as Genre[];
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  }

  async getActors() {
    try {
      const response = await api.get("/actors");
      console.log("actor", response);
      return response.data as Actor[];
    } catch (error) {
      console.error("Error fetching actors:", error);
      return [];
    }
  }

  async getDirectors() {
    try {
      const response = await api.get("/directors");
      console.log("director", response);
      return response.data as Director[];
    } catch (error) {
      console.error("Error fetching directors:", error);
      return [];
    }
  }

  async fetchMovie() {
    try {
      const response = await api.get("/films");
      console.log("film", response);
      return response.data as Film[];
    } catch (error) {
      console.error("Error fetching films:", error);
      return [];
    }
  }

  async fetchData() {
    try {
      const movies = await this.fetchMovie();
      const genres = await this.getGenres();
      const homeModel = new HomeModel();
      return homeModel.assignGenreToFilms(movies, genres);
    } catch (error) {
      console.error("Error fetching films:", error);
      return [];
    }
  }
}
