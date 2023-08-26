import Home from "../../components/Filter/HandleFilter";
import { productType } from "../../contexts/Context";

interface FilterViewProps {
  movies: productType[];
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
