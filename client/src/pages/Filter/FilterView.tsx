import Header from "../../components/filter/FilterHeader";
import Context from "../../components/context/Context";
import Home from "../../components/filter/HandleFilter";
import { productType } from "../../components/context/Context";

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
