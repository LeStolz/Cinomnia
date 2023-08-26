import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Cart } from "./Cart/Cart";
import { CartState } from "../contexts/Context";

type HeaderProps = {
  fade: boolean;
};

export function Header({ fade }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(fade);
  const [searchKey, setSearchKey] = useState("");
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchKeyNotEmpty, setSearchKeyNotEmpty] = useState(false);
  const { productDispatch } = CartState();

  const navigate = useNavigate();

  const setTheme = () => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      isDark ? "light" : "dark"
    );

    setIsDark(!isDark);
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY <= 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const searchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyNotEmpty) {
      navigate(`/search/${searchKey}`);
    }
  };

  const handleShowCartModal = () => {
    setShowCartModal(true);
  };
  const handleCloseModal = () => {
    setShowCartModal(false);
  };

  return (
    <Navbar
      expand="md"
      className={`mb-3 ${
        fade ? "position-fixed" : "position-sticky"
      } z-3 w-100 ${!fade || isScrolled ? "bg-secondary" : "bg-transparent"}`}
      style={{ transition: "0.4s" }}
    >
      <Container id="navbar">
        <Navbar.Brand as={NavLink} to="/" className="me-3">
          <img alt="Cinomnia" src="/logo.png" className="h-md" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/store">
              Store
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/wishlist">
              Wishlist
            </Nav.Link>
            <Nav.Link as={NavLink} to="/watch-history">
              History
            </Nav.Link>
            <Nav.Link as={NavLink} to="/filter">
              Filter
            </Nav.Link>
          </Nav>
          <Button
            onClick={setTheme}
            variant="outline-primary"
            className="position-relative rounded-circle w-md h-md"
          >
            <i
              className={`position-absolute-center bi ${
                isDark ? "bi-moon-stars-fill" : "bi-sun-fill"
              }`}
            ></i>
          </Button>
          <Form className="ms-3" onSubmit={searchMovies}>
            <InputGroup>
              {useLocation().pathname.split("/")[1] !== "cart" && (
                <Navbar.Text className="search">
                  <FormControl
                    type="search"
                    placeholder="Search a film..."
                    className="rounded-start-pill pe-3 border-outline-primary"
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
              <Button
                variant="outline-primary"
                className="rounded-end-pill pe-3"
                type="submit"
                disabled={!searchKeyNotEmpty}
              >
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
          <Button
            variant="outline-primary"
            className="position-relative rounded-circle ms-3 w-md h-md"
            id="store"
            onClick={handleShowCartModal}
          >
            <i className="position-absolute-center bi bi-cart-fill"></i>
          </Button>

          <Cart show={showCartModal} handleClose={handleCloseModal} />

          <Nav.Link as={NavLink} to="/account">
            <Button
              variant="outline-primary"
              className="position-relative rounded-circle ms-3 w-md h-md"
            >
              <i className="position-absolute-center bi bi-person-fill"></i>
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
