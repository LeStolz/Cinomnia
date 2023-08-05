// import { Hero } from "./components/Hero/Hero";
// import { Container } from "react-bootstrap";
// import { ContainerSlider } from "./components/MovieSlider/ContainerSlider";

// type Film = {
//   _id: string;
//   title: string;
//   poster: string;
//   trailer: { key: string }; // Add the trailer property here
// };
// interface HomeViewProps {
//   movies: Film[];
// }
// export function HomeView({ movies }: HomeViewProps) {
//   return (
//     <Container fluid className="home p-0">
//       <Hero movies={movies}/>
//       {/* <ContainerSlider movies={movies}/> */}
//       {movies.map((film) => (
//         <li key={film._id}>{film.title}</li>
//       ))}
//     </Container>
//   );
// } dang cap nhat api tu mongo

import { Hero } from "./components/Hero/Hero";
import { Container } from "react-bootstrap";
import { ContainerSlider } from "./components/MovieSlider/ContainerSlider";

export function HomeView({ movies }: { movies: string[] }) {
  return (
    <Container fluid className="home p-0">
      <Hero movies={movies}/>
      <ContainerSlider movies={movies}/>
    </Container>
  );
}
