import { Container, Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export function AuthLayout() {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 p-0 m-0"
      >
        <Card className="bg-secondary shadow-sm">
          <Card.Body className="p-4">
            <Outlet />
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
