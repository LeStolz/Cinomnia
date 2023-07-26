import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export function DetailFilmView() {
  return (
    <>
      <Container className="bg-light text-dark rounded">
        <Col>
          <Row>
            <Image src="holder.js/1423px342 rounded" fluid />
          </Row>

          <Row className="shadow">
            <Col xs={4} className="">
              <h3 className="text-center">Film's Title</h3>

              <video
                src="https://www.youtube.com/watch?v=1rC9Wh4-RfQ"
                className="object-fit-cover"
              ></video>

              <ul className="list-unstyled fw-bold">
                <li>Type:</li>
                <li>Episodes:</li>
                <li>Status:</li>
                <li>Aired:</li>
                <li>Premiered:</li>
                <li>Broadcast:</li>
                <li>Producers:</li>
                <li>Licensors:</li>
                <li>Source:</li>
                <li>Genres:</li>
                <li>Theme:</li>
                <li>Duration:</li>
                <li>Rating:</li>
              </ul>

              <h3 className="text-center">Statistics</h3>

              <ul className="list-unstyled fw-bold">
                <li>Ranked:</li>
                <li>Popularity:</li>
                <li>Members:</li>
                <li>Favorites:</li>
              </ul>

              <h3 className="text-center">Available at</h3>

              <ul className="list-unstyled">
                <li>Social Network</li>
                <li>Resource</li>
                <li>Streaming Platform</li>
              </ul>
            </Col>

            <Col xs={8} className="my-3">
              <h3 className="text-start">Information</h3>

              <Row className="d-flex p-3 shadow py-0">
                <Card className="bg-light text-dark w-25">
                  <Card.Body>
                    <Card.Title>Score</Card.Title>
                    <Card.Text>#</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="bg-light text-dark w-25">
                  <Card.Body>
                    <Card.Title>Ranked</Card.Title>
                    <Card.Text>#</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="bg-light text-dark w-25">
                  <Card.Body>
                    <Card.Title>Popularity</Card.Title>
                    <Card.Text>#</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="bg-light text-dark w-25">
                  <Card.Body>
                    <Card.Title>Members</Card.Title>
                    <Card.Text>#</Card.Text>
                  </Card.Body>
                </Card>
              </Row>

              <Row className="p-3 shadow my-3">
                <h3 className="text-start">Sypnosis</h3>
                <p className="fs-6">
                  After a horrific alchemy experiment goes wrong in the Elric
                  household, brothers Edward and Alphonse are left in a
                  catastrophic new reality. Ignoring the alchemical principle
                  banning human transmutation, the boys attempted to bring their
                  recently deceased mother back to life. Instead, they suffered
                  brutal personal loss: Alphonse's body disintegrated while
                  Edward lost a leg and then sacrificed an arm to keep
                  Alphonse's soul in the physical realm by binding it to a
                  hulking suit of armor.The brothers are rescued by their
                  neighbor Pinako Rockbell and her granddaughter Winry. Known as
                  a bio-mechanical engineering prodigy, Winry creates prosthetic
                  limbs for Edward by utilizing "automail," a tough, versatile
                  metal used in robots and combat armor. After years of
                  training, the Elric brothers set off on a quest to restore
                  their bodies by locating the Philosopher's Stone—a powerful
                  gem that allows an alchemist to defy the traditional laws of
                  Equivalent Exchange.As Edward becomes an infamous alchemist
                  and gains the nickname "Fullmetal," the boys' journey embroils
                  them in a growing conspiracy that threatens the fate of the
                  world.[Written by MAL Rewrite]
                </p>
              </Row>

              <Row className="shadow my-3 p-3">
                <dl>
                  <h3>Related Film</h3>
                  <div className="ps-3">
                    <p>Adaptation:</p>
                    <p>Alternative version:</p>
                    <p>Side story:</p>
                  </div>
                </dl>
              </Row>

              <Row className="my-3 p-3 shadow">
                <h3>Characters & Voice Actors</h3>
                <Row>
                  <Col>
                    <small>Characters</small>
                    <small className="float-end">Actors</small>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold"
                    >
                      Eric, Edward
                    </Link>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold float-end"
                    >
                      Park, Romi
                    </Link>
                    <p className="mb-0">
                      <small>Main</small>
                      <small className="float-end">Japanese</small>
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold"
                    >
                      Eric, Edward
                    </Link>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold float-end"
                    >
                      Park, Romi
                    </Link>
                    <p className="mb-0">
                      <small>Main</small>
                      <small className="float-end">Japanese</small>
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold"
                    >
                      Eric, Edward
                    </Link>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold float-end"
                    >
                      Park, Romi
                    </Link>
                    <p className="mb-0">
                      <small>Main</small>
                      <small className="float-end">Japanese</small>
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold"
                    >
                      Eric, Edward
                    </Link>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold float-end"
                    >
                      Park, Romi
                    </Link>
                    <p className="mb-0">
                      <small>Main</small>
                      <small className="float-end">Japanese</small>
                    </p>
                  </Col>
                </Row>
              </Row>

              <Row className="shadow my-3 p-3">
                <h3>Staff</h3>
                <Row>
                  <Col>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold"
                    >
                      Eric, Edward
                    </Link>
                    <Link
                      to=""
                      className="text-decoration-none text-dark fw-bold float-end"
                    >
                      Park, Romi
                    </Link>
                    <p className="mb-0">
                      <small>Main</small>
                      <small className="float-end">Japanese</small>
                    </p>
                  </Col>
                </Row>
              </Row>

              <Row className="shadow my-3 p-3">
                <h3>Review</h3>
                <hr />
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="What's on your mind?"
                    className="bg-light text-dark"
                  />
                </Form.Group>
              </Row>

              <Row className="my-3 p-3 shadow">
                <Col xs={1}>
                  <Image src="/logo.png" rounded className="w-lg" />
                </Col>
                <Col className="mb-2">
                  <p className="fw-bold mb-0">Tazillo</p>
                  <small className="fw-light">April 12 at 2:28pm</small>
                </Col>

                <p>
                  First of all, I have seen the original FMA and although it was
                  very popular and original, the pacing and conclusion did not
                  sit too well with me. Brotherhood is meant to be a remake of
                  the original, this time sticking to the manga all the way
                  through, but there were people who thought it would spoil the
                  franchise. That myth should be dispelled, as there's only one
                  word to describe this series - EPIC.12
                </p>
              </Row>

              <Row className="my-3 p-3 shadow">
                <Col xs={1}>
                  <Image src="/logo.png" rounded className="w-lg" />
                </Col>
                <Col className="mb-2">
                  <p className="fw-bold mb-0">ChirssyKay</p>
                  <small className="fw-light">April 12 at 2:28pm</small>
                </Col>

                <p>
                  Fullmetal Alchemist: Brotherhood gets an immense amount of
                  praise in the MAL community. Now this is just the opinion of
                  one guy. I'm certainly not the law of the land or anything.
                  However, I personally feel as though calling FMA:B a
                  masterpiece and the champion of all shows is a bit of a
                  stretch. 12
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
}
