import { Carousel, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Film } from "../../../../configs/Model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Hero.scss";

interface HeroProps {
  movies: Film[];
}

const overview =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

export function Hero({ movies }: HeroProps) {
  console.log(movies);
  const navigate = useNavigate();

  const getRandomMovies = (movies: Film[], count: number) => {
    const shuffledMovies = movies.slice();
    for (let i = shuffledMovies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMovies[i], shuffledMovies[j]] = [
        shuffledMovies[j],
        shuffledMovies[i],
      ];
    }
    return shuffledMovies.slice(0, count);
  };
  const movieData = getRandomMovies(movies, 10);

  return (
    <>
      {" "}
      {movies.length == 0 ? (
        <Skeleton height={300} />
      ) : (
        <Carousel className="hero">
          {movieData.map((data, index) => (
            <Carousel.Item key={index}>
              <Container
                fluid
                className="d-flex align-items-center position-relative p-0"
                style={{
                  height: "90vh",
                  backgroundImage: `url('${data.poster.img_1280}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <Container
                  fluid
                  className="position-absolute w-100 blur-hero"
                  style={{
                    height: "90vh",
                  }}
                ></Container>
                <Container fluid className="position-absolute h-50 ms-5 w-auto">
                  <Container className="w-50 m-0">
                    <h1
                      className="text-uppercase m-0 p-0 fw-bolder text-success"
                      style={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {data.title}
                    </h1>
                    <h4 className="text-white mt-2 mb-2 fw-normal overview overflow-hidden">
                      {data.overview ? data.overview : overview}
                    </h4>
                  </Container>
                  <Container className="p-0 m-0 d-flex justify-content-between w-100" style={{ whiteSpace: 'nowrap' }}>
                    <Container className="d-flex">
                      <Button
                        variant="light"
                        size="lg"
                        className="position-relative rounded-1 me-2 fw-bold fs-4 shadow"
                        onClick={() => navigate(`/player/${data.id}`)}
                      >
                        <i className="position-absolute-start bi bi-play-fill"></i>
                        Play
                      </Button>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="position-relative rounded fw-bold fs-4 shadow"
                        onClick={() => navigate(`/detail/${data.id}`)}
                      >
                        <b>More Infomation</b>
                      </Button>
                    </Container>
                    <Container className="end-0 right-items"></Container>
                  </Container>
                </Container>
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}
