import { Header } from "../components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

type NavbarLayoutProps = {
  fade: boolean;
};

export function NavbarLayout({ fade }: NavbarLayoutProps) {
  return (
    <>
      <Header fade={fade} />
      <Container fluid className="p-0 min-vh-100">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
