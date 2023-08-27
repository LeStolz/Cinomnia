import { useEffect, useState } from "react";
import { ListFilm } from "../../configs/Model";
import { MyListModel } from "./MyListModel";
import { MyListView } from "./MyListView";
import { useAuth } from "../../contexts/AuthContext";

export function MyList() {
  const [wishlist, setWishlist] = useState<ListFilm[]>([]);
  const [bought, setBought] = useState<ListFilm[]>([]);
  const { getUser } = useAuth();
  useEffect(() => {
    const fetchWishlist = async () => {
      const model = new MyListModel();
      try {
        const wishlistData = await model.getWishlist(await getUser());
        const boughtData = await model.getBought(await getUser());
        if (wishlistData) {
          console.log("wishlist", wishlistData);
          setWishlist(wishlistData);
        }
        if (boughtData) {
          console.log("boughtData", boughtData);
          setBought(boughtData);
        } else {
          console.error("Film not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWishlist();
  }, []);

  return <MyListView wishlist={wishlist} bought={bought} />;
}
