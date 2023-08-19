import Header from "../../components/Filter/FilterHeader";
import Context from "../../contexts/Context";
import Home from "../../components/Filter/HandleFilter";
import { productType } from "../../contexts/Context";

interface FilterViewProps {
  movies: productType[];
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
