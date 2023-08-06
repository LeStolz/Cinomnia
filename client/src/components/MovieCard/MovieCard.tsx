import { Card, Container, Button, ButtonGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import ReactPlayer from "react-player";
import { GlobalContext } from "../../contexts/GlobalState";
import "./MovieCard.scss";

export function MovieCard({ movieData }: any) {
  
  const { addMovieToWatchlist, removeMovieFromWatchlist, watchlist } =
    useContext(GlobalContext);
  const { addMovieToStore, removeMovieFromStore, store } =
    useContext(GlobalContext);

  const isMovieInStore = store.some((movie: any) => movie.id === movieData.id);
  const isMovieInWatchlist = watchlist.some(
    (movie: any) => movie.id === movieData.id
  );

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isIconLike, setIsIconLike] = useState("bi bi-hand-thumbs-up");
import { useState, useRef } from "react";
import "./MovieCard.scss";

interface GenreProps {
  genre: string;
}

interface MovieData {
  id: number;
  image: string;
  name: string;
  genres: GenreProps[];
}

interface MovieCardProps {
  movieData: MovieData;
}

export default function MovieCard({ movieData }: any) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isIconLike, setIsIconLike] = useState("bi bi-hand-thumbs-up");
  const [isSave, setIsSave] = useState(false);

  const handleSave = () => {
    if (isSave) setIsSave(false);
    if (!isSave) setIsSave(true);
  };
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleIconLike = (props: any) => {
    if (isMovieInWatchlist) {
      if (props === "bi bi-hand-thumbs-down") {
        removeMovieFromWatchlist(movieData.id);
        setIsIconLike("bi bi-hand-thumbs-up");
      }
    } else {
      if (
        props === "bi bi-hand-thumbs-down" ||
        props === "bi bi-hand-thumbs-up"
      ) {
        setIsIconLike(props);
      } else if (props === "bi bi-heart") {
        addMovieToWatchlist(movieData);
        setIsIconLike(props);
      }
    }
  };

  const handleAddToStore = () => {
    if (isMovieInStore) {
      removeMovieFromStore(movieData.id);
    } else {
      addMovieToStore(movieData);
    }
  };

  const handlePlayClick = () => {
    navigate('/player', { state: { movie: movieData } });
  };
  

  return (
    <Card onMouseLeave={handleLeave}>
      <Container fluid className="items p-0 rounded position-relative">
        {isHovered && movieData.trailer && (
          <Container
            fluid
            className="video-container p-0 position-absolute top-0 start-0 w-100 h-100 z-3 rounded-top overflow-hidden"
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movieData.trailer.key}`}
              className="rounded-top"
              playing={true}
              loop
              controls
              width="100%"
              height="100%"
            />
          </Container>
        )}
        <Container fluid className="p-0 image z-1 position-relative">
          <Image
            className="rounded w-100 h-100"
            src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
            alt="movie"
            onClick={handlePlayClick}
          />
          <Container
            fluid
            className="movie-name-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-top overflow-hidden"
          >
            <h2 className="text-truncate">{movieData.name}</h2>
          </Container>
        </Container>
        <Container
          fluid
          className="detail rounded-bottom p-2 position-absolute bg-black z-0 overflow-hidden start-0 bottom-0 mw-100"
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
                onClick={handlePlayClick}
    setIsIconLike(props);
  };

  return (
    <Card>
      <Container fluid className="items p-0 rounded">
        <Container fluid className="p-0 image">
          <Image
            className="rounded w-100 h-100"
            src={`${movieData.img_character}`}
            alt="movie"
            onClick={() => navigate("/player")}
          />
          <Container fluid className="movie-name-overlay p-3 rounded-top">
            <h5>{movieData.job}</h5>
          </Container>
        </Container>
        <Container fluid className="media-overlay p-0"></Container>
        <Container
          fluid
          className="detail rounded-bottom p-2"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <Container
            fluid
            className="detail-button d-flex justify-content-between p-0"
          >
            <Container fluid className="detail-button-left p-0">
              <Button
                variant="light"
                title="play"
                className="position-relative rounded-circle w-md h-md me-1"
                onClick={() => navigate("/player")}
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
                  className={`position-absolute-center fs-3 ${
                    isMovieInStore ? "bi bi-check text-success" : "bi bi-plus"
                  }`}
                ></i>
              </Button>
              <Container className="p-0 m-0 position-relative rounded-circle w-sm h-sm me-1 border border-1 border-white like">
                <i
                  className={`position-absolute-center ${
                    isMovieInWatchlist ? "text-danger bi bi-heart-fill" : `text-white ${isIconLike}-fill`
                  }`}
                ></i>
                <ButtonGroup className="position-absolute-center like-items rounded-pill d-flex">
                  <Button
                    variant="dark"
                    title="Dislike"
                    className="position-relative rounded-circle w-sm h-sm me-1"
                className={`position-relative rounded-circle w-md h-md me-1 ${
                  isSave ? "" : "border border-2"
                }`}
                onClick={() => handleSave()}
              >
                <i
                  className={`position-absolute-center fs-3 ${
                    isSave ? "bi bi-check text-success" : "bi bi-plus"
                  }`}
                ></i>
              </Button>
              <Button
                variant="outline-light"
                className="position-relative rounded-circle w-md h-md me-1 border border-2 like"
              >
                <i
                  className={`position-absolute-center ${isIconLike}-fill`}
                ></i>
                <ButtonGroup className="position-absolute-center like-items rounded-pill p-1">
                  <Button
                    variant="dark"
                    className="position-relative rounded-circle w-md h-md me-1"
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
              onClick={() => navigate("/detail")}
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
              {movieData.name}
            </p>
            <span className="border border-white h-auto w-auto ps-1 pe-1 fs-6 text-white">
              {movieData.adult ||
              (movieData.name && movieData.name.includes("sex"))
                ? "18+"
                : "16+"}
            </span>

            <ul className="d-flex text-white p-0 m-0 genre-list fw-lighter fs-6 list-unstyled">
              {movieData.genres &&
                movieData.genres.map((genre: any, index: number) => (
                  <li key={index} className="me-1">
                    {genre}
                  </li>
                ))}
            </ul>
              </Button>
            </Container>
            <div className="detail-button-right p-0 pt-2 pb-2">
              <Button
                variant="outline-light"
                className="position-relative rounded-circle w-md h-md border border-2"
              >
                <i className="position-absolute-center bi bi-three-dots"></i>
              </Button>
            </div>
          </Container>

          <Container fluid className="detail-rating p-0 pt-2 pb-2">
            <h6
              className="text-uppercase m-0 mb-2"
              onClick={() => navigate("/player")}
              style={{
                color: "#2ecc71",
                cursor: "pointer",

                fontSize: "0.8rem",
              }}
            >
              {movieData.id}
            </h6>
          </Container>
        </Container>
      </Container>
    </Card>
  );
}
