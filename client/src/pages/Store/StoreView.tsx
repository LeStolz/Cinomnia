import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Film } from "../../configs/Model";
import { useNavigate } from "react-router-dom";
import "./Store.scss";

interface StoreProps {
  store: Film[];
  handleClose: (id: string) => void;
  buyMovie: (movieData: Film, status: string) => void;
}

export function StoreView({ store, handleClose, buyMovie }: StoreProps) {
  const navigate = useNavigate();
  const totalRating = store.reduce((accumulator: number, movie: Film) => {
    return accumulator + movie.rating;
  }, 0);

  const handleGoToCheckout = async () => {
    store.forEach((movie: Film) => {
      buyMovie(movie, "bought");
      handleClose(movie._id);
    });
    navigate("/payment");
  };

  return (
    <Container className="p-0">
      <Row className="mt-3">
        <Col xs={12} sm={12} md={12} lg={8}>
          {/* search */}
          <Container
            fluid
            className="search-container bg-secondary border border-1 p-3 rounded mb-3 position-sticky top-0"
            id="search"
          >
            <Form>
              <Form.Group className="mb-3" controlId="formBasicSearch">
                <Row>
                  <Form.Label className="h4">
                    Search by product or part number
                  </Form.Label>
                </Row>
                <Row className="d-flex">
                  <Col xs={6}>
                    <Form.Control
                      type="string"
                      placeholder="Enter product name or part no."
                    />
                  </Col>
                  <Col>
                    <Form.Select>
                      <option>Text Input</option>
                      <option>Number</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Button
                      className="w-100 rounded-pill"
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Container>
          {/* movie */}
          {store.length > 0 ? (
            <Container
              fluid
              className="movie-container bg-secondary border border-1 p-4 rounded mb-3"
            >
              {store.map((movie: Film, index: number) => (
                <React.Fragment key={index}>
                  <Row className="mb-3 p-3 rounded shadow-sm">
                    <Col xs={4}>
                      <Image
                        src={`${movie.poster.img_500}`}
                        className="rounded w-100 h-auto"
                      />
                    </Col>
                    <Col>
                      <Row className="p-0">
                        <Col xs={8}>
                          <ul className="d-flex text-white p-0 m-0 genre-list fw-lighter fs-6 list-unstyled">
                            {movie.genres &&
                              movie.genres.map((genre) => (
                                <li key={`genre-${genre.id}`} className="me-1">
                                  {genre.name !== "" && genre.name}
                                </li>
                              ))}
                          </ul>
                          {/* <span className="text-right">{movie.title}</span> */}
                          <h4 className="text-success movie-name overflow-hidden">
                            {movie.title}
                          </h4>
                          <span className="text-right">
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                        </Col>
                        <Col className="d-flex flex-column align-items-end">
                          <span className="text-primary text-right">{`$${(
                            movie.rating * 1
                          ).toFixed(2)},00`}</span>
                          <p className="text-primary h6">{`$${(
                            movie.rating * 1.25
                          ).toFixed(2)},00`}</p>
                        </Col>
                      </Row>
                      <Row className="p-0 d-flex justify-content-between">
                        <Col>
                          <Form.Select>
                            <option>Buy</option>
                            <option>Rent</option>
                            <option>Use Voucher</option>
                          </Form.Select>
                        </Col>
                        <Col className="p-0 d-flex justify-content-end">
                          <Button
                            variant="link"
                            className="text-decoration-none"
                            onClick={() => handleClose(movie._id)}
                          >
                            <i className="bi bi-trash-fill me-1"></i>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </React.Fragment>
              ))}
            </Container>
          ) : (
            <h4>No movies in your Store! Add some!</h4>
          )}
        </Col>
        <Col xs={12} sm={12} md={12} lg={4}>
          <Row>
            {/* promotion */}
            <Col
              xs={6}
              sm={6}
              md={6}
              lg={12}
              className=" bg-secondary border border-1 p-3 rounded mb-2"
            >
              <Form>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Row>
                    <Form.Label className="h6 text-success">
                      Enter promotion code
                    </Form.Label>
                  </Row>
                  <Row>
                    <Col xs={6} sm={6} md={6} lg={8}>
                      <Form.Control
                        type="string"
                        placeholder="Enter promotion code."
                      />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={4}>
                      <Button
                        className="rounded-pill ps-4 pe-4 w-100"
                        variant="primary"
                        type="submit"
                      >
                        Apply
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Button variant="link" className="text-decoration-none">
                        <i className="bi bi-download me-1"></i>
                        Download Cart
                      </Button>
                      <Button variant="link" className="text-decoration-none">
                        <i className="bi bi-trash-fill me-1"></i>
                        Remove Cart
                      </Button>
                    </Col>
                    <Row></Row>
                  </Row>
                </Form.Group>
              </Form>
            </Col>
            {/* sumary */}
            <Col
              xs={6}
              sm={6}
              md={6}
              lg={12}
              className=" bg-secondary border border-1 ps-4 pe-4 pt-3 rounded mb-2"
            >
              <Row>
                <Container className="d-flex justify-content-between">
                  <span>Discount:</span>
                  <span>$.....</span>
                </Container>
                <Container className="d-flex justify-content-between">
                  <h5>Total Price:</h5>
                  <h5 className="text-primary text-right">{`$${(
                    totalRating * 1.25
                  ).toFixed(2)},00`}</h5>
                </Container>
              </Row>
              <Row>
                <Col xs={6} sm={6} md={6} lg={12}>
                  <Button
                    className="w-100 rounded-pill mt-3"
                    variant="primary"
                    onClick={handleGoToCheckout}
                  >
                    Go to checkout
                  </Button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={12}>
                  <Button
                    className="w-100 rounded-pill mt-3"
                    variant="outline-primary"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </Button>
                </Col>
              </Row>
              <Row>
                <Button
                  className="w-100 rounded-pill mt-2 mb-2 text-decoration-none"
                  variant="link"
                >
                  <i className="bi bi-credit-card-2-back-fill me-1"></i>
                  Change Payment
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
