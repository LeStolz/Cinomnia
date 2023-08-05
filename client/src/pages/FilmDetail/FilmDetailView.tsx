import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

export function FilmDetailView() {
  return (
    <>
      <Container className="rounded" fluid>
        <Row className="d-none d-md-block">
          <video
            src="https://placehold.co/1400x342.mp4"
            className="mb-3 w-100 h-auto"
          ></video>
        </Row>

        <Row className="">
          <Col className="order-1 col-lg-4 col-sm-12">
            <Card className="bg-secondary rounded">
              <Card.Title className="text-center mb-0 py-2 fs-2 bg-light-subtle">
                Film's Title
              </Card.Title>
              <Card.Text>
                <Carousel data-bs-theme="dark">
                  <Carousel.Item>
                    <Image
                      src="https://placehold.co/470x200"
                      className="h-100 w-100"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      src="https://placehold.co/470x200"
                      className="h-100 w-100"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      src="https://placehold.co/470x200"
                      className="h-100 w-100"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                </Carousel>

                <ul className="list-unstyled fw-bold ps-2 mt-3">
                  <li className="fw-light">
                    <span className="fw-bold">Type</span>: TV
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Episodes:</span> 64
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Status:</span> Finished Airing
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Aired:</span> Apr 5, 2009 to Jul
                    4, 2010
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Premiered:</span>{" "}
                    <Link to="">Spring 2019</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Broadcast:</span> Sundays at 17:00
                    (JST)
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Producers:</span>{" "}
                    <Link to="">Aniplex </Link>, <Link to="">Square Enix</Link>,{" "}
                    <Link to="">Mainichi Broadcasting System</Link>,{" "}
                    <Link to="">Studio Moriken</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Licensors:</span>{" "}
                    <Link to="">Funimation</Link>,{" "}
                    <Link to="">Aniplex of America</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Source:</span> Manga
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Genres:</span>{" "}
                    <Link to="">Action</Link>, <Link to="">Adventure</Link>,{" "}
                    <Link to="">Drama</Link>, <Link to="">Fantasy</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Theme:</span>{" "}
                    <Link to="">Military</Link>
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Duration:</span> 24min. per ep
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Rating:</span> R - 17+ (violent &
                    profanity)
                  </li>
                </ul>
              </Card.Text>
            </Card>

            <Card className="mt-3 bg-secondary rounded">
              <Card.Title className="text-center py-2 bg-light-subtle">
                Statistics
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled fw-bold ps-2">
                  <li>Ranked: #1</li>
                  <li>Popularity: #3</li>
                  <li>Members: 3,192,363</li>
                  <li>Favorites: 218,364</li>
                </ul>
              </Card.Text>
            </Card>
          </Col>

          <Col className="order-2 col-lg-8 col-sm-12 my-md-3 my-lg-0">
            <Card className="bg-secondary rounded">
              <Card.Title className="ps-3 py-2 bg-light-subtle">
                Information
              </Card.Title>
              <Card.Body>
                <Row className="py-sm-2 py-md-0">
                  <Col className="col-md-2 text-center col-sm-12">
                    <h5 className="rounded border bg-secondary p-1">Score</h5>
                    <h3>9.03</h3>
                  </Col>

                  <Col className="">
                    <Row>
                      <div className="d-flex w-100 justify-content-between fs-1 p-1">
                        <h5>Ranked #1</h5>
                        <h5>Popularity #1</h5>
                        <h5>Member 3,192,411</h5>
                      </div>
                    </Row>

                    <Row>
                      <p>
                        <Link to="">Spring 2009</Link> | <Link to="">TV</Link> |{" "}
                        <Link to="">Bones</Link>
                      </p>
                    </Row>
                  </Col>
                </Row>

                <Row className="d-flex mt-3">
                  <Button className="w-25 mx-2">Add to list</Button>
                  <Button className="w-25 mx-2">
                    Review <i className="bi bi-star-fill ps-1" />
                  </Button>
                  <Button className="w-25 mx-2">
                    Episode: 0/64 <i className="bi bi-plus-circle ps-1" />
                  </Button>
                </Row>
              </Card.Body>
            </Card>

            <Card className="bg-secondary my-3 rounded">
              <Card.Title className="py-3 ps-3 bg-light-subtle">
                Sypnosis
              </Card.Title>
              <Card.Text>
                <p className="fs-6 p-3" style={{ textAlign: "justify" }}>
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
              </Card.Text>
            </Card>

            <Card className="bg-secondary my-3 rounded">
              <Card.Title className="p-3 bg-light-subtle">
                Related Film
              </Card.Title>
              <Card.Text>
                <ul className="p-3 list-unstyled">
                  <li className="fw-light">
                    <span className="fw-bold">Adalitation:</span> Fullmetal
                    Alchemist
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Alternative version:</span>{" "}
                    Fullmetal Alchemist
                  </li>
                  <li className="fw-light">
                    <span className="fw-bold">Side story:</span>{" "}
                    <Link to="">Fullmetal Alchemist: Brotherhood Specials</Link>
                    ,{" "}
                    <Link to="">
                      Fullmetal Alchemist: The Sacred Star of Milos
                    </Link>
                  </li>
                </ul>
              </Card.Text>
            </Card>

            <Card className=" bg-secondary my-3 rounded">
              <Card.Title className="p-3 bg-light-subtle">
                Characters & Voice Actors
              </Card.Title>
              <Card.Text className="p-3">
                <div className="d-flex justify-content-between">
                  <small>Characters</small>
                  <small>Actors</small>
                </div>

                <hr />

                <Row className="pb-0 d-flex justify-content-between">
                  <Col className="d-flex pe-0 col-4 w-auto">
                    <Image src="/logo.png" className="w-lg h-md me-2" />
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Eric, Edward</p>
                      </Link>
                      <small className="mt-0">Main</small>
                    </div>
                  </Col>

                  <Col className="d-flex col-4 pe-0 w-auto me-2">
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Park Romi</p>
                      </Link>
                      <small className="mt-0">Japanese</small>
                    </div>
                    <Image src="/logo.png" className="w-lg h-md ms-2" />
                  </Col>
                </Row>

                <hr className="mb-3 mt-0" />

                <Row className="pb-0 d-flex justify-content-between mb-2">
                  <Col className="d-flex pe-0 col-4 w-auto">
                    <Image src="/logo.png" className="w-lg h-md me-2" />
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Eric, Edward</p>
                      </Link>
                      <small className="mt-0">Main</small>
                    </div>
                  </Col>

                  <Col className="d-flex col-4 pe-0 w-auto me-2">
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Park Romi</p>
                      </Link>
                      <small className="mt-0">Japanese</small>
                    </div>
                    <Image src="/logo.png" className="w-lg h-md ms-2" />
                  </Col>
                </Row>
                <hr className="mb-3 mt-0" />
              </Card.Text>
            </Card>

            <Card className="bg-secondary my-3 rounded">
              <Card.Title className="p-3 bg-light-subtle">Staff</Card.Title>
              <Card.Text className="p-3">
                <Row className="pb-0 d-flex justify-content-between w-75">
                  <Col className="d-flex pe-0 col-4 w-auto my-2">
                    <Image src="/logo.png" className="w-lg h-md me-2" />
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Đăng</p>
                      </Link>
                      <small className="mt-0">Slave Owner</small>
                    </div>
                  </Col>

                  <Col className="d-flex col-4 pe-0 w-auto my-2">
                    <Image src="/logo.png" className="w-lg h-md me-2" />
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Thức</p>
                      </Link>
                      <small className="mt-0">Slave</small>
                    </div>
                  </Col>
                </Row>

                <hr className="my-0" />

                <Row className="pb-0 d-flex justify-content-between w-75 mt-2">
                  <Col className="d-flex pe-0 col-4 w-auto">
                    <Image src="/logo.png" className="w-lg h-md me-2" />
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Hậu</p>
                      </Link>
                      <small className="mt-0">Slave</small>
                    </div>
                  </Col>

                  <Col className="d-flex col-4 pe-0 w-auto">
                    <Image src="/logo.png" className="w-lg h-md me-2" />
                    <div>
                      <Link to="" className="text-decoration-none">
                        <p className="mb-0 fw-bold">Vinh</p>
                      </Link>
                      <small className="mt-0">Slave</small>
                    </div>
                  </Col>
                </Row>

                <hr className="mb-3 mt-0" />
              </Card.Text>
            </Card>

            <Card className="bg-secondary my-3 rounded">
              <Card.Title className="p-3 mb-0 bg-light-subtle">
                Review
              </Card.Title>
              <Card.Text className="mt-2">
                <Form.Group
                  className="my-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="What's on your mind?"
                    className=""
                  />
                </Form.Group>

                <Button className="float-end m-2">Publish</Button>
              </Card.Text>
            </Card>

              <Card className="bg-secondary my-3 rounded">
                <Card.Title className="pt-2 ps-2">
                  <Row className="w-auto mt-3">
                    <Col className="d-flex col-4 pe-0 w-auto me-2">
                      <Image src="/logo.png" className="w-lg h-md me-2" />
                      <div>
                        <p className="mb-0 fw-bold">Vinh</p>

                        <small className="mt-0 fw-light fs-6">
                          April 12 at 2:28pm
                        </small>
                      </div>
                    </Col>

                    <Col className="pt-2">
                      <i className="bi bi-trash float-end me-3" />
                      <i className="bi bi-pencil float-end me-3" />
                    </Col>
                  </Row>
                </Card.Title>

                <Card.Text>
                  <p className="pt-2 ps-2">
                    First of all, I have seen the original FMA and although it
                    was very popular and original, the pacing and conclusion did
                    not sit too well with me. Brotherhood is meant to be a
                    remake of the original, this time sticking to the manga all
                    the way through, but there were people who thought it would
                    spoil the franchise. That myth should be dispelled, as
                    there's only one word to describe this series - EPIC.12
                  </p>
                </Card.Text>
              </Card>

              <Card className="bg-secondary my-3 rounded">
                <Card.Title className="pt-2 ps-2">
                  <Row>
                    <Col className="d-flex col-4 pe-0 w-auto me-2 mt-3">
                      <Image src="/logo.png" className="w-lg h-md me-2" />
                      <div>
                        <p className="mb-0 fw-bold">Vinh</p>

                        <small className="mt-0 fw-light fs-6">
                          April 12 at 2:28pm
                        </small>
                      </div>
                    </Col>

                    <Col className="pt-2">
                      <i className="bi bi-trash float-end me-3" />
                      <i className="bi bi-pencil float-end me-3" />
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Text>
                  <p className="pt-2 ps-2">
                    Fullmetal Alchemist: Brotherhood gets an immense amount of
                    praise in the MAL community. Now this is just the opinion of
                    one guy. I'm certainly not the law of the land or anything.
                    However, I personally feel as though calling FMA:B a
                    masterpiece and the champion of all shows is a bit of a
                    stretch. 12
                  </p>
                </Card.Text>
              </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}