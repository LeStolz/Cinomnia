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
          <Col className="col-8">
            <h4 id="type">Watched</h4>
            <div className="d-flex my-3 bg-secondary rounded" id="film">
              <Image
                src="https://ychef.files.bbci.co.uk/976x549/p07h2zhs.jpg"
                className="w-50 h-auto rounded"
              />

              <div className="ms-3 pt-2 ">
                <h3 className="d-flex justify-content-between">Fight Club <i className="bi bi-x-lg me-4" id="delete"></i></h3>
                <h5>David Fincher</h5>
                <p className="overflow-hidden">
                  A depressed man (Edward Norton) suffering from insomnia meets
                  a strange soap salesman named Tyler Durden (Brad Pitt) and
                  soon finds himself living in his squalid house after his
                  perfect apartment is destroyed.
                </p>
              </div>
            </div>

            <div className="d-flex my-3 bg-secondary rounded" id="film">
              <Image
                src="https://i.ytimg.com/vi/hbpREOCDCSY/maxresdefault.jpg"
                className="w-50 h-auto rounded"
              />

              <div className="ms-3 pt-2">
              <h3 className="d-flex justify-content-between">Blade Runner 2049 <i className="bi bi-x-lg me-4"></i></h3>
                <h5>Denis Villeneuve</h5>
                <p>
                  Young Blade Runner K's discovery of a long-buried secret leads
                  him to track down former Blade Runner Rick Deckard, who's been
                  missing for thirty years.
                </p>
              </div>
            </div>
          </Col>

          <Col className="col-4">
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
                <Form.Check
                  id="bought"
                  name="type"
                  label="Bought"
                  type="radio"
                />
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