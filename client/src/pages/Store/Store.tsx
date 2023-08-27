import { StoreView } from "./StoreView";
import { StoreModel } from "./StoreModel";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalState";
import { useAuth } from "../../contexts/AuthContext";
import { Film } from "../../configs/Model";
export function Store() {
  const { getUser } = useAuth();
  const { removeMovieFromStore, store } = useContext(GlobalContext);
  const buyMovie = async (
    movieData: Film,
    status: string,
  ) => {
    const model = new StoreModel();
    model.addMovieToBought(await getUser(), movieData, status);
  };
  return <StoreView store={store} handleClose={removeMovieFromStore} buyMovie={buyMovie}/>;
}
