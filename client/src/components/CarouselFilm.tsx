import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

export function CarouselFilm({ slides }: any) {
  return (
    <>
      <Carousel fade>
        {slides.map((slide: any, index: any) => (
          <Carousel.Item interval={10000} key={index}>
            <Image
              className="w-100"
              src={"https://placehold.co/75x25"}
              alt="..."
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselFilm;
