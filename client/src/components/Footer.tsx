import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Container fluid className="bg-secondary p-0 py-3">
      <Container className="">
        <Row className="mb-3">
          <Col>
            <a
              href="/"
              className="d-flex align-items-center p-0 text-decoration-none"
            >
              <Image alt="logo" src="/logo.png" className="h-md" />
              <span className="m-0 ms-3 h5 fw-bold">Cinomnia</span>
            </a>
            <p className="mt-3">
              We are creating High Quality Resources and tools to Aid developers
              during the developement of their projects
            </p>
          </Col>
          <Col className="d-flex justify-content-center">
            <div>
              <h5 className="mt-2 mb-4 fw-bold">Cinomnia</h5>
              <Link to="/about" className="text-decoration-none">
                About Us
              </Link>
              <br />
              <Link to="/" className="text-decoration-none">
                Contact
              </Link>
              <br />
              <Link to="/" className="text-decoration-none">
                Blog
              </Link>
            </div>
          </Col>
          <Col className="d-flex justify-content-center">
            <div>
              <h5 className="mt-2 mb-4 fw-bold">Help</h5>
              <Link to="/" className="text-decoration-none">
                Support
              </Link>
              <br />
              <Link to="/login" className="text-decoration-none">
                Sign In
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <small className="text-center">
            &copy; 2023 Cinomnia. All rights reserved.
          </small>
        </Row>
      </Container>
    </Container>
  );
}
