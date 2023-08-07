import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Image } from "react-bootstrap";
import "./WatchHistory.scss";

export function WatchHistoryView() {
  return (
    <>
      <h2>Watch History</h2>

      <Container>
        <Row>
          <Col className="order-lg-1 order-sm-2 col-lg-8 col-sm-12">
            <h4 id="type">Watched</h4>

            <Row className="d-sm-flex justify-content-center">
              <Col className="d-flex justify-content-center col-5">
                <Image
                  src="https://placehold.co/240x150"
                  className="w-100 h-100 flex-grow-1"
                />
              </Col>

              <Col className="pt-2 d-none d-md-block col-7 my-2">
                <h3 className="d-flex justify-content-between">
                  Fight Club <i className="bi bi-x-lg me-4" id="delete" />
                </h3>
                <h5>David Fincher</h5>
                <p className="overflow-hidden">
                  A depressed man (Edward Norton) suffering from insomnia meets
                  a strange soap salesman named Tyler Durden (Brad Pitt) and
                  soon finds himself living in his squalid house after his
                  perfect apartment is destroyed.
                </p>
              </Col>
            </Row>

            <Row className="d-sm-flex justify-content-center my-2">
              <Col className="d-flex justify-content-center col-5">
                <Image
                  src="https://placehold.co/240x150"
                  className="w-100 h-100 flex-grow-1"
                />
              </Col>

              <Col className="pt-2 d-none d-md-block col-7">
                <h3 className="d-flex justify-content-between">
                  Blade Runner 2049{" "}
                  <i className="bi bi-x-lg me-4" id="delete" />
                </h3>
                <h5>Denis Villeneuve</h5>
                <p className="overflow-hidden">
                  Young Blade Runner K's discovery of a long-buried secret leads
                  him to track down former Blade Runner Rick Deckard, who's been
                  missing for thirty years.
                </p>
              </Col>
            </Row>
          </Col>

          <Col className="order-lg-2 order-sm-1 col-lg-4 col-sm-12">
            <h4>History type</h4>
            <Form.Group>
              <hr />
              <Form.Check
                id="watched"
                name="type"
                label="Watched"
                type="radio"
              />
              <hr />
              <Form.Check
                id="watching"
                name="type"
                label="Watching"
                type="radio"
              />
              <hr />
              <Form.Check id="bought" name="type" label="Bought" type="radio" />
              <hr />
            </Form.Group>

            <div className="rounded my-3 w-75" id="option">
              <i className="bi bi-trash me-2" />
              Clear all watch history
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
