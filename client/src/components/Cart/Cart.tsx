import React, { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalState";
import { Container, Button, Image, Modal, Row, Col } from "react-bootstrap";
import { Film } from "../../configs/Model";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

interface ModalCartProps {
  show: boolean | undefined;
  handleClose: () => void;
  removeMovieFromStore: (id: string) => void;
  store: Film[];
}

const ModalCart = ({
  show,
  handleClose,
  removeMovieFromStore,
  store,
}: ModalCartProps) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    handleClose();
  };
  const handleGoToStore = () => {
    handleClose();
    navigate("/store");
  };
  const tempStore = store;
  const movies = tempStore.slice(0, 5);
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
                      src={`${movie?.poster?.img_500}`}
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
                          movie.price * 0.91
                        ).toFixed(2)} $`}</h6>
                      </Col>
                      <Col>
                        <Button
                          variant="primary"
                          className="end-0"
                          onClick={() => removeMovieFromStore(movie._id)}
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
        <h5 className="pe-5 me-5">{`${tempStore.length} items in your cart`}</h5>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleGoToStore}>
          Go to Store
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export function Cart() {
  const { removeMovieFromStore, store } = useContext(GlobalContext);
  const [showCartModal, setShowCartModal] = useState(false);
  const handleShowCartModal = () => {
    setShowCartModal(true);
  };
  const handleCloseModal = () => {
    setShowCartModal(false);
  };
  return (
    <>
      <Button
        variant="outline-primary"
        className="position-relative rounded-circle ms-3 w-md h-md"
        id="store"
        onClick={handleShowCartModal}
      >
        <i className="position-absolute-center bi bi-cart-fill"></i>
        {store.length > 0 && (
          <span className="position-absolute top-0 end-0 bg-primary text-light rounded-circle h-50 w-50 d-flex align-items-center justify-content-center border border-1 small fw-lighter shadow">
            {store.length}
          </span>
        )}
      </Button>

      <ModalCart
        show={showCartModal}
        handleClose={handleCloseModal}
        removeMovieFromStore={removeMovieFromStore}
        store={store}
      />
    </>
  );
}
