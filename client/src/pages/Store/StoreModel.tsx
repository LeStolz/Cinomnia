import { api } from "../../utils/api";
import { Film, User } from "../../configs/Model";
export class StoreModel {
  async addMovieToBought(
    user: User,
    movieData: Film,
    status: string,
  ) {
    try {
      await api.put("/users/add-bought", {
        email: user.email,
        filmId: movieData,
        status: status,
      });
    } catch (error) {
      console.error("Error buying film:", error);
    }
  }
}
