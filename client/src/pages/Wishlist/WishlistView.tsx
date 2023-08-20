import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../../components/MovieCard/MovieCard";

export function WishlistView({ watchlist }: { watchlist: any[] }) {
  const slides: any[] = [];
  slides.push(watchlist);

  return (
    <Container className="pt-5 text-center p-0">
      <h2 className="m-5 mb-0">My Wishlist</h2>
      {watchlist.length > 0 ? (
        <Container fluid className="p-0">
          {slides.map((slide, index) => (
            <Row
              xs={1}
              sm={2}
              md={4}
              lg={5}
              key={index}
              className="justify-content-start m-5"
            >
              {slide.map((movie: any) => (
                <Col key={movie.id} className="ps-1 pe-1 mb-2">
                  <MovieCard movieData={movie} className="" />
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      ) : (
        <h4>No movies in your list! Add some!</h4>
      )}
    </Container>
  );
}
