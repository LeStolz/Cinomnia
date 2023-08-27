import { api } from "../../utils/api";
import { Film, Person, Genre } from "../../configs/Model";

export class CastDetailModel {
  static async fetchMovieById(Id: string) {
    let responseData = null;
    let relatedFilms: Film[] = [];
    let type = "";
    try {
      const actorResponse = await api.get(`/actors/${Id}`);
      const actorData = actorResponse.data[0] as Person;

      const filmIds = actorData.crews.map((film) => film.id);
      const filmResponses = await Promise.all(
        filmIds.map(async (filmId) => {
          try {
            const filmResponse = await api.get(`/films/${filmId}`);
            return filmResponse.data[0];
          } catch {
            console.error(`Film with id ${filmId} not found.`);
            return null;
          }
        })
      );
      const films = filmResponses.filter(
        (film) => film !== null && film !== undefined
      );
      for (const film of films) {
        const genreIds = film.genres.map((genre: Genre) => genre.id);
        const genreResponses = await Promise.all(
          genreIds.map((genreId: string) => api.get(`/genres/${genreId}`))
        );
        const genres = genreResponses.map(
          (genreResponse) => genreResponse.data[0]
        );
        film.genres = genres;
      }
      type = "Actor";
      responseData = actorData;
      relatedFilms = films;
    } catch {
      try {
        const directorResponse = await api.get(`/directors/${Id}`);
        console.log("director : ", directorResponse);
        const directorData = directorResponse.data[0] as Person;
        const filmIds = directorData.crews.map((film) => film.id);
        const filmResponses = await Promise.all(
          filmIds.map(async (filmId) => {
            try {
              const filmResponse = await api.get(`/films/${filmId}`);
              return filmResponse.data[0];
            } catch {
              console.error(`Film with id ${filmId} not found.`);
              return null;
            }
          })
        );
        const films = filmResponses.filter(
          (film) => film !== null && film !== undefined
        );
        for (const film of films) {
          const genreIds = film.genres.map((genre: Genre) => genre.id);
          const genreResponses = await Promise.all(
            genreIds.map((genreId: string) => api.get(`/genres/${genreId}`))
          );
          const genres = genreResponses.map(
            (genreResponse) => genreResponse.data[0]
          );
          film.genres = genres;
        }
        type = "Director";
        responseData = directorData;
        relatedFilms = films;
      } catch {
        console.error("Error fetching film with id:", Id);
      }
    }

    return { person: responseData, relatedFilms, type };
  }
}
