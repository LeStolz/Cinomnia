import { Container, Row, Col } from "../../node_modules/react-bootstrap";
import { MovieCard } from "./MovieCard/MovieCard";
export function Film({ movies }: any) {
  const numCols = 4;

  const slides: any[] = [];
  const numSlides = Math.ceil(movies.length / numCols);
  for (let i = 0; i < numSlides; i++) {
    const startIndex = i * numCols;
    const endIndex = Math.min(startIndex + numCols, movies.length);
    const slideData = movies.slice(startIndex, endIndex);
    slides.push(slideData);
  }

  return (
    <Container fluid className="known-for p-0">
      {slides.map((slide, index) => (
        <Row key={index}>
          {slide.map((movie: any) => (
            <Col
              key={movie.id}
              className="ps-3 pe-3 pb-2 pt-2"
              xs={12}
              sm={6}
              md={3}
              xl={3}
            >
              <div className="media-element mt-2">
                <MovieCard movieData={movie} className=""/>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
