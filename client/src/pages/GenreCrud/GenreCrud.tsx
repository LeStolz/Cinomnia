import { useState } from "react";
import { GenreCrudView } from "./GenreCrudView";
import { GenreCrudModel } from "./GenreCrudModel";

export type GenreCrudView = {
  genres: any[];
  getGenres: (search: string) => void;
  getGenre: (id: string) => any;
  delGenre: (id: string) => void;
  addGenre: (name: string) => void;
  updateGenre: (id: string, name: string) => void;
};

export function GenreCrud() {
  const [genres, setGenres] = useState<any[]>([]);
  const model = new GenreCrudModel();

  const getGenres = async (search: string) => {
    setGenres(await model.getGenres(search));
  };

  const getGenre = async (id: string) => {
    try {
      return await model.getGenre(id);
    } catch (err: any) {
      throw err;
    }
  };

  const delGenre = async (id: string) => {
    try {
      await model.delGenre(id);
    } catch (err: any) {
      throw err;
    }
  };

  const addGenre = async (name: string) => {
    try {
      await model.addGenre(name);
    } catch (err: any) {
      throw err;
    }
  };

  const updateGenre = async (id: string, name: string) => {
    try {
      await model.updateGenre(id, name);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <GenreCrudView
      genres={genres}
      getGenres={getGenres}
      getGenre={getGenre}
      delGenre={delGenre}
      addGenre={addGenre}
      updateGenre={updateGenre}
    />
  );
}
