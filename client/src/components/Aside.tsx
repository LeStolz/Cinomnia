import { Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Aside() {
  return (
    <Container
      className="position-sticky w-auto d-flex flex-column p-3 bg-secondary rounded-end-3 shadow-sm"
      style={{
        transition: "0.4s",
        top: "var(--header-size)",
        height: "calc(100vh - var(--header-size) - 16px)",
      }}
    >
      <span className="d-none d-md-block fs-4">Dashboard</span>
      <hr className="mt-2 d-none d-md-block" />
      <Nav variant="pills" className="flex-column">
        <Nav.Item aria-current="page">
          <Nav.Link as={NavLink} to="/dashboard/film-crud">
            <i className="bi bi-film me-md-2"></i>
            <span className="d-none d-md-inline ms-2 pe-lg-5">
              Manage Films
            </span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/dashboard/genre-crud">
            <i className="bi bi-bookmarks-fill me-md-2"></i>
            <span className="d-none d-md-inline ms-2 pe-lg-5">
              Manage Genres
            </span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/dashboard/user-crud">
            <i className="bi bi-people-fill me-md-2"></i>
            <span className="d-none d-md-inline ms-2 pe-lg-5">
              Manage Users
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
