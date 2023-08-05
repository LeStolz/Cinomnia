import { MovieSlider } from "./MovieSlider";
import { Container } from "react-bootstrap";
import { useContext } from 'react'
import { GlobalContext } from "../../../../contexts/GlobalState";

interface SliderProps {
  movies: any[];
}

export function ContainerSlider({ movies }: SliderProps) {
  const { watchlist } = useContext(GlobalContext);
  const getMoviesFromRange = (from: number, to: number) => {
    return movies.slice(from, to);
  };

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const getRandomMovies = () => {
    const shuffledMovies = shuffleArray(movies);
    const remainingMovies = 5 - ((watchlist.length) % 5);
    const additionalMovies = shuffledMovies.slice(0, remainingMovies);
    return watchlist.concat(additionalMovies);
  };

  return (
    <Container fluid className="slider-container p-0">
      <MovieSlider data={getMoviesFromRange(0, 20)} title="Trending Now" number={0}/>
      <MovieSlider data={getMoviesFromRange(20, 40)} title="New Releases" number={1} />
      <MovieSlider data={getRandomMovies()} title="Watch list And Recommend for you" number={2} />
      <MovieSlider data={getMoviesFromRange(40, 60)} title="Top pick for you" number={3}/>
      <MovieSlider data={getMoviesFromRange(60, 80)} title="Continue Watching for you" number={4}/>
      <MovieSlider data={getMoviesFromRange(80,100)} title="Exciting TV Sci-Fi & Fantasy" number={5} />
      <MovieSlider data={getMoviesFromRange(100, 120)} title="Blockbuster Movies" number={6}/>
      <MovieSlider data={getMoviesFromRange(120, 140)} title="Psychologial TV Thrillers" number={7}/>
    </Container>
  );
}
