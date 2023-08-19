import { Hero } from "./components/Hero/Hero";
import { Container } from "react-bootstrap";
import { Film } from "../../configs/Model";
import { ContainerSlider } from "./components/MovieSlider/ContainerSlider";
export interface HomeViewProps {
  movies: Film[];
}

export function HomeView({ movies }: HomeViewProps) {
  return (
    <Container fluid className="home p-0">
      <Hero movies={movies}/>
      <ContainerSlider movies={movies}/>
    </Container>
  );
}
