import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalState";
import { Container, Button, Image, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

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
  const { removeMovieFromStore, store } = useContext(GlobalContext);

  const handleCloseModal = () => {
    handleClose();
  };
  const handleGoToStore = () => {
    handleClose();
    navigate("/store");
  };

  const movies = store.slice(0, 5);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>List Cart Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {movies.length > 0 ? (
          <Container className="m-1">
            {movies.map((movie: Film, index) => (
              <React.Fragment key={index}>
                <Row className="mb-3">
                  <Col xs={4}>
                    <Image
                      src={`${movie.poster.img_1280}`}
                      className="rounded border border-3  w-100 h-auto"
                    />
                  </Col>
                  <Col>
                    <Row className="p-0">
                      <h5 className="text-success movie-name overflow-hidden">
                        {movie.title}
                      </h5>
                    </Row>
                    <Row className="p-0">
                      <Col>
                        <span>
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                        <h6 className="text-primary">{`${(
                          movie.rating * 1.25
                        ).toFixed(2)} $`}</h6>
                      </Col>
                      <Col>
                        <Button
                          variant="primary"
                          className="end-0"
                          onClick={() => removeMovieFromStore(movie.id)}
                        >
                          <i className="bi bi-trash-fill me-1"></i>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr></hr>
              </React.Fragment>
            ))}
          </Container>
        ) : (
          <h2>No any items</h2>
        )}
      </Modal.Body>
      <Modal.Footer>
        <h5 className="pe-5 me-5">{`${store.length} items in your cart`}</h5>
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
