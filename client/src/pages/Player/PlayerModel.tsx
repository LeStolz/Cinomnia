import { api } from "../../utils/api";
import { Film, User } from "../../configs/Model";
export class PlayerModel {
  async fetchMovieById(filmId: string) {
    try {
      const response = await api.get(`/films/${filmId}`);
      const filmData = response.data[0] as Film;

      const genreIds = filmData.genres.map((genre) => genre.id);
      const genreResponses = await Promise.all(
        genreIds.map((genreId) => api.get(`/genres/${genreId}`))
      );
      const genres = genreResponses.map(
        (genreResponse) => genreResponse.data[0]
      );

      filmData.genres = genres;
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

      const relatedResponse = await api.get(`/films/genre/${filmId}`);
      const relatedFilms = relatedResponse.data;

      return { film: filmData, relatedFilms };
    } catch (error) {
      console.error("Error fetching film and related films:", error);
      return null;
    }
  }

  async updateFilmStatus(user: User, movieData: Film, newStatus: string) {
    const existingFilm = user.bought.find(
      (item) => item.film.toString() === movieData._id
    );

    if (existingFilm && existingFilm.status !== newStatus) {
      try {
        await api.put("/users/update-status", {
          email: user.email,
          filmId: movieData._id,
          newStatus: newStatus,
        });
      } catch (error) {
        console.error("Error updating film status and duration:", error);
      }
    }
  }
  async updateFilmDuration(filmId: string, duration: number) {
    try {
      const response = await api.put(`/films/${filmId}/update-duration`, {
        duration: duration,
      });

      const updatedFilm = response.data;
      console.log("Film duration updated:", updatedFilm);
    } catch (error) {
      console.error("Error updating film duration:", error);
    }
  }
}
