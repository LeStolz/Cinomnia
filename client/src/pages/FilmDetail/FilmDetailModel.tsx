import { api } from "../../utils/api";
import { Film, Genre } from "../../configs/Model";
export class FilmDetailModel {
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
  async fetchMovieById(filmId: string) {
    try {
      const response = await api.get(`/films/${filmId}`);
      const filmData = response.data[0] as Film;

      if (filmData.genres) {
        const genreIds = filmData.genres.map((genre) => genre.id);
        const genreResponses = await Promise.all(
          genreIds.map((genreId) => api.get(`/genres/${genreId}`))
        );
        const genres = genreResponses.map(
          (genreResponse) => genreResponse.data[0]
        );

        filmData.genres = genres;
      }

      if (filmData.casts) {
        const castIds = filmData.casts.map((cast) => cast.id);
        const castResponses = await Promise.all(
          castIds.map((castId) => api.get(`/actors/${castId}`))
        );
        const actors = castResponses.map(
          (castResponses) => castResponses.data[0]
        );
        filmData.casts = actors;
      }

      if (filmData.directors) {
        const directorIds = filmData.directors.map((director) => director.id);
        const directorResponses = await Promise.all(
          directorIds.map((directorId) => api.get(`/directors/${directorId}`))
        );
        const directors = directorResponses.map(
          (directorResponses) => directorResponses.data[0]
        );
        filmData.directors = directors;
      }

      const relatedResponse = await api.get(`/films/genre/${filmId}`);
      const relatedFilms = relatedResponse.data;

      return { film: filmData, relatedFilms };
    } catch (error) {
      console.error("Error fetching film and related films:", error);
      return null;
    }
  }

  async fetchMovie() {
    try {
      const response = await api.get("/films");
      return response.data as Film[];
    } catch (error) {
      console.error("Error fetching films:", error);
      return [];
    }
  }
  async getGenres() {
    try {
      const response = await api.get("/genres");
      return response.data as Genre[];
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  }

  async fetchData() {
    try {
      const movies = await this.fetchMovie();
      const genres = await this.getGenres();
      const homeModel = new FilmDetailModel();
      return homeModel.assignGenreToFilms(movies, genres);
    } catch (error) {
      console.error("Error fetching films:", error);
      return [];
    }
  }
}
