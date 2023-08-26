import {
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { CartState } from "../../contexts/Context";
import "./CartComponentStyle.scss";
import { useEffect, useState } from "react";
import { productType } from "../../contexts/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc: number, curr: productType) => acc + Number(curr.price) * curr.qty,
        0
      )
    );
  }, [cart]);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav>
          {cart.length > 0 ? (
            <>
              <div>
                {cart.map((prod: any) => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>
                        ${" "}
                        {typeof prod.price === "number"
                          ? prod.price.toString().split(".")[0]
                          : ""}
                      </span>
                    </div>
                    <i
                      className="bi bi-trash3-fill"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (dispatch) {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          });
                        }
                      }}
                    />
                    <i />
                  </span>
                ))}

                <span
                  style={{ fontWeight: 700, fontSize: 20 }}
                  className="total"
                >
                  Total: $ {total}
                </span>
              </div>
            </>
          ) : (
            <span style={{ padding: 10 }}>Cart is Empty!</span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
