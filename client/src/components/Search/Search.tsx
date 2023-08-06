import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import "./Search.scss";

interface MovieTitlesProps {
  titles: string[];
}

export default function MovieTitles({ titles }: MovieTitlesProps) {
  return (
    <Container fluid className="p-5">
      <h3 className="pt-5">
        Explore Titles Related To: {titles.length} Result
      </h3>
      <Container fluid>
        {titles.map((title, index) => (
          <a key={title} href={`#${index}`} className="title text-decoration-none">
            {title}
          </a>
        ))}
      </Container>
    </Container>
  );
}

export function Search() {
  const location = useLocation();
  const movies = location.state?.movies || [];
  const slides: any[] = [];
  slides.push(movies);

  return (
    <Container className="home p-0">
      <MovieTitles titles={movies.map((movie: any) => movie.name)} />
      {slides.map((slide, index) => (
        <Row
          xs={1}
          sm={2}
          md={4}
          lg={5}
          key={index}
          className="justify-content-start ms-5 me-5"
        >
          {slide.map((movie: any) => (
            <Col key={movie.id} className="ps-1 pe-1 mb-5">
              <MovieCard movieData={movie} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
