import { MovieSlider } from "./MovieSlider";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { GlobalContext } from "../../../../contexts/GlobalState";
import { Film } from "../../../../configs/Model";
import { HomeViewProps } from "../../HomeView";

export function ContainerSlider({ movies }: HomeViewProps) {
  const { watchlist } = useContext(GlobalContext);
  const shuffleArray = (array: Film[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const getRandomMovies = () => {
    const shuffledMovies = shuffleArray(movies);
    return shuffledMovies.slice(0, 20);
  };

  const getRangeMovies = (i: number, j: number) => {
    return movies.slice(i, j);
  };

  return (
    <Container fluid className="slider-container p-0">
      <MovieSlider
        data={getRangeMovies(0, 20)}
        title="Trending Now"
        number={0}
      />
      <MovieSlider
        data={getRangeMovies(10, 30)}
        title="New Releases"
        number={1}
      />
      <MovieSlider
        data={watchlist}
        title="Watch list And Recommend for you"
        number={2}
      />
      <MovieSlider
        data={getRangeMovies(30, 50)}
        title="Top pick for you"
        number={3}
      />
      <MovieSlider
        data={getRangeMovies(40, 60)}
        title="Continue Watching for you"
        number={4}
      />
      <MovieSlider
        data={getRangeMovies(66, 76)}
        title="Exciting TV Sci-Fi & Fantasy"
        number={5}
      />
      {/* <MovieSlider data={getRandomMovies()} title="Blockbuster Movies" number={6}/>
      <MovieSlider data={getRandomMovies()} title="Psychologial TV Thrillers" number={7}/> */}
      {/* <Slider slides={getRandomMovies()} /> */}
    </Container>
  );
}
