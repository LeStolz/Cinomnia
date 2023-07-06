import { Header } from "../components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export function NavbarLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
