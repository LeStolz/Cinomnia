import React, { useEffect, useContext } from "react";
import { Film } from "../../configs/Model";
import { useAuth } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalState";
import { PaymenteModel } from "./PaymentModel";
import { PaymentView } from "./PaymentView";
import { api } from "../../utils/api";

export const Payment = () => {
  const { getUser } = useAuth();
  const { removeMovieFromStore, store } = useContext(GlobalContext);
  const storeItems = Object.entries(store).map(([id, item]) => [
    parseInt(id),
    { price: item.price, name: item.title },
  ]);
  // console.log(storeItems);
  const items = Object.keys(store).map((key) => ({
    id: parseInt(key, 10),
    quantity: 1,
  }));

  const createOrder = async () => {
    try {
      const response = await api.post(`/payment/create-order`, {
        storeItems,
        items,
      });

      const { id } = await response.data;
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const buyMovie = async (movieData: Film, status: string) => {
    const model = new PaymenteModel();
    model.addMovieToBought(await getUser(), movieData, status);
  };

  const addPurchase = async (movieData: Film) => {
    const model = new PaymenteModel();
    model.addPurchase(await getUser(), movieData);
  };

  const updateFilmStatusInFilm = async (movieData: Film, status: string) => {
    const model = new PaymenteModel();
    model.updateFilmStatusInFilm(movieData.id, status);
  };

  return (
    <PaymentView
      store={store}
      handleClose={removeMovieFromStore}
      buyMovie={buyMovie}
      addPurchase={addPurchase}
      createOrder={createOrder}
      updateFilmStatusInFilm={updateFilmStatusInFilm}
    />
  );
};
