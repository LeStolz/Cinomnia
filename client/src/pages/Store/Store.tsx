import { StoreView } from "./StoreView";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalState";
export function Store() {
  const { removeMovieFromStore, store } = useContext(GlobalContext);
  console.log(store);
  return <StoreView store={store} handleClose={removeMovieFromStore}/>;
}
