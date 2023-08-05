import { Card, Container, Button, ButtonGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
                    className="position-relative rounded-circle w-md h-md me-1"
                    onClick={() => handleIconLike("bi bi-hand-thumbs-up")}
                  >
                    <i className="position-absolute-center bi bi-hand-thumbs-up"></i>
                  </Button>
                  <Button
                    variant="dark"
                    className="position-relative rounded-circle w-md h-md"
                    onClick={() => handleIconLike("bi bi-heart")}
                  >
                    <i className="position-absolute-center bi bi-heart"></i>
                  </Button>
                </ButtonGroup>
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
