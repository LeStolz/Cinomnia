import { api } from "../../utils/api";

export class GenreCrudModel {
  getGenre = async (id: string) => {
    try {
      const genre = await api.get(`/genres/${id}`);

      if (genre.data.length === 0) {
        throw new Error(`${id} not found`);
      } else {
        return genre.data[0];
      }
    } catch (err) {
      throw null;
    }
  };

  getGenres = async (search: string) => {
    try {
      const genres = await api.get(`/genres?search=${search}`);

      return genres.data;
    } catch (err) {
      return [];
    }
  };

  delGenre = async (id: string) => {
    try {
      await api.delete(`/genres/${id}`);
    } catch (err: any) {
      throw err;
    }
  };

  addGenre = async (name: string) => {
    try {
      await api.post(`/genres`, { genreName: name });
    } catch (err: any) {
      throw err;
    }
  };

  updateGenre = async (id: string, name: string) => {
    try {
      await api.put(`/genres/${id}`, { genreName: name });
    } catch (err: any) {
      throw err;
    }
  };
}
