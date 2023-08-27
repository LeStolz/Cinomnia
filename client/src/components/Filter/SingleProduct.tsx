import { Card, Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalState";
import Rating from "./Rating";
import { useContext } from "react";
import { Film } from "../../configs/Model";

const SingleProduct = ({ prod }: { prod: Film }) => {
  const { addMovieToStore, removeMovieFromStore, store } =
    useContext(GlobalContext);
  const isMovieInStore = store.some((movie: Film) => movie._id === prod._id);
  const price =
    typeof prod.price === "number" ? prod.price.toString() : prod.price;
  const handleAddToStore = () => {
    if (isMovieInStore) {
      removeMovieFromStore(prod._id);
    } else {
      addMovieToStore(prod);
    }
  };
  return (
    <>
      <div className="products">
        <Card>
          <Card.Img variant="top" src={prod.poster.img_1280} alt={prod.title} />
          <Card.Body>
            <Card.Title>{prod.title}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <div>VND {price.split(".")[0]}</div>
              <Rating
                rating={prod.rating}
                onClick={function (index: number): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Card.Subtitle>
            <Button
              variant={isMovieInStore ? "outline-light" : "primary"}
              title={isMovieInStore ? "Remove from Cart" : "Add to Cart"}
              className={`position-relative rounded me-1 ${
                isMovieInStore ? "border border-2" : ""
              }`}
              onClick={handleAddToStore}
            >
              {isMovieInStore ? "Remove From Cart" : "Add To Cart"}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
