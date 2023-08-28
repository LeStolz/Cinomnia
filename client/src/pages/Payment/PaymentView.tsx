import { Container, Row, Image, Button } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { Film } from "../../configs/Model";

const initialOptions = {
  clientId:
    "AV14l9MpT7vNut19VM5PLcOEkVQSQWBtTTLLY6GkD3J6w5SMgEgNdRRL2cQMriM6Im6Asflu7OoqArV5",
  currency: "USD",
  intent: "capture",
};
interface PlayerViewProps {
  store: Film[];
  handleClose: (id: string) => void;
  buyMovie: (movieData: Film, status: string) => void;
  addPurchase: (movieData: Film) => void;
  createOrder: any;
  updateFilmStatusInFilm: (movieData: Film, status: string) => void;
}
export function PaymentView({
  store,
  handleClose,
  buyMovie,
  addPurchase,
  createOrder,
  updateFilmStatusInFilm,
}: PlayerViewProps) {
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleApprove = async (data: any, actions: any) => {
    try {
      setPaymentStatus("success");
      await handleGoToCheckout();
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleCancel = () => {
    setPaymentStatus("canceled");
  };

  const handleFailure = () => {
    setPaymentStatus("failed");
  };
  const handleDeleteAllItems = async () => {
    store.forEach((movie: Film) => {
      handleClose(movie._id);
    });
  };
  const handleGoToCheckout = async () => {
    store.forEach((movie: Film) => {
      updateFilmStatusInFilm(movie, "bought");
      buyMovie(movie, "bought");
      addPurchase(movie);
    });
    handleDeleteAllItems();
  };

  return (
    <Container fluid className="p-2 w-100 bg-light rounded border p-0">
      <Row>
        <Image
          className="rounded w-100 h-100"
          src="https://cdn.discordapp.com/attachments/1060825015681028127/1076385063903694908/rauljr7_3d_e83fed6a-69aa-4a6a-b0ec-928edd57aecf.png"
        />
      </Row>
      <Row className="my-3 mx-0">
        <Button className="fs-4 fw-bold">
          <i>Wallet</i>
        </Button>
      </Row>
      <Row className="my-3">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createOrder={() => createOrder()}
            onApprove={handleApprove}
            onCancel={handleCancel}
            onError={handleFailure}
          />
        </PayPalScriptProvider>
      </Row>
      {paymentStatus === "success" && (
        <div className="alert alert-success" role="alert">
          Payment successful! Redirecting...
        </div>
      )}

      {paymentStatus === "failed" && (
        <div className="alert alert-danger" role="alert">
          Payment failed. Please try again.
        </div>
      )}

      {paymentStatus === "canceled" && (
        <div className="alert alert-warning" role="alert">
          Payment canceled by user.
        </div>
      )}
    </Container>
  );
}
