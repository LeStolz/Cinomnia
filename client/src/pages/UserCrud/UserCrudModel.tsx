import { api } from "../../utils/api";

export class UserCrudModel {
  getUser = async (id: string) => {
    try {
      const user = await api.get(`/users/${id}`);

      if (user.data.length === 0) {
        throw new Error(`${id} not found`);
      } else {
        return user.data;
      }
    } catch (err) {
      throw null;
    }
  };

  getUsers = async (search: string) => {
    try {
      const users = await api.get(`/users?search=${search}`);

      return users.data;
    } catch (err) {
      return [];
    }
  };

  delUser = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (err: any) {
      throw err;
    }
  };

  addUser = async (email: string) => {
    try {
      await api.post(`/users`, { userEmail: email });
    } catch (err: any) {
      throw err;
    }
  };

  updateUser = async (id: string, email: string) => {
    try {
      await api.put(`/users/${id}`, { userEmail: email });
    } catch (err: any) {
      throw err;
    }
  };
}
