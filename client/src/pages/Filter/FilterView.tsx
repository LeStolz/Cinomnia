import Header from "../../components/Filter/FilterHeader";
import Context from "../../contexts/Context";
import Home from "../../components/Filter/HandleFilter";
import { Film } from "../../configs/Model";
interface FilterViewProps {
  movies: Film[];
}

export function FilterView({ movies }: FilterViewProps) {
  return (
    <Context>
      <Header />
      <div className="App">
        <Home movies={movies}/>
      </div>
    </Context>
  );
}
