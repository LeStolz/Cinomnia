import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Cart } from "../Cart/Cart";
import './Header.scss'

export function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchKeyNotEmpty, setSearchKeyNotEmpty] = useState(false);

  const navigate = useNavigate();

  const setTheme = () => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      isDark ? "light" : "dark"
    );

    setIsDark(!isDark);
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const searchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyNotEmpty) {
      navigate(`/search/${searchKey}`)
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
      className={`bg-secondary mb-3 position-fixed z-3 w-100 ${
        isScrolled ? "" : "bg-transparent"
      }`}
    >
      <Container id="navbar" className={`${isScrolled ? "scrolled d-flex justify-content-center" : ""}`}>
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
            <Nav.Link as={NavLink} to="/watch_history">
              History
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
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="rounded-start-pill"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                  setSearchKeyNotEmpty(e.target.value.trim() !== "");
                }}
              />
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

          <Button
            variant="outline-primary"
            className="position-relative rounded-circle ms-3 w-md h-md"
          >
            <i className="position-absolute-center bi bi-person-fill"></i>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
