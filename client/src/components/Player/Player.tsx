import React from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Form,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Player() {
  const location = useLocation();
  const movie = location?.state?.movie;
  const videoUrl = location?.state?.movie?.trailer?.key || null;
  console.log(location);
  const [playerReady, setPlayerReady] = React.useState(false);

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };
  return (
    <Container className="d-flex flex-column pt-5">
      <Row className="mt-4" id="main">
        <Col xs={8} id="left">
          <Container className="rounded overflow-hidden bg-black w-100" style={{height: "50vh"}}>
            {videoUrl ? (
              <>
                {playerReady && (
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoUrl}`}
                    className="rounded-top w-100 h-100"
                    playing={true}
                    loop
                    controls
                  />
                )}
                <ReactPlayer
                  className="d-none"
                  url={`https://www.youtube.com/watch?v=${videoUrl}`}
                  onReady={handlePlayerReady}
                />
              </>
            ) : (
              <Container className="d-flex align-items-center justify-content-center w-100 h-100">
                <p className="text-center text-muted">
                  Sorry, this video is unavailable
                </p>
              </Container>
            )}
          </Container>
          <Row className="pt-2 pb-2">
            <h2>{movie.name}</h2>
          </Row>
          <Row className="p-2 mb-5 bg-secondary rounded w-100">
            <h4>Published on {movie.release_date}</h4>
            <p>{movie.overview}</p>
            <Button variant="link" className="w-100 text-decoration-none">
              <span>See More</span>
            </Button>
          </Row>
          <Row className="p-2 mb-5 bg-secondary rounded w-100">
            <Container className="d-flex">
              <h4>Comment</h4>
            </Container>
            <Row>
              <Container className="text-dark">
                <Card>
                  <Card.Body className="p-3">
                    <Row className="d-flex flex-start w-100">
                      <Col xs={1}>
                        <Row xs={6}>
                          <Image
                            className="rounded-circle shadow-1-strong me-3 w-100 h-100"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                            alt="avatar"
                          />
                        </Row>
                      </Col>
                      <Col className="w-auto">
                        <h5>Add a comment</h5>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="textAreaExample"
                          >
                            <Form.Control
                              as="textarea"
                              rows={2}
                              placeholder="What is your view?"
                            />
                          </Form.Group>
                          <div className="d-flex justify-content-end mt-3">
                            <Button
                              variant="link"
                              className="me-3 text-decoration-none"
                            >
                              Danger
                            </Button>
                            <Button
                              variant="secondary"
                              className="rounded-pill"
                            >
                              Send
                            </Button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Container>
            </Row>
            <Row>
              <Container className="my-3 py-3">
                <Row className="d-flex justify-content-center">
                  <Col>
                    <Container>
                      <h4 className="mb-0">Recent comments</h4>
                      <p className="fw-light mb-4 pb-2">
                        Latest Comments section by users
                      </p>
                      <Card className="p-4">
                        <Container className="d-flex flex-start">
                          <Image
                            className="rounded-circle shadow-1-strong me-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                            alt="avatar"
                            width="60"
                            height="60"
                          />
                          <Container>
                            <h6 className="fw-bold mb-1">Maggie Marsh</h6>
                            <Container className="d-flex align-items-center mb-3">
                              <p className="mb-0">
                                March 07, 2021
                                <Badge bg="success" className="ms-2">
                                  Success
                                </Badge>
                              </p>
                              <Button
                                variant="link"
                                className="text-decoration-none"
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="link"
                                className="text-decoration-none"
                              >
                                <i className="bi bi-arrow-clockwise"></i>
                              </Button>
                              <Button
                                variant="link"
                                className="text-decoration-none"
                              >
                                <i className="bi bi-heart-fill"></i>
                              </Button>
                            </Container>
                            <p className="mb-0">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it.
                            </p>
                          </Container>
                        </Container>
                      </Card>

                      <hr className="my-0" />
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Row>
        </Col>
        <Col
          className="p-3 bg-secondary rounded"
          id="right"
          style={{ minHeight: "fit-content" }}
        >
          <Container className="d-flex justify-content-between mb-2">
            <h5>Up next</h5>
            <h5>Autoplay</h5>
          </Container>
          <Row className="d-flex mb-2 p-0">
            <Col xs={4}>
              <Image
                className="w-100 h-100"
                src="http://i.ytimg.com/vi/ZSFDm3UYkeE/default.jpg"
                alt=""
              />
            </Col>
            <Col>
              <h5>Contributing to Open Source Part I: The Easy Way</h5>
              <span className="d-block">by The Odin Project</span>
              <span className="d-block">7,372 views</span>
            </Col>
          </Row>

          <hr />

          <Row className="d-flex mb-2 p-0">
            <Col xs={4}>
              <Image
                className="w-100 h-100"
                src="http://i.ytimg.com/vi/ZSFDm3UYkeE/default.jpg"
                alt=""
              />
            </Col>
            <Col>
              <h5>Contributing to Open Source Part I: The Easy Way</h5>
              <span className="d-block">by The Odin Project</span>
              <span className="d-block">7,372 views</span>
            </Col>
          </Row>

          <Row className="d-flex mb-2 p-0">
            <Col xs={4}>
              <Image
                className="w-100 h-100"
                src="http://i.ytimg.com/vi/ZSFDm3UYkeE/default.jpg"
                alt=""
              />
            </Col>
            <Col>
              <h5>Contributing to Open Source Part I: The Easy Way</h5>
              <span className="d-block">by The Odin Project</span>
              <span className="d-block">7,372 views</span>
            </Col>
          </Row>

          <Button variant="link" className="w-100 text-decoration-none">
            <span>
              <strong>SHOW MORE</strong>
            </span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
