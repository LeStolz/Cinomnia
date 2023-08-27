import { useState } from "react";
import { FilmCrudView } from "./FilmCrudView";
import { FilmCrudModel } from "./FilmCrudModel";

export type FilmCrudView = {
  films: any[];
  getFilms: (search: string) => void;
  getFilm: (id: string) => any;
  delFilm: (id: string) => void;
  addFilm: (title: string) => void;
  updateFilm: (id: string, title: string) => void;
};

export function FilmCrud() {
  const [films, setFilms] = useState<any[]>([]);
  const model = new FilmCrudModel();

  const getFilms = async (search: string) => {
    setFilms(await model.getFilms(search));
  };

  const getFilm = async (id: string) => {
    try {
      return await model.getFilm(id);
    } catch (err: any) {
      throw err;
    }
  };

  const delFilm = async (id: string) => {
    try {
      await model.delFilm(id);
    } catch (err: any) {
      throw err;
    }
  };

  const addFilm = async (title: string) => {
    try {
      await model.addFilm(title);
    } catch (err: any) {
      throw err;
    }
  };

  const updateFilm = async (id: string, title: string) => {
    try {
      await model.updateFilm(id, title);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <FilmCrudView
      films={films}
      getFilms={getFilms}
      getFilm={getFilm}
      delFilm={delFilm}
      addFilm={addFilm}
      updateFilm={updateFilm}
    />
  );
}
