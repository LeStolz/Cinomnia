import { useState } from "react";
import { FilmCrudView } from "./FilmCrudView";
import { FilmCrudModel } from "./FilmCrudModel";

export type FilmCrudView = {
  films: any[];
  getFilms: (search: string) => void;
  getFilm: (id: string) => any;
  delFilm: (id: string) => void;
  addFilm: (id: string) => void;
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

  const addFilm = async (id: string) => {
    try {
      await model.addFilm(id);
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
    />
  );
}
