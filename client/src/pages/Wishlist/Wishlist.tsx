import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalState";
import { WishlistView } from "./WishlistView";

export function Wishlist() {
  const { watchlist } = useContext(GlobalContext);
  return <WishlistView watchlist={watchlist} />;
}
