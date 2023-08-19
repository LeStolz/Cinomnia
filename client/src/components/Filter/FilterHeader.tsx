import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../../contexts/Context";
import "./filterStyle.scss";
import { useEffect, useState } from "react";
import { productType } from "../../contexts/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
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
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              type="search"
              placeholder="Search a film..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                if (productDispatch) {
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }
              }}
            />
          </Navbar.Text>
        )}
        <Nav>
          <Dropdown align={"end"}>
            <Dropdown.Toggle variant="btn btn-outline-primary">
              <i className="bi bi-cart-fill" color="white"></i>
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  <div>
                    <span className="title">
                      Subtotal ({cart.length}) items
                    </span>
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
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
