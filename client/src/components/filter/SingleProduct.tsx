import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { productType } from "../context/Context";

const SingleProduct = ({ prod }: { prod: productType }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const price =
    typeof prod.price === "number" ? prod.price.toString() : prod.price;

  return (
    <>
      <div className="products">
        <Card>
          <Card.Img variant="top" src={prod.image} alt={prod.name} />
          <Card.Body>
            <Card.Title>{prod.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <div>$ {price.split(".")[0]}</div>
              <Rating rating={prod.ratings} />
            </Card.Subtitle>
            {cart.some((p: { id: number }) => p.id === prod.id) ? (
              <Button
                variant="danger"
                onClick={() => {
                  if (dispatch) {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prod,
                    });
                  }
                }}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (dispatch) {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: prod,
                    });
                  }
                }}
              >
                Add to Cart
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
