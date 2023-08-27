import { MovieCard } from "../../../../components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Film } from "../../../../configs/Model";
import { MovieCardSkeleton } from "../../../../components/MovieCard/MovieCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./MovieSlider.scss";

interface MovieSliderProps {
  data: Film[];
  title: string;
  number: number;
}

export function MovieSlider({ data, title, number }: MovieSliderProps) {
  const [slidesPerView, setSlidesPerView] = useState(7);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1600) {
        setSlidesPerView(8);
      } else if (screenWidth >= 1400) {
        setSlidesPerView(7);
      } else if (screenWidth >= 1200) {
        setSlidesPerView(6);
      } else if (screenWidth >= 992) {
        setSlidesPerView(5);
      } else if (screenWidth >= 768) {
        setSlidesPerView(4);
      } else if (screenWidth >= 576) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(2);
      }
    }

    handleResize(); // Call on initial render
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const skeletonSlides = new Array(slidesPerView).fill(null);

  return (
    <Container fluid className="p-0 mb-5">
      <h2 className="ps-5">{title}</h2>
      <Container fluid className="media-container p-0">
        <Swiper
          className="swiper-slider"
          id={`slide-${number}`}
          loop={true}
          modules={[Navigation]}
          spaceBetween={5}
          slidesPerView={slidesPerView}
          navigation={true}
        >
          {data.length === 0
            ? skeletonSlides.map((_, index) => (
                <SwiperSlide key={index}>
                  <MovieCardSkeleton />
                </SwiperSlide>
              ))
            : // Render MovieCard components
              data.map((slide) => (
                <SwiperSlide key={slide._id} className="h-auto">
                  <MovieCard movieData={slide} className="items-scale" />
                </SwiperSlide>
              ))}
        </Swiper>
      </Container>
    </Container>
  );
}
