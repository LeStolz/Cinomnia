import { api } from "../../utils/api";

export class FilmCrudModel {
  getFilm = async (id: string) => {
    try {
      const film = await api.get(`/films/${id}`);

      if (film.data.length === 0) {
        throw new Error(`${id} not found`);
      } else {
        return film.data[0];
      }
    } catch (err) {
      throw null;
    }
  };

  getFilms = async (search: string) => {
    try {
      const films = await api.get(`/films?search=${search}`);

      return films.data;
    } catch (err) {
      return [];
    }
  };

  delFilm = async (id: string) => {
    try {
      await api.delete(`/films/${id}`);
    } catch (err: any) {
      throw err;
    }
  };

  addFilm = async (title: string) => {
    try {
      await api.post(`/films`, { filmTitle: title });
    } catch (err: any) {
      throw err;
    }
  };

  updateFilm = async (id: string, title: string) => {
    try {
      await api.put(`/films/${id}`, { filmTitle: title });
    } catch (err: any) {
      throw err;
    }
  };
}
