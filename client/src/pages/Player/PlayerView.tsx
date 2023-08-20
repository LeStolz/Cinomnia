import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { Film } from "../../configs/Model";
import { Comment } from "../../components/Comment/Comment";
import CircularRate from "../../components/CircularRate/CircularRate";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Image,
  Card,
  Form,
  Badge,
} from "react-bootstrap";
import "./Player.scss";
import { Loading } from "../../components/Loading/Loading";

interface PlayerProps {
  movie: Film | undefined;
}

export function PlayerView({ movie }: PlayerProps) {
  const navigate = useNavigate();
  const videoUrl = movie?.videos?.video_full || null;
  const [subscribed, setSubscribed] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  const handleDuration = (time: number) => {
    setDuration(time);
  };
  if (!movie) {
    return <Loading />;
  }
  return (
    <Container fluid className="d-flex flex-column p-0 pt-5 h-100 ">
      <Image
        className="position-fixed top-0 start-0 z-0 object-fit-cover w-100 h-100"
        src={`${movie.poster.img_1280}`}
      />
      {/* <Container className="blur-img"></Container> */}
      <Container fluid className="position-relative z-1 mt-3 p-0">
        <Container fluid className="blur-img pt-5">
          <Container>
            <Row>
              <Col xs={12} sm={12} md={6} lg={5}>
                <Image
                  className="rounded w-100 "
                  src={`${movie?.poster.img_1280}`}
                  alt="movie"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={7}>
                <h1 className="title">{movie.title}</h1>
                <CircularRate progress={movie.rating} />
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <Button
                      key={`genre-${genre.id}`}
                      className=" rounded-pill me-1"
                    >
                      {genre.name !== "" && genre.name}
                    </Button>
                  ))}
                <h5 className="fw-normal mb-3 overview-detail overflow-hidden">
                  {movie.overview}
                </h5>
                <Container className="mb-3">
                  <Button
                    variant="dark"
                    title="Add To Watchlist"
                    className="position-relative rounded-circle w-lg h-lg me-3"
                  >
                    <i className="text-primary position-absolute-center bi bi-heart"></i>
                  </Button>
                  <Button
                    size="lg"
                    variant="primary"
                    className="position-relative rounded"
                    onClick={() => navigate(`/detail/${movie.id}`)}
                  >
                    <b>More Infomation</b>
                  </Button>
                </Container>
                <Container fluid>
                  <h2>CAST</h2>
                  {/* <CastSlider data={movie.casts} />
                   */}
                  <Row>
                    {movie.casts &&
                      movie.casts.map(
                        (cast, idx) =>
                          cast &&
                          cast.img && (
                            <Col
                              className="cast-items position-relative overflow-hidden p-0"
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                            >
                              <Image
                                key={`cast-${idx}`}
                                className="rounded w-100 h-auto"
                                src={
                                  cast.img.img_500
                                    ? cast.img.img_500
                                    : cast.img.img_1280
                                }
                              />
                              <Container
                                fluid
                                className="cast-name-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded"
                              >
                                <p className="text-truncate">
                                  {cast ? cast.name : "undefined"}
                                </p>
                              </Container>
                            </Col>
                          )
                      )}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid className="bg-secondary pt-5 p-0 position-relative">
          <Container
            className="rounded overflow-hidden bg-black w-100 p-0"
            style={{
              height: "70vh",
            }}
          >
            {videoUrl ? (
              <>
                {playerReady ? (
                  <ReactPlayer
                    url={
                      movie.videos.video_full
                        ? `${movie.videos.video_full}`
                        : `${movie.videos.trailers[0].link}`
                    }
                    className="rounded-top"
                    playing={true}
                    loop
                    controls
                    onDuration={handleDuration}
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <Container className="d-flex align-items-center justify-content-center w-100 h-100">
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
          </Container>
          <Container className="pt-2 pb-2">
            {duration > 0 && (
              <p className="text-center text-white">{`Duration: ${duration}`}</p>
            )}
            <h3>
              <b>{movie.title}</b> ({new Date(movie.release_date).getFullYear()}
              )
            </h3>
            <Container fluid className="p-0 d-flex align-items-center">
              <Image
                className="rounded-circle shadow-1-strong me-3"
                src={
                  movie.directors[0].img
                    ? movie.directors[0].img.img_500 ||
                      movie.directors[0].img.img_1280 ||
                      "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
                    : "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
                }
                alt="avatar"
                width="50"
                height="50"
              />
              <Container fluid className="p-0 d-flex justify-content-between">
                <Container
                  fluid
                  className="p-0 d-flex align-items-center justify-content-start"
                >
                  <Container fluid className="p-0 m-0 object-fit-contain">
                    <h5>
                      <b>{movie.directors[0].name}</b>
                    </h5>
                    <h6>
                      {new Date(movie.directors[0].birthday).toLocaleDateString(
                        "en-GB"
                      )}
                    </h6>
                  </Container>
                  <Container>
                    <Button
                      variant={subscribed ? "secondary" : "primary"}
                      onClick={handleSubscribe}
                      className="position-relative rounded-pill"
                    >
                      {subscribed ? (
                        <>
                          <i className="position-absolute-start bi bi-bell me-2"></i>
                          Subscribed
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </Button>
                  </Container>
                </Container>
                <Container className="d-flex align-items-center justify-content-end">
                  <ButtonGroup className="rounded-pill me-1">
                    <Button
                      variant="primary"
                      className="border position-relative rounded-start-pill flex-fill"
                    >
                      <i className="position-absolute-start bi bi-hand-thumbs-up"></i>
                      {movie.id}
                    </Button>
                    <Button
                      variant="primary"
                      className="border border-start-1 ps-5 position-relative rounded-end-pill flex-fill"
                    >
                      <i className="position-absolute-center bi bi-hand-thumbs-down"></i>
                    </Button>
                  </ButtonGroup>
                  <Button
                    variant="primary"
                    className="ms-1 position-relative rounded-pill"
                  >
                    <i className="position-absolute-start bi bi-link-45deg me-2"></i>
                    Share
                  </Button>
                </Container>
              </Container>
            </Container>
          </Container>

          {/* <Container className="p-2 border border-1 mb-5 bg-secondary rounded shadow">
          <h6>
            Published on{" "}
            {new Date(movie.release_date).toLocaleDateString("en-GB")}
          </h6>
          <p>{movie.overview}</p>
          <Button variant="link" className="w-100 text-decoration-none">
            <span>See More</span>
          </Button>
        </Container> */}
        <Container className="p-2 border border-1 bg-secondary rounded shadow pb-5">
          <Comment />
        </Container>
        </Container>
      </Container>
    </Container>
  );
}
