import { Carousel, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Hero.scss";

interface HeroProps {
  movies: any[];
}

const overview =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

export function Hero({ movies }: HeroProps) {
  const navigate = useNavigate();
  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const getRandomMovies = () => {
    const shuffledMovies = shuffleArray(movies);
    const moviesWithTrailer = shuffledMovies.filter(
      (movie) => movie.trailer && movie.trailer.key
    );
    return moviesWithTrailer.slice(0, 10);
  };

  const movieData = getRandomMovies();
  return (
    <Carousel>
      {movieData.map((data, index) => (
        <Carousel.Item key={index}>
          <Container
            fluid
            className="d-flex align-items-center position-relative p-0"
            style={{
              height: "90vh",
              backgroundImage: `url('https://image.tmdb.org/t/p/original${data.image}')`,
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
                  {data.name}
                </h1>
                <h4 className="text-white mt-2 mb-2 fw-normal overview overflow-hidden">
                  {data.overview ? data.overview : overview}
                </h4>
              </Container>
              <Container className="p-0 m-0 d-flex justify-content-between w-100">
                <Container className="d-flex">
                  <Button
                    variant="light"
                    size="lg"
                    className="d-flex align-items-center justify-content-center me-3 h-auto w-auto"
                    onClick={() =>  navigate('/player', { state: { videoUrl: data?.trailer?.key } })}
                  >
                    <i className="bi bi-play-fill fs-2"></i>
                    <p className="m-0 fw-semibold fs-2">Play</p>
                  </Button>
                  <Button variant="secondary" size="lg" className="h-auto w-auto">
                    <p className="m-0 fw-semibold fs-2">More Info</p>
                  </Button>
                </Container>
                <Container className="end-0 right-items"></Container>
              </Container>
            </Container>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
