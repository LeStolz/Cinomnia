import { AccountViewProps } from "./Account";
import { Row, Col, Container, Button, Card } from "react-bootstrap";

export function AccountView({ onSignout }: AccountViewProps) {
  return (
    <Container>
      <Card>
        <Card.Header>My Profile</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="img-fluid rounded-circle"
              />
            </Col>
            <Col md={8}>
              <h2>User Name</h2>
              <p>Email: user@example.com</p>
              <p>Location: City, Country</p>
              <p>
                Website: <a href="#">www.example.com</a>
              </p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={onSignout}>
            Sign out
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
