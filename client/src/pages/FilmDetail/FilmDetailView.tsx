import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { Edit } from "../../components/Edit";
import { ImageEdit } from "../../components/ImageEdit";
import { MultiEdit } from "../../components/MultiEdit";
import { api } from "../../utils/api";

type FilmDetailView = {
  movie: Film | undefined;
  editMode?: boolean;
};
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
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  useEffect(() => {
    if (editMode) {
      (async () => {
        setGenres((await api.get("/genres")).data);
        setActors((await api.get("/actors")).data);
        setDirectors((await api.get("/directors")).data);
      })();
    }
  }, []);

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
                  className="rounded-3"
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
            <Card className="bg-secondary rounded-3">
              <Card.Title className="text-center mb-0 py-2 fs-2 bg-light-subtle rounded-top-3">
                <Edit
                  editMode={editMode}
                  type="text"
                  name="title"
                  defaultValue={movie.title}
                  isRequired
                />
              </Card.Title>
              <Card.Text>
                <ImageEdit
                  editMode={editMode}
                  name="poster.img_500"
                  defaultValue={movie.poster.img_500}
                  isRequired
                  className="h-100 w-100"
                />

                <ul className="list-unstyled fw-bold ps-2 mt-3">
                  <li className="fw-light">
                    <span className="fw-bold">
                      Director:{" "}
                      <MultiEdit
                        editMode={editMode}
                        data={directors.map((director: any) => ({
                          id: director.name,
                          name: director.name,
                        }))}
                        name="director"
                        defaultValue={[
                          {
                            id: movie.directors[0].name,
                            name: movie.directors[0].name,
                          },
                        ]}
                        func={(genres: any) =>
                          genres.map((genre: any) => (
                            <>
                              <Link
                                className="text-decoration-none"
                                to={`/cast-detail/${movie?.directors[0].id}`}
                                key={`genre-${genre.id}`}
                              >
                                {genre.name !== "" && genre.name}
                              </Link>{" "}
                            </>
                          ))
                        }
                        isRequired
                      />
                    </span>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Genres:</span>{" "}
                    <MultiEdit
                      editMode={editMode}
                      data={genres}
                      name="genres"
                      defaultValue={movie?.genres}
                      func={(genres: any) =>
                        genres.map((genre: any) => (
                          <>
                            <Link
                              className="text-decoration-none"
                              to=""
                              key={`genre-${genre.id}`}
                            >
                              {genre.name !== "" && genre.name}
                            </Link>{" "}
                          </>
                        ))
                      }
                      isRequired
                    />
                    {/* <Link to="">Action</Link>, <Link to="">Adventure</Link>,{" "}
                      <Link to="">Drama</Link>, <Link to="">Fantasy</Link> */}
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Theme:</span>{" "}
                    <Link to="">Military</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">
                      Release Date:
                      <span className="fw-light">
                        {" "}
                        <Edit
                          editMode={editMode}
                          type="date"
                          name="relase_date"
                          defaultValue={movie?.release_date}
                          func={(x: any) =>
                            new Date(x).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          }
                          isRequired
                        />
                      </span>
                    </span>{" "}
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
            <Card className="bg-secondary rounded-3">
              <Card.Title className="py-3 ps-3 bg-light-subtle rounded-top-3">
                Information
              </Card.Title>
              <Card.Body>
                <Row className="py-sm-2 py-md-0">
                  <Col className="col-md-2 text-center col-sm-12">
                    <h5 className="rounded-3 border bg-secondary p-1">Score</h5>
                    <h3>
                      <Edit
                        editMode={editMode}
                        type="number"
                        name="rating"
                        defaultValue={movie.rating}
                        isRequired
                      />
                    </h3>
                  </Col>

                  <Col className="">
                    <Row>
                      <div className="d-flex w-100 justify-content-around fs-1 p-1">
                        <h5>Ranked #{filmRatingIndex}</h5>
                        <h5>
                          <Edit
                            editMode={editMode}
                            type="number"
                            name="price"
                            defaultValue={movie.price}
                            func={(x: any) => `Price: ${x} VND`}
                            isRequired
                          />
                        </h5>
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

            <Card className="bg-secondary my-3 rounded-3">
              <Card.Title className="py-3 ps-3 bg-light-subtle rounded-top-3">
                Sypnosis
              </Card.Title>
              <Card.Text>
                <p className="fs-6 p-3" style={{ textAlign: "justify" }}>
                  <Edit
                    editMode={editMode}
                    type="textarea"
                    name="overview"
                    defaultValue={movie.overview}
                    isRequired
                  />
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
                  very popular and original, the pacing and conclusion did not
                  sit too well with me. Brotherhood is meant to be a remake of
                  the original, this time sticking to the manga all the way
                  through, but there were people who thought it would spoil the
                  franchise. That myth should be dispelled, as there's only one
                  word to describe this series - EPIC.12
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
    );
  }
}
