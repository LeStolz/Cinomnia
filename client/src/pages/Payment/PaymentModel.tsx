import { api } from "../../utils/api";
import { Film, User } from "../../configs/Model";
export class PaymenteModel {
  async addMovieToBought(user: User, movieData: Film, status: string) {
    try {
      await api.put("/users/add-bought", {
        email: user.email,
        filmId: movieData._id,
        status: status,
      });
    } catch (error) {
      console.error("Error buying film:", error);
    }
  }
  async addPurchase(user: User, movieData: Film) {
    try {
      await api.put("/users/add-history", {
        email: user.email,
        filmId: movieData._id,
      });
    } catch (error) {
      console.error("Error buying film:", error);
    }
  }
  async updateFilmStatusInFilm(filmId: number, newStatus: string) {
    try {
      const response = await api.put(`/films/${filmId}/update-status`, {
        status: newStatus,
      });

      const updatedFilm = response.data;
      console.log("Film status updated:", updatedFilm);
    } catch (error) {
      console.error("Error updating film status:", error);
    }
  }
}
