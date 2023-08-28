import { AccountView } from "./AccountView";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router";

export type AccountViewProps = {
  onSignout: () => void;
  id: string | undefined;
  editMode?: boolean;
  changeAdmin?: any;
  changeBalance?: any;
  addBoughts?: any;
  removeBoughts?: any;
};

export type AccountModelProps = {};

export function Account() {
  const { signout } = useAuth();
  const { id } = useParams();

  const onSignout = async () => {
    await signout();
  };

  return <AccountView onSignout={onSignout} id={id} />;
}
