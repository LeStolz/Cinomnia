import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Card } from "react-bootstrap";

export function AuthLayout() {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 p-0 m-0"
        style={{backgroundImage:
          "url('https://cdn.dribbble.com/users/3366330/screenshots/7150087/media/132a4969e541d757b1189f435e9a6cbe.jpg')",
      }}
      >
        <div
          className="position-absolute min-vh-100 min-vw-100"
          style={{ backdropFilter: "blur(1rem)" }}
        ></div>
      
        <Card className="" style={{ zIndex: 1 }}>
          <Card.Body className="p-0">
            <Outlet />
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}