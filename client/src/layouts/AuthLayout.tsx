import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import {Card} from "react-bootstrap"

export function AuthLayout() {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 p-0 m-0"
      >
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <Outlet />
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
