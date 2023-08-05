import { useState, useEffect } from "react";
import { MovieCard } from "../../../../components/MovieCard/MovieCard";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import "./MovieSlider.scss"

interface MovieSliderProps {
  data: any[];
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

  const slides: any[] = [];
  const numSlides = Math.ceil(data.length / numCols);
  for (let i = 0; i < numSlides; i++) {
    const startIndex = i * numCols;
    const endIndex = Math.min(startIndex + numCols, data.length);
    const slideData = data.slice(startIndex, endIndex);
    slides.push(slideData);
  }

  // console.log(data);
  return (
    <Container fluid className="p-0 mb-5">
      <h2 className="ps-5">{title}</h2>
      <Container fluid className="media-container p-0">
        <Carousel interval={50000000} className="media-scroller ps-5 pe-5">
          {slides.map((slide, index) => (
            <Carousel.Item
              key={index}
              className="media-group"
              id={`group${number}${index}`}
            >
              <Row>
                {slide.map((movie: any) => (
                  <Col key={movie.id} className="ps-1 pe-1">
                    <div className="media-element">
                      <MovieCard movieData={movie} />
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
}
