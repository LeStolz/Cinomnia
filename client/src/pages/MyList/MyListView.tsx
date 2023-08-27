import { useEffect, useState } from "react";
import { ListFilm } from "../../configs/Model";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface MyListViewProps {
    wishlist: ListFilm[];
    bought: ListFilm[];
}
export function MyListView({wishlist, bought} : MyListViewProps) {
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
  return (
    <Container fluid className="p-0 overflow-hidden">
      {bought.filter((data) => data.status === "watching").length > 0 ? (
        <Container fluid className="p-0">
          <h2 className="ms-5">Watching</h2>
          <Swiper
            className="swiper-slider"
            modules={[Navigation]}
            spaceBetween={2}
            slidesPerView={slidesPerView}
          >
            {bought
              .filter((data) => data.status === "watching") // Lọc phim có trạng thái "watching"
              .map((data, idx) => (
                <SwiperSlide key={idx} className="h-auto">
                  <MovieCard movieData={data.film} className="items" />
                </SwiperSlide>
              ))}
          </Swiper>
        </Container>
      ) : (
        <Container fluid className="p-0 m-5">
          <h2>Watching</h2>
          <h4>No movies in your list! Add some!</h4>
        </Container>
      )}
      {bought.filter((data) => data.status === "watched").length > 0 ? (
        <Container fluid className="p-0">
          <h2 className="ms-5">Watched</h2>
          <Swiper
            className="swiper-slider"
            modules={[Navigation]}
            spaceBetween={2}
            slidesPerView={slidesPerView}
          >
            {bought
              .filter((data) => data.status === "watched")
              .map((data, idx) => (
                <SwiperSlide key={idx} className="h-auto">
                  <MovieCard movieData={data.film} className="items" />
                </SwiperSlide>
              ))}
          </Swiper>
        </Container>
      ) : (
        <Container fluid className="p-0 m-5">
          <h2>Watched</h2>
          <h4>No movies in your list! Add some!</h4>
        </Container>
      )}
      {wishlist.length > 0 ? (
        <Container fluid className="p-0">
          <h2 className="ms-5">Wishlist</h2>
          <Swiper
            className="swiper-slider"
            modules={[Navigation]}
            spaceBetween={2}
            slidesPerView={slidesPerView}
          >
            {wishlist.map((data, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <MovieCard movieData={data.film} className="items" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      ) : (
        <Container fluid className="p-0 m-5">
          <h2>Wishlist</h2>
          <h4>No movies in your list! Add some!</h4>
        </Container>
      )}
      {bought.length > 0 ? (
        <Container fluid className="p-0">
          <h2 className="ms-5">Bought</h2>
          <Swiper
            className="swiper-slider"
            modules={[Navigation]}
            spaceBetween={2}
            slidesPerView={slidesPerView}
          >
            {bought.map((data, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <MovieCard movieData={data.film} className="items" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      ) : (
        <Container fluid className="p-0 m-5">
          <h2>Bought</h2>
          <h4>No movies in your list! Add some!</h4>
        </Container>
      )}
    </Container>
  );
}
