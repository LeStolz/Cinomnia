import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { Film, User } from "../../configs/Model";
import { useFilm } from "../../contexts/FilmContext";
import ReviewForm from "../../components/Review";
import CircularRate from "../../components/CircularRate/CircularRate";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Loading } from "../../components/Loading/Loading";
import { GlobalContext } from "../../contexts/GlobalState";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Player.scss";

interface PlayerProps {
  movieData: Film | undefined;
  relatedFilms: Film[] | undefined;
  progress: string | undefined;
  updateFilmStatus: (movieData: Film, status: string) => void;
  updateFilmDuration: (filmId: string, duration: number) => void;
}

export function PlayerView({
  movieData,
  relatedFilms,
  progress,
  updateFilmStatus,
  updateFilmDuration,
}: PlayerProps) {
  const { addMovieToWatchlist, removeMovieFromWatchlist, watchlist } =
    useContext(GlobalContext);
  const [playerReady, setPlayerReady] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  const playerRef = useRef<ReactPlayer | null>(null);
  const { addFilmToWishlist, removeFilmFromWishlist } = useFilm();
  if (!movieData) {
    return <Loading />;
  } else {
    const isMovieInWatchlist = watchlist.some(
      (movie: Film) => movie._id === movieData._id
    );
    const videoUrl = movieData?.videos?.video_full || null;

    const handleDuration = (time: number) => {
      setDuration(time);
    };

    const handleSubscribe = () => {
      setSubscribed(!subscribed);
    };
    const handlePlayerReady = () => {
      setPlayerReady(true);
      let savedProgress = 0;
      if (playerRef.current && progress) {
        savedProgress = parseFloat(progress);
        playerRef.current.seekTo(savedProgress, "seconds");
      }
      updateFilmStatus(movieData, "watching");
    };
    const handleEnded = async () => {
      updateFilmStatus(movieData, "watched");
      // if (playerRef.current) {
      //   const currentTime = playerRef.current.getCurrentTime();
      //   const filmId = movieData._id;
      //   const filmDuration = duration;
      //   const savedProgress = currentTime / filmDuration;
      //   sessionStorage.setItem(`progress-${filmId}`, savedProgress.toString());
      //   updateFilmDuration(filmId, filmDuration);
      // }
    };

    const handleProgress = (progress: { played: number }) => {
      if (playerRef.current) {
        const currentTime = progress.played * duration;
        sessionStorage.setItem(
          `progress-${movieData.id}`,
          currentTime.toString()
        );
        // updateFilmDuration(movieData._id, currentTime);
      }
    };

    const handleWatchlist = () => {
      if (isMovieInWatchlist) {
        removeFilmFromWishlist(movieData);
        removeMovieFromWatchlist(movieData._id);
      } else {
        addFilmToWishlist(movieData, "wishlist");
        addMovieToWatchlist(movieData);
      }
    };

    return (
      <Container fluid className="d-flex flex-column p-0 pt-5 h-100 ">
        <Image
          className="position-fixed top-0 start-0 z-0 object-fit-cover w-100 h-100"
          src={`${movieData.poster.img_1280}`}
        />
        <Container fluid className="position-relative z-1 mt-3 p-0">
          <Container fluid className="blur-img pt-5">
            <Container>
              <Row>
                <Col xs={12} sm={12} md={6} lg={5}>
                  <Swiper
                    effect={"flip"}
                    grabCursor={true}
                    loop={true}
                    modules={[EffectFlip]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <Image
                        className="rounded w-100 "
                        src={`${movieData?.poster.img_1280}`}
                        alt="movie"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        className="rounded w-100 "
                        src={`${movieData?.poster.img_1280}`}
                        alt="movie"
                      />
                    </SwiperSlide>
                  </Swiper>
                </Col>
                <Col xs={12} sm={12} md={6} lg={7}>
                  <h1 className="title">{movieData.title}</h1>
                  <CircularRate progress={movieData.rating} />
                  {movieData.genres &&
                    movieData.genres.map((genre) => (
                      <Button
                        key={`genre-${genre.id}`}
                        className=" rounded-pill me-1"
                      >
                        {genre.name !== "" && genre.name}
                      </Button>
                    ))}
                  <h5 className="fw-normal mb-3 overview-detail overflow-hidden">
                    {movieData.overview}
                  </h5>
                  <Container className="mb-3">
                    <Button
                      variant={isMovieInWatchlist ? "dark" : "primary"}
                      title={
                        isMovieInWatchlist
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"
                      }
                      className={`position-relative rounded-circle w-lg h-lg me-3 ${
                        isMovieInWatchlist
                          ? "text-primary border border-2 border-shadow"
                          : ""
                      }`}
                      onClick={handleWatchlist}
                    >
                      <i
                        className={`position-absolute-center ${
                          isMovieInWatchlist
                            ? "bi bi-heart-fill"
                            : "bi bi-heart"
                        }`}
                      ></i>
                    </Button>
                    <Button
                      size="lg"
                      variant="primary"
                      className="position-relative rounded"
                      onClick={() => navigate(`/detail/${movieData.id}`)}
                    >
                      <b>More Infomation</b>
                    </Button>
                  </Container>
                  <h2>CAST</h2>
                  <Container fluid className="overflow-hidden">
                    <Swiper spaceBetween={1} slidesPerView={3}>
                      {movieData.casts &&
                        movieData.casts.map(
                          (cast, idx) =>
                            cast &&
                            cast.img && (
                              <SwiperSlide
                                key={idx}
                                className="cast-items position-relative overflow-hidden p-0"
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
                              </SwiperSlide>
                            )
                        )}
                    </Swiper>
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
                      ref={playerRef}
                      url={movieData.videos.video_full}
                      className="rounded-top"
                      playing={true}
                      controls
                      onDuration={handleDuration}
                      onProgress={handleProgress}
                      onEnded={handleEnded}
                      onReady={handlePlayerReady}
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
              <h3>
                <b>{movieData.title}</b> (
                {new Date(movieData.release_date).getFullYear()})
              </h3>
              <Container fluid className="p-0 d-flex align-items-center">
                <Image
                  className="rounded-circle shadow-1-strong me-3"
                  src={
                    movieData.directors[0].img
                      ? movieData.directors[0].img.img_500 ||
                        movieData.directors[0].img.img_1280 ||
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
                        <b>{movieData.directors[0].name}</b>
                      </h5>
                      <h6>
                        {new Date(
                          movieData.directors[0].birthday
                        ).toLocaleDateString("en-GB")}
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
                        {movieData.id}
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
            <Container>{duration}</Container>
            <Container className="p-2 border border-1 bg-secondary rounded shadow mb-2">
              <ReviewForm filmId={movieData.id} />
            </Container>
            <Container className="p-2 border border-1 bg-secondary rounded shadow">
              <h2 className="text-uppercase fw-bolder">Related Film</h2>
              <Row
                xs={1}
                sm={2}
                md={4}
                lg={5}
                className="justify-content-start p-2"
              >
                {relatedFilms?.map((movie: Film, index: number) => (
                  <Col key={index} className="ps-2 pe-2 mb-4">
                    <MovieCard movieData={movie} className="items-scale" />
                  </Col>
                ))}
              </Row>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}
