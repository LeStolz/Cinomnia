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
import { HomeModel } from "../pages/Home/HomeModel";

export function Header() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [searchKeyNotEmpty, setSearchKeyNotEmpty] = useState(false);

  const setTheme = () => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      isDark ? "light" : "dark"
    );

    setIsDark(!isDark);
  };

  const searchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyNotEmpty) {
      try {
        const fetchedMovies = await HomeModel.fetchMovie(searchKey); // merge Home 
        console.log(fetchedMovies);
        navigate("/search", { state: { movies: fetchedMovies } });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Navbar expand="md" className="bg-secondary shadow-sm mb-3">
      <Container>
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
              >
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
          <Button
            variant="outline-primary"
            className="position-relative rounded-circle ms-3 w-md h-md"
          >
            <i className="position-absolute-center bi bi-cart-fill"></i>
          </Button>
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
