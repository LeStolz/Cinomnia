import { Container, Button, ButtonGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import ReactPlayer from "react-player";
import { GlobalContext } from "../../contexts/GlobalState";
import { useFilm } from "../../contexts/FilmContext";
import { Film } from "../../configs/Model";
import "./MovieCard.scss";

interface MovieCardProps {
  movieData: Film;
  className: string;
}

export function MovieCard({ movieData, className }: MovieCardProps) {
  const { addMovieToWatchlist, removeMovieFromWatchlist, watchlist } =
    useContext(GlobalContext);
  const { addMovieToStore, removeMovieFromStore, store } =
    useContext(GlobalContext);
  const { addFilmToWishlist, removeFilmFromWishlist } = useFilm();
  const isMovieInStore = store.some(
    (movie: Film) => movie._id === movieData._id
  );
  const isMovieInWatchlist = watchlist.some(
    (movie: Film) => movie._id === movieData._id
  );

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isIconLike, setIsIconLike] = useState("bi bi-hand-thumbs-up");

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleIconLike = (props: string) => {
    if (isMovieInWatchlist) {
      if (props === "bi bi-hand-thumbs-down") {
        removeMovieFromWatchlist(movieData._id);
        removeFilmFromWishlist(movieData);
        setIsIconLike("bi bi-hand-thumbs-up");
      }
    } else {
      if (
        props === "bi bi-hand-thumbs-down" ||
        props === "bi bi-hand-thumbs-up"
      ) {
        setIsIconLike(props);
      } else if (props === "bi bi-heart") {
        addFilmToWishlist(movieData, "wishlist", 0);
        addMovieToWatchlist(movieData);
        setIsIconLike(props);
      }
    }
  };

  const handleAddToStore = () => {
    if (isMovieInStore) {
      removeMovieFromStore(movieData._id);
    } else {
      addMovieToStore(movieData);
    }
  };

  const handlePlayClick = (props: string) => {
    navigate(`/${props}/${movieData.id}`);
  };
  return (
    <Container
      fluid
      className="p-0 h-100 w-100 shadow"
      onMouseLeave={handleLeave}
    >
      <Container
        fluid
        className={`${className} h-100 w-100 p-0 rounded position-relative ${className}`}
      >
        {isHovered && movieData.videos?.trailers[0]?.link && (
          <Container
            fluid
            className="video-container p-0 position-absolute top-0 start-0 w-100 h-100 z-2 rounded-top overflow-hidden"
          >
            <ReactPlayer
              url={
                movieData.videos.trailers[0].link
                  ? `${movieData.videos.trailers[0].link}`
                  : `${movieData.videos.video_full}`
              }
              className="rounded-top"
              playing={true}
              loop
              width="100%"
              height="95%"
            />
          </Container>
        )}
        <Container
          fluid
          className="p-0 image z-1 position-relative h-100 w-100"
        >
          <Image
            className="rounded w-100 h-100"
            src={`${movieData.poster.img_500}`}
            alt="movie"
            onClick={() => handlePlayClick("player")}
          />
          <Container
            fluid
            className="movie-name-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-top overflow-hidden"
            onClick={() => handlePlayClick("player")}
          >
            <h4 className="text-truncate">{movieData.title}</h4>
          </Container>
        </Container>
        <Container
          fluid
          className="detail rounded-bottom p-2 position-absolute bg-black overflow-hidden z-3 start-0 bottom-0 mw-100"
          onMouseEnter={handleHover}
        >
          <Container
            fluid
            className="detail-button w-0 h-0 d-flex justify-content-between p-0"
          >
            <Container fluid className="detail-button-left p-0 d-flex">
              <Button
                variant="light"
                title="play"
                className="position-relative rounded-circle w-sm h-sm me-1"
                onClick={() => handlePlayClick("player")}
              >
                <i className="position-absolute-center bi bi-play-fill"></i>
              </Button>
              <Button
                variant="outline-light"
                title={isMovieInStore ? "Remove from Cart" : "Add to Cart"}
                className={`position-relative rounded-circle w-sm h-sm me-1 ${
                  isMovieInStore ? "border border-2" : ""
                }`}
                onClick={handleAddToStore}
              >
                <i
                  className={`position-absolute-center ${
                    isMovieInStore ? "bi bi-check text-success" : "bi bi-plus"
                  }`}
                ></i>
              </Button>
              <Container className="p-0 m-0 position-relative rounded-circle w-sm h-sm me-1 border border-1 border-white like">
                <i
                  className={`position-absolute-center ${
                    isMovieInWatchlist
                      ? "text-danger bi bi-heart-fill"
                      : `text-white ${isIconLike}-fill`
                  }`}
                ></i>
                <ButtonGroup className="position-absolute-center like-items rounded-pill d-flex">
                  <Button
                    variant="dark"
                    title="Dislike"
                    className="position-relative rounded-circle w-sm h-sm me-1"
                    onClick={() => handleIconLike("bi bi-hand-thumbs-down")}
                  >
                    <i className="position-absolute-center bi bi-hand-thumbs-down"></i>
                  </Button>
                  <Button
                    variant="dark"
                    title="Like"
                    className="position-relative rounded-circle w-sm h-sm me-1"
                    onClick={() => handleIconLike("bi bi-hand-thumbs-up")}
                  >
                    <i className="position-absolute-center bi bi-hand-thumbs-up"></i>
                  </Button>
                  <Button
                    variant="dark"
                    title="Add To Watchlist"
                    className="position-relative rounded-circle w-sm h-sm"
                    onClick={() => handleIconLike("bi bi-heart")}
                  >
                    <i className="position-absolute-center bi bi-heart"></i>
                  </Button>
                </ButtonGroup>
              </Container>
            </Container>
            <Button
              variant="outline-light"
              title="Infomation"
              className="position-relative rounded-circle w-sm h-sm border border-2"
              onClick={() => handlePlayClick("detail")}
            >
              <i className="position-absolute-center bi bi-three-dots"></i>
            </Button>
          </Container>
          <Container fluid className="detail-rating p-0 pt-2 pb-2 fw-bold">
            <p
              className="text-uppercase m-0 text-truncate p-0 fs-5"
              style={{
                color: "#2ecc71",
                cursor: "pointer",
              }}
            >
              {movieData.title}
            </p>
            <span className="border border-white h-auto w-auto ps-1 pe-1 fs-6 text-white">
              {movieData.title && movieData.title.includes("sex")
                ? "18+"
                : "16+"}
            </span>

            <ul className="d-flex text-white p-0 m-0 genre-list fw-lighter list-unstyled">
              {movieData.genres &&
                movieData.genres.map((genre) => (
                  <li key={`genre-${genre.id}`} className="me-1">
                    {genre.name !== "" && genre.name}
                  </li>
                ))}
            </ul>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
