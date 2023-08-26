import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPlayer from "react-player";
import {
  Col,
  Container,
  Image,
  Row,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { Film } from "../../configs/Model";
import { Loading } from "../../components/Loading/Loading";

export function FilmDetailView({ movie }: { movie: Film | undefined }) {
  const videoUrl = movie?.videos?.trailers[0]?.link || null;
  const [playerReady, setPlayerReady] = useState(false);
  const handlePlayerReady = () => {
    setPlayerReady(true);
  };
  if (!movie) {
    return <Loading />;
  }
  return (
    <Container className="p-0">
      <Container className="pt-5" fluid>
        <Row className="d-none d-md-block mt-5 mb-2">
          {videoUrl ? (
            <>
              {playerReady ? (
                <ReactPlayer
                  url={videoUrl}
                  className="rounded"
                  playing={true}
                  loop
                  muted
                  width="100%"
                />
              ) : (
                <Container className="bg-black d-flex align-items-center justify-content-center w-100 h-100">
                  <p className="text-center text-white">Loading video...</p>
                </Container>
              )}
              <ReactPlayer
                className="d-none"
                url={videoUrl}
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
        </Row>

        <Row className="mt-3">
          <Col className="order-1 col-lg-4 col-sm-12">
            <Card className="bg-secondary rounded">
              <Card.Title className="text-center mb-0 py-2 fs-2 bg-light-subtle">
                {movie.title}
              </Card.Title>
              <Card.Text>
                <Image
                  src={`${movie.poster.img_500}`}
                  className="h-100 w-100"
                />

                <ul className="list-unstyled fw-bold ps-2 mt-3">
                  <li className="fw-light">
                    <span className="fw-bold">
                      Director: {movie.directors[0].name}
                    </span>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Genres:</span>{" "}
                    {movie?.genres &&
                      movie?.genres.map((genre) => (
                        <>
                          <Link to="" key={`genre-${genre.id}`}>
                            {genre.name !== "" && genre.name}
                          </Link>{" "}
                        </>
                      ))}
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">
                      Release Date:
                      <span className="fw-light">
                        {" "}
                        {new Date(movie?.release_date).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </span>{" "}
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Rating:</span>{" "}
                    {movie.rating.toFixed(1)}
                  </li>
                </ul>
              </Card.Text>
            </Card>
          </Col>

          <Col className="order-2 col-lg-8 col-sm-12 my-md-3 my-lg-0">
            <Card className="bg-secondary rounded">
              <Card.Title className="ps-3 py-2 bg-light-subtle">
                Information
              </Card.Title>
              <Card.Body>
                <Row className="py-sm-2 py-md-0">
                  <Col className="col-md-2 text-center col-sm-12">
                    <h5 className="rounded border bg-secondary p-1">Score</h5>
                    <h3>{movie.rating.toFixed(1)}</h3>
                  </Col>

                  <Col className="">
                    <Row>
                      <div className="d-flex w-100 justify-content-around fs-1 p-1">
                        <h5>Ranked #1</h5>
                        <h5>Price: {movie.price} VND</h5>
                      </div>
                    </Row>
                  </Col>
                </Row>

                <Row className="d-flex mt-3">
                  <Button className="w-25 mx-2 text-center w-25">
                    <i className="bi bi-cart4 me-2" />
                    Add to cart
                  </Button>
     
                  <Button className="w-25 mx-2 text-center w-25">
                    <Link to="" className="text-decoration-none text-light">
                      <i className="bi bi-tv-fill me-2" />
                      Watch right now
                    </Link>
                  </Button>

                  <Button className="w-25 mx-2 text-center w-25">
                    <i className="bi bi-currency-dollar me-2" />
                    Buy
                  </Button>
                </Row>
              </Card.Body>
            </Card>

            <Card className="bg-secondary my-3 rounded">
              <Card.Title className="py-3 ps-3 bg-light-subtle">
                Sypnosis
              </Card.Title>
              <Card.Text>
                <p className="fs-6 p-3" style={{ textAlign: "justify" }}>
                  {movie.overview}
                </p>
              </Card.Text>
            </Card>

            <Card className=" bg-secondary my-3 rounded">
              <Card.Title className="p-3 bg-light-subtle">Actors</Card.Title>
              <Card.Text className="p-3">
                <hr className="" />

                <Row className="pb-0 d-flex justify-content-between">
                  <Col className="d-flex pe-0 col-4 w-auto">
                    <Image
                      src={
                        movie.casts[0].img
                          ? movie.casts[0].img.img_500 ||
                            movie.casts[0].img.img_1280 ||
                            "https://placehold.co/47x71"
                          : "https://placehold.co/47x71"
                      }
                      className="w-lg me-2 rounded"
                    />
                    <div>
                      <p>
                        <Link
                          to=""
                          className="mb-0 fw-bold text-primary text-decoration-none float-start"
                        >
                          {movie.casts[0].name}
                        </Link>
                      </p>
                      <small className="mt-0 float-start">
                        {movie.casts[0].crews[0].job
                          ? movie.casts[0].crews[0].job
                          : " "}
                      </small>
                    </div>
                  </Col>

                  <Col className="d-flex col-4 pe-0 w-auto me-2">
                    <div>
                      <p>
                        <Link
                          to=""
                          className="mb-0 fw-bold text-primary text-decoration-none float-end"
                        >
                          {movie.casts[1].name}
                        </Link>
                      </p>
                      <small className="mt-0 float-end">
                        {movie.casts[1].crews[0].job
                          ? movie.casts[1].crews[0].job
                          : " "}
                      </small>
                    </div>
                    <Image
                      src={
                        movie.casts[1].img
                          ? movie.casts[1].img.img_500 ||
                            movie.casts[1].img.img_1280 ||
                            "https://placehold.co/47x71"
                          : "https://placehold.co/47x71"
                      }
                      className="w-lg ms-2 rounded"
                    />
                  </Col>
                </Row>

                <hr className="" />

                <Row className="pb-0 d-flex justify-content-between mb-2">
                  <Col className="d-flex pe-0 col-4 w-auto">
                    <Image
                      src={
                        movie.casts[2].img
                          ? movie.casts[2].img.img_500 ||
                            movie.casts[2].img.img_1280 ||
                            "https://placehold.co/47x71"
                          : "https://placehold.co/47x71"
                      }
                      className="w-lg me-2 rounded"
                    />
                    <div>
                      <p>
                        <Link
                          to=""
                          className="mb-0 fw-bold text-primary text-decoration-none float-start"
                        >
                          {movie.casts[2].name}
                        </Link>
                      </p>
                      <small className="mt-0 float-start">
                        {movie.casts[2].crews[0].job
                          ? movie.casts[2].crews[0].job
                          : " "}
                      </small>
                    </div>
                  </Col>

                  <Col className="d-flex col-4 pe-0 w-auto me-2">
                    <div>
                      <p>
                        <Link
                          to=""
                          className="mb-0 fw-bold text-primary text-decoration-none float-end"
                        >
                          {movie.casts[3].name}
                        </Link>
                      </p>

                      <small className="mt-0 float-end">
                        {movie.casts[3].crews[0].job
                          ? movie.casts[3].crews[0].job
                          : " "}
                      </small>
                    </div>
                    <Image
                      src={
                        movie.casts[3].img
                          ? movie.casts[3].img.img_500 ||
                            movie.casts[3].img.img_1280 ||
                            "https://placehold.co/47x71"
                          : "https://placehold.co/47x71"
                      }
                      className="w-lg ms-2 rounded"
                    />
                  </Col>
                </Row>
                <hr className="" />
              </Card.Text>
            </Card>

            <Card className="bg-secondary my-3 rounded">
              <Card.Title className="p-3 mb-0 bg-light-subtle">
                Review
              </Card.Title>
              <Card.Text className="">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>

              <Button className="float-end m-2">Publish</Button>
            </Card.Text>
          </Card>

          <Card className="bg-secondary my-3 rounded">
            <Card.Title className="pt-2 ps-2">
              <Row className="w-auto mt-3">
                <Col className="d-flex col-4 pe-0 w-auto me-2">
                  <Image src="/logo.png" className="w-lg h-md me-2" />
                  <div>
                    <p className="mb-0 fw-bold">Vinh</p>

                    <small className="mt-0 fw-light fs-6">
                      April 12 at 2:28pm
                    </small>
                  </div>
                </Col>

                  <Col className="pt-2">
                    <i className="bi bi-trash float-end me-3 text-danger" />
                    <i className="bi bi-pencil float-end me-3 text-success" />
                  </Col>
                </Row>
              </Card.Title>

            <Card.Text>
              <p className="pt-2 ps-2">
                First of all, I have seen the original FMA and although it was
                very popular and original, the pacing and conclusion did not sit
                too well with me. Brotherhood is meant to be a remake of the
                original, this time sticking to the manga all the way through,
                but there were people who thought it would spoil the franchise.
                That myth should be dispelled, as there's only one word to
                describe this series - EPIC.12
              </p>
            </Card.Text>
          </Card>

          <Card className="bg-secondary my-3 rounded">
            <Card.Title className="pt-2 ps-2">
              <Row>
                <Col className="d-flex col-4 pe-0 w-auto me-2 mt-3">
                  <Image src="/logo.png" className="w-lg h-md me-2" />
                  <div>
                    <p className="mb-0 fw-bold">Vinh</p>

                    <small className="mt-0 fw-light fs-6">
                      April 12 at 2:28pm
                    </small>
                  </div>
                </Col>

                  <Col className="pt-2">
                    <i className="bi bi-trash float-end me-3 text-danger" />
                    <i className="bi bi-pencil float-end me-3 text-success" />
                  </Col>
                </Row>
              </Card.Title>
              <Card.Text>
                <p className="pt-2 ps-2">
                  Fullmetal Alchemist: Brotherhood gets an immense amount of
                  praise in the MAL community. Now this is just the opinion of
                  one guy. I'm certainly not the law of the land or anything.
                  However, I personally feel as though calling FMA:B a
                  masterpiece and the champion of all shows is a bit of a
                  stretch. 12
                </p>
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
