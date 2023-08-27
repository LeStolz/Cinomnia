import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Film } from "../../../../configs/Model";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "react-loading-skeleton/dist/skeleton.css";
import "./Hero.scss";

interface HeroProps {
  movies: Film[];
}
export function Hero({ movies }: HeroProps) {
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
        <Skeleton height={500} />
      ) : (
        <Swiper
          className="hero"
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
        >
          {movieData.map((data, index) => (
            <SwiperSlide key={index}>
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
                <Container fluid className="position-absolute ms-5 w-50">
                  <Container className="hero-text m-0">
                    <h1
                      className="text-uppercase m-0 p-0 fw-bolder text-primary"
                      style={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {data.title}
                    </h1>
                    <h4 className="text-white mt-2 mb-3 fw-normal overview overflow-hidden">
                      {data.overview}
                    </h4>
                  </Container>
                  <Container
                    className="p-0 m-0 d-flex justify-content-between w-100"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <Container>
                      <Button
                        variant="light"
                        size="lg"
                        className="position-relative rounded fw-bold fs-4 shadow me-2"
                        onClick={() => navigate(`/player/${data.id}`)}
                      >
                        <i className="position-absolute-start bi bi-play-fill me-2"></i>
                        Play
                      </Button>
                      <Button
                        variant="dark"
                        size="lg"
                        className="position-relative rounded fs-4 fw-bold shadow"
                        onClick={() => navigate(`/detail/${data.id}`)}
                      >
                        <i className="position-absolute-start bi bi-info-circle me-3"></i>
                        More Info
                      </Button>
                    </Container>
                    <Container className="end-0 right-items"></Container>
                  </Container>
                </Container>
              </Container>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
