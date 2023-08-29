import { api } from "../../utils/api";
import { Film, User } from "../../configs/Model";
export class PurchaseHistoryModel {
  getPurchaseList = async (user : User) => {
    try {
      const response = await api.get(`/users/history/${user.email}`);
      return response.data;
    } catch (error) {
      console.error("Error getting wishlist:", error);
      return [];
    }
  };
}
