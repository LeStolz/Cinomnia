import { Header } from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Aside } from "../components/Aside";

export function DashboardLayout() {
  return (
    <>
      <Header fade={false} />
      <Container
        fluid
        className="p-0"
        style={{ minHeight: "calc(100vh - var(--header-size))" }}
      >
        <Row className="p-0 m-0">
          <Col className="p-0 m-0" xs="auto">
            <Aside />
          </Col>
          <Col className="p-0 m-0">
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
