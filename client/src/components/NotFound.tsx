import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Container className="d-flex align-items-center justify-content-center text-center min-vh-100">
      <Row>
        <Col>
          <h1 className="display-5">404 - Page Not Found</h1>
          <p className="lead">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p>Let's go back to the home page.</p>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
