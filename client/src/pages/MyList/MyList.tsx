import { useEffect, useState } from "react";
import { ListFilm } from "../../configs/Model";
import { MyListModel } from "./MyListModel";
import { MyListView } from "./MyListView";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router";
import { api } from "../../utils/api";

export function MyList() {
  const [wishlist, setWishlist] = useState<ListFilm[]>([]);
  const [bought, setBought] = useState<ListFilm[]>([]);
  const { getUser } = useAuth();
  const [user, setUser] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        setUser((await api.get(`/users/${id}`)).data);
      } else {
        setUser(await getUser());
      }
    })();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      const model = new MyListModel();

      try {
        const wishlistData = await model.getWishlist(user);
        const boughtData = await model.getBought(user);
        if (wishlistData) {
          setWishlist(wishlistData);
        }
        if (boughtData) {
          setBought(boughtData);
        }
      } catch (error) {}
    };
    fetchWishlist();
  }, [user]);

  return <MyListView wishlist={wishlist} bought={bought} />;
}
