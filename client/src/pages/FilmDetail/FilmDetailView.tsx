import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Card, Button } from "react-bootstrap";
import { Loading } from "../../components/Loading/Loading";
import { Edit } from "../../components/Edit";
import { ImageEdit } from "../../components/ImageEdit";
import { MultiEdit } from "../../components/MultiEdit";
import { api } from "../../utils/api";
import Review from "../../components/Review";
import { VideoEdit } from "../../components/VideoEdit";

type FilmDetailProps = any;

export function FilmDetailView({
  movie,
  filmRatingIndex,
  editMode,
  setTitle,
  setDate,
  setRating,
  setPrice,
  setOverview,
  setPoster,
  setGenre,
  setCast,
  setDirector,
  setTrailer,
  setVideo,
  onSubmit,
}: FilmDetailProps) {
  const videoUrl =
    movie?.videos?.trailers[0]?.link || movie?.videos?.video_full;
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    if (editMode) {
      (async () => {
        setGenres((await api.get("/genres")).data);
        setActors(
          (await api.get("/actors")).data.filter(
            (v: any, i: number, a: any) => {
              return a.indexOf(a.find((x: any) => x.id === v.id)) === i;
            }
          )
        );
        setDirectors(
          (await api.get("/directors")).data.filter(
            (v: any, i: number, a: any) => {
              return a.indexOf(a.find((x: any) => x.id === v.id)) === i;
            }
          )
        );
      })();
    }
  }, []);

  if (!movie) {
    return <Loading />;
  } else {
    return (
      <Container className="p-0">
        <Row className="d-none d-md-block mb-2">
          {editMode && (
            <VideoEdit
              editMode={editMode}
              name="video"
              defaultValue={movie?.videos?.video_full}
              isRequired
              className="rounded-3"
              playing={true}
              loop
              muted
              width="100%"
              onChange={(x: any) => setVideo(x)}
            />
          )}

          {videoUrl && (
            <VideoEdit
              editMode={editMode}
              name="trailer"
              defaultValue={videoUrl}
              isRequired
              className="rounded-3"
              playing={true}
              loop
              muted
              onChange={(x: any) => setTrailer(x)}
              width="100%"
            />
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
                  onChange={(x: any) => setTitle(x)}
                  isRequired
                />
              </Card.Title>
              <Card.Text>
                <ImageEdit
                  editMode={editMode}
                  name="poster.img_500"
                  defaultValue={movie.poster?.img_500}
                  isRequired
                  className="h-100 w-100"
                  onChange={(x: any) => setPoster(x)}
                />

                <ul className="list-unstyled fw-bold ps-2 mt-3">
                  <li className="fw-light">
                    <span className="fw-bold">
                      Director:{" "}
                      <MultiEdit
                        editMode={editMode}
                        data={directors.map((director: any) => ({
                          id: director.id,
                          name: director.name,
                        }))}
                        name="director"
                        defaultValue={[
                          {
                            id: movie?.directors[0]?.id,
                            name: movie?.directors[0]?.name,
                          },
                        ]}
                        func={(genres: any) =>
                          genres.map((genre: any) => (
                            <>
                              <Link
                                className="text-decoration-none"
                                to={`/cast-detail/${movie?.directors[0]?.id}`}
                                key={`genre-${genre?.id}`}
                              >
                                {genre?.name !== "" && genre?.name}
                              </Link>{" "}
                            </>
                          ))
                        }
                        onChange={(x: any) => setDirector(x)}
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
                      onChange={(x: any) => setGenre(x)}
                      isRequired
                    />
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
                          onChange={(x: any) => setDate(x)}
                          isRequired
                        />
                      </span>
                    </span>{" "}
                  </li>
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
                        onChange={(x: any) => setRating(x)}
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
                            onChange={(x: any) => setPrice(x)}
                            isRequired
                          />
                        </h5>
                      </div>
                    </Row>
                  </Col>
                </Row>

                <Row className="d-flex mt-3">
                  <Button className="w-25 mx-2">
                    <Link to="" className="text-decoration-none text-light">
                      <i className="bi bi-cart me-2" />
                      Add to Cart
                    </Link>
                  </Button>

                  <Button className="w-25 mx-2 text-center w-25">
                    <Link to="" className="text-decoration-none text-light">
                      <i className="bi bi-tv-fill me-2" />
                      Watch now
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
                    onChange={(x: any) => setOverview(x)}
                    isRequired
                  />
                </p>
              </Card.Text>
            </Card>

            <Card className=" bg-secondary my-3 rounded-3">
              <Card.Title className="p-3 bg-light-subtle rounded-top-3">
                Characters
              </Card.Title>
              <Card.Text className="px-5 py-2">
                <div className="mb-3">
                  {movie && movie.casts && actors && actors.length !== 0 ? (
                    <>
                      <MultiEdit
                        editMode={editMode}
                        data={actors.map((actor: any) => ({
                          id: actor.id,
                          name: actor.name,
                        }))}
                        defaultValue={movie.casts.filter(
                          (cast: any) => cast != null
                        )}
                        name="actor"
                        func={(casts: any) => {
                          casts = casts.map((cast: any) =>
                            typeof cast.id !== "number"
                              ? Number(cast.id)
                              : cast.id
                          );
                          casts = actors.filter((actor: any) =>
                            casts.includes(actor.id)
                          );

                          return casts.map((cast: any) => (
                            <>
                              <Row className="pb-0 d-flex justify-content-between">
                                <Col className="d-flex pe-0 col-4 w-auto">
                                  <Image
                                    key={cast.id}
                                    className="w-lg me-2 rounded"
                                    src={
                                      cast.img
                                        ? cast.img.img_500 || cast.img.img_1280
                                        : "https://placehold.co/47x71"
                                    }
                                  />
                                  <p className="mb-0 fw-bold">{cast.name}</p>
                                </Col>
                              </Row>
                              <hr />
                            </>
                          ));
                        }}
                        placeholder="Press enter to add a new actor"
                        onChange={(x: any) => setCast(x)}
                        isRequired
                      />
                    </>
                  ) : (
                    <span></span>
                  )}
                </div>
              </Card.Text>
            </Card>
            <Review filmId={movie.id} />
          </Col>
        </Row>
        {editMode && (
          <Button
            className="position-fixed"
            style={{ top: "50%", right: "0%" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        )}
      </Container>
    );
  }
}
