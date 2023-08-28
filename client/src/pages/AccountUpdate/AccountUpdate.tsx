import { AccountUpdateModel } from "./AccountUpdateModel";
import { AccountUpdateView } from "./AccountUpdateView";
import { useParams } from "react-router";

export type AccountUpdateViewProps = {
  id: string | undefined;
  changeAdmin: any;
  changeBalance: any;
  addBoughts: any;
  removeBoughts: any;
};

export type AccountUpdateModelProps = {};

export function AccountUpdate() {
  const { id } = useParams();
  const model = new AccountUpdateModel();

  const changeAdmin = async (email: string, type: string) => {
    await model.changeAdmin(email, type);
  };

  const changeBalance = async (email: string, balance: number) => {
    await model.changeBalance(email, balance);
  };

  const addBoughts = async (email: string, films: any) => {
    await model.addBoughts(email, films);
  };

  const removeBoughts = async (email: string, films: any) => {
    await model.removeBoughts(email, films);
  };

  return (
    <AccountUpdateView
      changeAdmin={changeAdmin}
      changeBalance={changeBalance}
      addBoughts={addBoughts}
      removeBoughts={removeBoughts}
      id={id}
    />
  );
}
