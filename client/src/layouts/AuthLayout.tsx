import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export function AuthLayout() {
  return (
    <>
      <Container
        fluid
        className="min-vh-100 p-0 m-0"
      >
            <Outlet />
      </Container>
      <Footer />
    </>
  );
}
