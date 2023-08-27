import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPlayer from "react-player";
import {
  Col,
  Container,
  Image,
  Row,
  Card,
  Button,
  Carousel,
} from "react-bootstrap";
import { Film, Person } from "../../configs/Model";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import Review from "../../components/Review";

interface FilmDetailProps {
  movie: Film | undefined;
  filmRatingIndex: number | null;
}

export function FilmDetailView({ movie, filmRatingIndex }: FilmDetailProps) {
  const navigate = useNavigate();
  const videoUrl =
    movie?.videos?.trailers[0]?.link || movie?.videos?.video_full;
  const [playerReady, setPlayerReady] = useState(false);
  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  const getCharacters = (cast: Person) => {
    const filteredCrew = cast.crews.filter((crew) => crew.id === movie?.id);
  };

  if (!movie) {
    return <Loading />;
  } else {
    return (
      <Container className="p-0">
        <Row className="d-none d-md-block mb-2">
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
              <p className="text-center text-muted z-">
                Sorry, this video is unavailable
              </p>
            </Container>
          )}
        </Row>

        <Row className="">
          <Col className="order-1 col-lg-4 col-sm-12">
            <Card className="bg-secondary rounded">
              <Card.Title className="text-center mb-0 py-2 fs-2 bg-light-subtle">
                {movie?.title}
              </Card.Title>
              <Card.Text>
                <Carousel data-bs-theme="dark">
                  <Carousel.Item>
                    <Image
                      src="https://placehold.co/470x200"
                      className="h-100 w-100"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      src="https://placehold.co/470x200"
                      className="h-100 w-100"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      src="https://placehold.co/470x200"
                      className="h-100 w-100"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                </Carousel>

                <ul className="list-unstyled fw-bold ps-2 mt-3">
                  <li className="fw-light">
                    <span className="fw-bold">Type</span>: TV
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Status:</span> Finished Airing
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Aired:</span>{" "}
                    {new Date(movie?.release_date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Director:</span>{" "}
                    <Link to={`/cast-detail/${movie?.directors[0].id}`}>
                      {movie?.directors[0].name}
                    </Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Broadcast:</span> Sundays at 17:00
                    (JST)
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Producers:</span>{" "}
                    <Link to="">Aniplex </Link>, <Link to="">Square Enix</Link>,{" "}
                    <Link to="">Mainichi Broadcasting System</Link>,{" "}
                    <Link to="">Studio Moriken</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Licensors:</span>{" "}
                    <Link to="">Funimation</Link>,{" "}
                    <Link to="">Aniplex of America</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Source:</span> Manga
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
                    {/* <Link to="">Action</Link>, <Link to="">Adventure</Link>,{" "}
                      <Link to="">Drama</Link>, <Link to="">Fantasy</Link> */}
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Theme:</span>{" "}
                    <Link to="">Military</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Duration:</span> 24min. per ep
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Rating:</span>{" "}
                    {movie?.rating.toFixed(1)}
                  </li>
                </ul>
              </Card.Text>
            </Card>

            <Card className="mt-3 bg-secondary rounded">
              <Card.Title className="text-center py-2 bg-light-subtle">
                Statistics
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled fw-bold ps-2">
                  <li>Ranked: #{filmRatingIndex}</li>
                  <li>Popularity: #3</li>
                  <li>Members: 3,192,363</li>
                  <li>Favorites: 218,364</li>
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
                    <h3>{movie?.rating.toFixed(2)}</h3>
                  </Col>

                  <Col className="">
                    <Row>
                      <div className="d-flex w-100 justify-content-between fs-1 p-1">
                        <h5>Ranked #{filmRatingIndex}</h5>
                        <h5>Popularity #1</h5>
                        <h5>Member 3,192,411</h5>
                      </div>
                    </Row>

                    <Row>
                      <p>
                        <Link to="">Spring 2009</Link> | <Link to="">TV</Link> |{" "}
                        <Link to="">Bones</Link>
                      </p>
                    </Row>
                  </Col>
                </Row>

                <Row className="d-flex mt-3">
                  <Button className="w-25 mx-2">Add to list</Button>
                  <Button className="w-25 mx-2">
                    Review <i className="bi bi-star-fill ps-1" />
                  </Button>
                  <Button className="w-25 mx-2">
                    Episode: 0/64 <i className="bi bi-plus-circle ps-1" />
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
                  {movie?.overview}
                </p>
              </Card.Text>
            </Card>

            <Card className="bg-secondary my-3 rounded">
              <Card.Title className="p-3 bg-light-subtle">
                Related Film
              </Card.Title>
              <Card.Text>
                <ul className="p-3 list-unstyled">
                  <li className="fw-light">
                    <span className="fw-bold">Adalitation:</span> Fullmetal
                    Alchemist
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Alternative version:</span>{" "}
                    Fullmetal Alchemist
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Side story:</span>{" "}
                    <Link to="">Fullmetal Alchemist: Brotherhood Specials</Link>
                    ,{" "}
                    <Link to="">
                      Fullmetal Alchemist: The Sacred Star of Milos
                    </Link>
                  </li>
                </ul>
              </Card.Text>
            </Card>

            <Card className=" bg-secondary my-3 rounded">
              <Card.Title className="p-3 bg-light-subtle">
                Characters & Voice Actors
              </Card.Title>
              <Card.Text className="p-3">
                <div className="d-flex justify-content-between">
                  <small>Characters</small>
                  <small>Actors</small>
                </div>

                <hr />

                {movie.casts &&
                  movie.casts.map(
                    (cast, idx) =>
                      cast && (
                        <>
                          <Row className="pb-0 d-flex justify-content-between">
                            <Col className="d-flex pe-0 col-4 w-auto">
                              <Image
                                key={`${cast.id}${idx}`}
                                className="w-lg me-2 rounded"
                                src={
                                  cast.img
                                    ? cast.img.img_500 || cast.img.img_1280
                                    : "https://placehold.co/47x71"
                                }
                              />
                              <div>
                                <Link to="" className="text-decoration-none">
                                  <p className="mb-0 fw-bold">{cast.name}</p>
                                </Link>
                              </div>
                            </Col>
                            <Col className="d-flex col-4 pe-0 w-auto me-2">
                              <div>
                                <Link to="" className="text-decoration-none">
                                  <p className="mb-0 fw-bold">Park Romi</p>
                                </Link>
                                <small className="mt-0">Japanese</small>
                              </div>
                              <Image
                                src="/logo.png"
                                className="w-lg h-md ms-2"
                              />
                            </Col>
                          </Row>
                          <hr />
                        </>
                      )
                  )}
              </Card.Text>
            </Card>
            <Review filmId={movie.id} />
          </Col>
        </Row>
      </Container>
    );
  }
}
