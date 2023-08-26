import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Cart } from "./Cart/Cart";
import { CartState } from "../contexts/Context";
import { useAuth } from "../contexts/AuthContext";

type HeaderProps = {
  fade: boolean;
};

export function Header({ fade }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(fade);
  const [showCartModal, setShowCartModal] = useState(false);
  const { productDispatch } = CartState();
  const { getUser } = useAuth();
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, []);

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

  const handleShowCartModal = () => {
    setShowCartModal(true);
  };

  const handleCloseModal = () => {
    setShowCartModal(false);
  };

  return (
    <Navbar
      expand="md"
      className={`mb-3 shadow-sm ${
        fade ? "position-fixed" : "position-sticky top-0"
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
            <Nav.Link as={NavLink} to="/wishlist">
              My List
            </Nav.Link>
            <Nav.Link as={NavLink} to="/filter">
              Filter
            </Nav.Link>
            <Nav.Link
              className={user?.type === "admin" ? "" : "d-none"}
              as={NavLink}
              to="/dashboard"
            >
              Dashboard
            </Nav.Link>
          </Nav>
          <Button
            onClick={setTheme}
            variant="outline-primary"
            className="position-relative rounded-circle w-md h-md me-3 mb-2 mb-md-0"
          >
            <i
              className={`position-absolute-center bi ${
                isDark ? "bi-moon-stars-fill" : "bi-sun-fill"
              }`}
            ></i>
          </Button>
          <Form className="me-3 mb-2 mb-md-0">
            <InputGroup className="position-relative">
              <FormControl
                type="search"
                placeholder="Search film"
                className="rounded-pill pe-3"
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
              <div
                className="position-absolute-center"
                style={{ left: "100%", transform: "translate(-175%, -50%)" }}
              >
                <i className="bi bi-search"></i>
              </div>
            </InputGroup>
          </Form>
          <Cart />
          <Nav.Link as={NavLink} to="/account">
            <Button
              variant="outline-primary"
              className="position-relative rounded-circle w-md h-md"
            >
              <i className="position-absolute-center bi bi-person-fill"></i>
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
