import { useState, useEffect } from "react";
import { MovieCard } from "../../../../components/MovieCard/MovieCard";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import { Film } from "../../../../configs/Model";
import "./MovieSlider.scss";
import { MovieCardSkeleton } from "../../../../components/MovieCard/MovieCardSkeleton";

interface MovieSliderProps {
  data: Film[];
  title: string;
  number: number;
}

export function MovieSlider({ data, title, number }: MovieSliderProps) {
  const [numCols, setNumCols] = useState(5);

  useEffect(() => {
    function updateNumCols() {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1200) {
        setNumCols(5);
      } else if (screenWidth > 992) {
        setNumCols(4);
      } else if (screenWidth > 768) {
        setNumCols(2);
      } else {
        setNumCols(1);
      }
    }

    window.addEventListener("resize", updateNumCols);
    updateNumCols();

    return () => window.removeEventListener("resize", updateNumCols);
  }, []);

  const slides: Film[][] = [];
  const numSlides = Math.ceil(data.length / numCols);
  for (let i = 0; i < numSlides; i++) {
    const startIndex = i * numCols;
    const endIndex = Math.min(startIndex + numCols, data.length);
    const slideData = data.slice(startIndex, endIndex);
    slides.push(slideData);
  }

  const getColumnClassName = (index: number, slideLength: number) => {
    if (slideLength === 1) {
      return "only";
    }
    if (index === 0) {
      return "first";
    }
    if (index === slideLength - 1) {
      return "last";
    }
    return "";
  };

  return (
    <Container fluid className="p-0 mb-5">
      <h2 className="ps-5">{title}</h2>
      <Container fluid className="media-container p-0">
        <Carousel interval={50000000} className="media-scroller ps-2 pe-2">
          {data.length === 0 ? ( // Check if data is not loaded
            <Carousel.Item key={0} className="media-group">
              {/* Render MovieCardSkeleton */}
              <Row>
                {Array.from({ length: numCols }).map((_, columnIndex) => (
                  <Col key={columnIndex} className="ps-1 pe-1">
                    <MovieCardSkeleton />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ) : (
            // Render MovieCard components
            slides.map((slide, slideIndex) => (
              <Carousel.Item
                key={slideIndex}
                className="media-group"
                id={`group${number}${slideIndex}`}
              >
                <Row>
                  {slide.map((movie: Film, columnIndex) => (
                    <Col key={movie._id} className="ps-1 pe-1">
                      <MovieCard
                        movieData={movie}
                        className={getColumnClassName(
                          columnIndex,
                          slide.length
                        )}
                      />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))
          )}
        </Carousel>
      </Container>
    </Container>
  );
}
