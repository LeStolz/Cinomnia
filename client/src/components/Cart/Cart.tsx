import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import CartComponent from "./CartComponent";
import { CartState } from "../../contexts/Context";

type Film = {
  _id: string;
  id: number;
  title: string;
  poster: {
    img_500: string;
    img_1280: string;
  };
  overview: string;
  release_date: Date;
  rating: number;
  ranking: number;
  review: string[];
  genres: {
    _id: string;
    id: number;
    name: string;
  }[];
  casts: {
    _id: string;
    id: number;
    name: string;
    biography: string;
    birthday: Date;
    gender: string;
    img: {
      img_500: string;
      img_1280: string;
    };
    crews: {
      id: number;
      job: string;
      img_character: {
        img_500: string;
        img_1280: string;
      };
    }[];
  }[];
  directors: {
    _id: string;
    id: number;
    name: string;
    biography: string;
    birthday: Date;
    gender: string;
    img: {
      img_500: string;
      img_1280: string;
    };
    crews: {
      id: number;
      job: string;
      img_character: {
        img_500: string;
        img_1280: string;
      };
    }[];
  }[];
  videos: {
    trailers: {
      _id: string;
      name: string;
      link: string;
    }[];
    video_full: string;
  };
  price: number;
};

export function Cart({ show, handleClose }: any) {
  const navigate = useNavigate();

  const {
    state: { cart },
  } = CartState();

  const handleCloseModal = () => {
    handleClose();
  };
  const handleGoToStore = () => {
    handleClose();
    navigate("/store");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>List Cart Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CartComponent />
      </Modal.Body>
      <Modal.Footer>
        <h5 className="pe-5 me-5">{`${cart.length} items in your cart`}</h5>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleGoToStore}>
          Go to Store
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
