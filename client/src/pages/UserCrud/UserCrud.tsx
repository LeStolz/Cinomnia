import { useState } from "react";
import { UserCrudView } from "./UserCrudView";
import { UserCrudModel } from "./UserCrudModel";

export type UserCrudView = {
  users: any[];
  getUsers: (search: string) => void;
  getUser: (id: string) => any;
  delUser: (id: string) => void;
  addUser: (email: string) => void;
  updateUser: (id: string, email: string) => void;
};

export function UserCrud() {
  const [users, setUsers] = useState<any[]>([]);
  const model = new UserCrudModel();

  const getUsers = async (search: string) => {
    setUsers(await model.getUsers(search));
  };

  const getUser = async (id: string) => {
    try {
      return await model.getUser(id);
    } catch (err: any) {
      throw err;
    }
  };

  const delUser = async (id: string) => {
    try {
      await model.delUser(id);
    } catch (err: any) {
      throw err;
    }
  };

  const addUser = async (email: string) => {
    try {
      await model.addUser(email);
    } catch (err: any) {
      throw err;
    }
  };

  const updateUser = async (id: string, email: string) => {
    try {
      await model.updateUser(id, email);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <UserCrudView
      users={users}
      getUsers={getUsers}
      getUser={getUser}
      delUser={delUser}
      addUser={addUser}
      updateUser={updateUser}
    />
  );
}
