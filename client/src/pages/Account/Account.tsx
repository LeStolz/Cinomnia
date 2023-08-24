import { AccountView } from "./AccountView";
import { useAuth } from "../../contexts/AuthContext";

export type AccountViewProps = {
  onSignout: () => void;
};

export type AccountModelProps = {};

export function Account() {
  const { signout } = useAuth();

  const onSignout = async () => {
    await signout();
  };

  return <AccountView onSignout={onSignout} />;
}
