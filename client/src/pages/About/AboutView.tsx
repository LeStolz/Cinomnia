import { Row, Col, Container } from "react-bootstrap";
import { Image } from "react-bootstrap";

export function AboutView() {
  return (
    <>
      <Container>
        <Row className="bg-secondary mb-3">
          <Col className="ms-0 py-3 ps-3">
            <h2>About Cinomnia</h2>
            <h4 className="mt-2">Your new favourite streaming site</h4>

            <p className="mt-4">
              In the world of entertainment, a groundbreaking concept has
              emerged – <strong>Cinomnia</strong>. Born from the fusion of "Cinema," the art of
              storytelling through motion pictures, and "Omnia," the Latin word
              for "everything" or "all," Cinomnia is your portal to a
              comprehensive cinematic experience that encapsulates every facet
              of the human experience.
            </p>

            <p className="mt-4">
              As we step into the captivating world of Cinomnia, be prepared to
              embark on an extraordinary journey where the boundaries between
              cinematic storytelling and the totality of human existence
              dissolve into an awe-inspiring tapestry of imagination. Cinomnia
              transcends traditional cinematic boundaries to encompass the full
              spectrum of human emotion, action, and thought.
            </p>

            <p className="mt-4">
              This is the dawn of a cinematic adventure like no other, where
              every frame is a window into the vastness of human experience,
              where every story told on the silver screen reflects the richness
              of life itself. Welcome to Cinomnia, where cinema embraces the
              entirety of existence, offering a truly all-encompassing cinematic
              voyage.
              <div className="d-flex justify-content-center mt-5">
                <h3><i className="bi bi-facebook mx-4" /></h3>
                <h3><i className="bi bi-instagram mx-4" /></h3>
                <h3><i className="bi bi-twitter mx-4" /></h3>
              </div>
            </p>
          </Col>

          <Col className="p-0 d-none d-md-block">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BYjgxYjI1ODktNWYyNy00N2EyLWFhOWEtMmI1ZmU3ZmU5ZWFjXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg"
              className="h-100 w-100"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}