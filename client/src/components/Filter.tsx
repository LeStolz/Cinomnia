import Header from "./filter/FilterHeader";
import Context from "./context/Context";
import Home from "./filter/HomeFilter";

export function Filter() {
  return (
    <Context>
      <Header />
      <div className="App">
        <Home />
      </div>
    </Context>
  );
}
