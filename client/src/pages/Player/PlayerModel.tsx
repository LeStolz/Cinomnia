import { api } from "../../utils/api";
import { Film } from "../../configs/Model";
export class PlayerModel {
  async fetchMovieById(filmId: string) {
    try {
      const response = await api.get(`/films/${filmId}`);
      const filmData = response.data[0] as Film;

      // Fetch genres for the movie
      const genreIds = filmData.genres.map((genre) => genre.id);
      const genreResponses = await Promise.all(
        genreIds.map((genreId) => api.get(`/genres/${genreId}`))
      );
      const genres = genreResponses.map(
        (genreResponse) => genreResponse.data[0]
      );

      filmData.genres = genres;

      // Fetch actor for the movie
      const castIds = filmData.casts.map((cast) => cast.id);
      const castResponses = await Promise.all(
        castIds.map((castId) => api.get(`/actors/${castId}`))
      );
      const actors = castResponses.map(
        (castResponses) => castResponses.data[0]
      );
      filmData.casts = actors;

      const directorIds = filmData.directors.map((director) => director.id);
      const directorResponses = await Promise.all(
        directorIds.map((directorId) => api.get(`/directors/${directorId}`))
      );
      const directors = directorResponses.map(
        (directorResponses) => directorResponses.data[0]
      );
      filmData.directors = directors;

      return filmData;
    } catch (error) {
      console.error("Error fetching film with id:", error);
      return null;
    }
  }
}
