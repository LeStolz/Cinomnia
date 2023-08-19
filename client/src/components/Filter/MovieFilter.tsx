import { Button, Form } from "react-bootstrap";
import { CartState } from "../../contexts/Context";
import Rating from "./Rating";

const SortFilter = (props: any) => {
  const { productDispatch } = CartState();

  return (
    <>
      <div>
        <h4>Sort by {props.head}</h4>
        <div>
          <Form.Check
            className="ps-5"
            inline
            label={props.labe1}
            name={props.nameGroup}
            type="radio"
            id={`inline-1`}
            onChange={() => {
              if (productDispatch) {
                return productDispatch({
                  type: props.type,
                  payload: "lowToHigh",
                });
              }
            }}
            checked={props.state === "lowToHigh" ? true : false}
          />
        </div>

        <div>
          <Form.Check
            className="ps-5"
            inline
            label={props.label2}
            name={props.nameGroup}
            type="radio"
            id={`inline-2`}
            onChange={() => {
              if (productDispatch) {
                return productDispatch({
                  type: props.type,
                  payload: "highToLow",
                });
              }
            }}
            checked={props.state === "highToLow" ? true : false}
          />
        </div>
      </div>
    </>
  );
};

const MovieFilter = () => {
  const {
    productDispatch,
    productState: { byRating, byBought, sortByName, sortByPrice, selectedGenres },
  } = CartState();

  // make state for rating

  return (
    <div className="filters mx-0">
      <span className="title text-center">Filter Films</span>
      <Form>
        <h4>Search by genre</h4>
        <div key={`inline-checkbox`} className="mb-3">
          {[
            "Animation",
            "Adventure",
            "Action",
            "Comedy",
            "Crime",
            "Drama",
            "Fantasy",
            "Family",
            "History",
            "Horror",
            "Music",
            "Mystery",
            "Romance",
            "Science Fiction",
            "Thriller",
            "War",
            "Western",
            "Documentary",
          ].map((label, index) => (
            <div key={index} className="ps-4">
              <Form.Check
                inline
                label={label}
                name="group0"
                type="checkbox"
                id={`inline-4`}
                onChange={() => {
                  if (productDispatch) {
                    const updatedGenres = selectedGenres.includes(label)
                      ? selectedGenres.filter((selectedGenre) => selectedGenre !== label)
                      : [...selectedGenres, label];

                    return productDispatch({
                      type: "FILTER_BY_GENRE",
                      payload: updatedGenres,
                    });
                  }
                }}
                checked={selectedGenres.includes(label)}
              />
            </div>
          ))}
        </div>
      </Form>
      <SortFilter
        head={"price"}
        type={"SORT_BY_PRICE"}
        labe1={"Ascending"}
        label2={"Descending"}
        nameGroup={"group1"}
        state={sortByPrice}
      />

      <SortFilter
        head={"name"}
        type={"SORT_BY_NAME"}
        labe1={"A -> Z"}
        label2={"Z -> A"}
        nameGroup={"group2"}
        state={sortByName}
      />

      <div className="pt-2">
        <h4>Others</h4>
        <span>
          <Form.Check
            className="ps-5"
            inline
            label="Include bought"
            name="group2"
            type="checkbox"
            id={`inline-3`}
            onChange={() => {
              if (productDispatch) {
                return productDispatch({
                  type: "FILTER_BY_BOUGHT",
                });
              }
            }}
            checked={byBought}
          />
        </span>
      </div>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) => {
            if (productDispatch) {
              return productDispatch({
                type: "FILTER_BY_RATING",
                payload: i + 1,
              });
            }
          }}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => {
          if (productDispatch) {
            return productDispatch({
              type: "CLEAR_FILTERS",
            });
          }
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default MovieFilter;
