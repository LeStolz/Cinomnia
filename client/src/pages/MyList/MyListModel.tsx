import { api } from "../../utils/api";
import { User } from "../../configs/Model";
export class MyListModel {
  getWishlist = async (user: User) => {
    if (!user) return;

    try {
      const response = await api.get(`/users/wishlist/${user.email}`);
      return response.data;
    } catch (error) {
      console.error("Error getting wishlist:", error);
      return [];
    }
  };
  getBought = async (user: User) => {
    if (!user) return;

    try {
      const response = await api.get(`/users/bought/${user.email}`);
      return response.data;
    } catch (error) {
      console.error("Error getting wishlist:", error);
      return [];
    }
  };
}
