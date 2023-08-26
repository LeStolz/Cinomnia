import { StoreView } from "./StoreView";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalState";
export function Store() {
  const { removeMovieFromStore, store } = useContext(GlobalContext);
  return <StoreView store={store} handleClose={removeMovieFromStore} />;
}
