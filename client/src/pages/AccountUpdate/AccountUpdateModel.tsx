import { api } from "../../utils/api";

export class AccountUpdateModel {
  changeAdmin = async (email: string, type: string) => {
    try {
      await api.put(`/users/${email}`, { type });
    } catch (err: any) {
      throw err;
    }
  };

  changeBalance = async (email: string, balance: number) => {
    try {
      await api.put(`/users/${email}`, { balance });
    } catch (err: any) {
      throw err;
    }
  };

  addBoughts = async (email: string, films: any) => {
    try {
      await api.put("/users/add-bought", {
        email,
        filmId: films[0].id,
        status: "bought",
      });

      for (const film of films) {
        await api.put("/users/add-bought", {
          email,
          filmId: film.id,
          status: "bought",
        });
      }
    } catch (err: any) {
      throw err;
    }
  };
}
