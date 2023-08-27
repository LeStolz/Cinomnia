import Home from "../../components/Filter/HandleFilter";
import { Film } from "../../configs/Model";
interface FilterViewProps {
  movies: Film[];
}

export function FilterView({ movies }: FilterViewProps) {
  return (
    <>
      <div className="App">
        <Home movies={movies} />
      </div>
    </>
  );
}
