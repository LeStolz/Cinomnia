import { Button, Form } from "react-bootstrap";
import { CartState } from "../../contexts/Context";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import { FilterModel } from "../../pages/Filter/FilterModel";
import { Genre } from "../../configs/Model";
import "./filterStyle.scss"

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
            label={props.label1}
            name={props.nameGroup}
            type="radio"
            id={`${props.label1}`}
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
            id={`${props.label2}`}
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
    productState: {
      byRating,
      byBought,
      sortByName,
      sortByPrice,
      selectedGenres,
    },
  } = CartState();

  const [genresFromDb, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await FilterModel.getGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const genresName = genresFromDb.map((elm) => elm.name);

  // make state for rating

  return (
    <div className="filters mx-0">
      <span className="title text-center">Filter Films</span>
      <Form>
        <h4>Search by genre</h4>
        <div key={`inline-checkbox`} className="mb-3">
          {genresName.map((label, index) => (
            <div key={index} className="ps-4">
              <label htmlFor={`checkbox-${index}`}>
                <Form.Check
                  inline
                  label={label}
                  name="group0"
                  type="checkbox"
                  id={`checkbox-${index}`}
                  onChange={() => {
                    if (productDispatch) {
                      const updatedGenres = selectedGenres.includes(label)
                        ? selectedGenres.filter(
                            (selectedGenre) => selectedGenre !== label
                          )
                        : [...selectedGenres, label];

                      return productDispatch({
                        type: "FILTER_BY_GENRE",
                        payload: updatedGenres,
                      });
                    }
                  }}
                  checked={selectedGenres.includes(label)}
                />
              </label>
            </div>
          ))}
        </div>
      </Form>
      <SortFilter
        head={"price"}
        type={"SORT_BY_PRICE"}
        label1={"Ascending"}
        label2={"Descending"}
        nameGroup={"group1"}
        state={sortByPrice}
      />

      <SortFilter
        head={"name"}
        type={"SORT_BY_NAME"}
        label1={"A -> Z"}
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
