import { AccountUpdateViewProps } from "./AccountUpdate";
import { AccountView } from "../Account/AccountView";

export function AccountUpdateView(props: AccountUpdateViewProps) {
  return <AccountView onSignout={() => {}} {...props} editMode />;
}
