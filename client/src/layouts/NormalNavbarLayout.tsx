import { Header } from "../components/Header/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export function NormalNavbarLayout() {
  return (
    <>
      <Header normal />
      <Container className="p-0">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
