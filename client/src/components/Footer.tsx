import { Button, Container, Image } from "react-bootstrap";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Container fluid className="shadow-lg position-relative z-1 bg-secondary">
      <Container
        className="mx-auto py-3 d-flex flex-column"
        style={{ width: "90%" }}
      >
        <Container className="d-flex justify-content-between ">
          <Container>
            <a
              href="/"
              className="d-flex align-items-center p-0 text-decoration-none"
            >
              <Image alt="logo" src={logo} width="50rem" />
              <span className="ms-3 h5 fw-bold">Cinomnia</span>
            </a>
            <p className="my-3" style={{ width: "250px" }}>
              We are creating High Quality Resources and tools to Aid developers
              during the developement of their projects
            </p>
            <Container className="d-flex mt-4">
              <Button variant="dark">
                <i className="bi bi-facebook me-2"></i>
              </Button>
              <Button variant="dark" className="mx-3">
                <i className="bi bi-twitter me-2"></i>
              </Button>
              <Button variant="dark" className="p-2">
                <i className="bi bi-google me-2"></i>
              </Button>
            </Container>
          </Container>
          <Container>
            <p className="h5 mb-4 fw-bold">Cinomnia</p>
            <Container
              className="d-flex flex-column p-0"
              style={{ cursor: "pointer" }}
            >
              <Link to="/" className="text-decoration-none">
                Resources
              </Link>
              <Link to="/about" className="text-decoration-none">
                About Us
              </Link>
              <Link to="/" className="text-decoration-none">
                Contact
              </Link>
              <Link to="/" className="text-decoration-none">
                Blog
              </Link>
            </Container>
          </Container>
          <Container>
            <p className="h5 mb-4 fw-bold">Help</p>
            <Container
              className="d-flex flex-column p-0"
              style={{ cursor: "pointer" }}
            >
              <Link to="/" className="text-decoration-none">
                Support
              </Link>
              <Link to="/signup" className="text-decoration-none">
                Sign Up
              </Link>
              <Link to="/login" className="text-decoration-none">
                Sign In
              </Link>
            </Container>
          </Container>
          <Container>
            <p className="h5 mb-4 fw-bold">Products</p>
            <Container
              className="d-flex flex-column p-0"
              style={{ cursor: "pointer" }}
            >
              <Link to="/" className="text-decoration-none">
                Windframe
              </Link>
              <Link to="/" className="text-decoration-none">
                Loop
              </Link>
              <Link to="/" className="text-decoration-none">
                Contrast
              </Link>
            </Container>
          </Container>
        </Container>
        <small className="text-center mt-5">
          &copy; Cinomnia, 2023. All rights reserved.
        </small>
      </Container>
    </Container>
  );
}
