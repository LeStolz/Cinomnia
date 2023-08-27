import { Button, Container, Carousel, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { Film, Person } from "../../configs/Model";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import "./CastDetail.scss";

const ReadMore = ({ children }: any) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 200) : text}
      <Button onClick={toggleReadMore} className="read-or-hide" variant="link">
        {isReadMore ? "Read More" : " Show Less"}
      </Button>
    </p>
  );
};

interface CastDetailViewProps {
  person: Person | undefined;
  relatedFilms: Film[];
  type: string;
}

export function CastDetailView({
  person,
  relatedFilms,
  type,
}: CastDetailViewProps) {
  console.log(person);
  console.log(relatedFilms);

  const film = relatedFilms.filter(
    (film) => film !== undefined && film !== null
  );
  const navigate = useNavigate();
  if (!person) {
    return <Loading />;
  }
  return (
    <>
      <Container>
        <Container className="actor p-0">
          <Card className="pb-2">
            <Card.Header className="pt-3 ps-0">
              <Card.Title id="name" className="fs-1">
                {person?.name}
              </Card.Title>
              <Card.Text id="job">{type}</Card.Text>
            </Card.Header>

            <Container className="d-flex p-0 align-items-stretch">
              <Col
                xs={9}
                sm={9}
                md={9}
                lg={9}
                className="pe-2 p-0 cast-items position-relative overflow-hidden p-0"
              >
                <Carousel className="cast-slide">
                  {person.crews.map(
                    (crew, index) =>
                      crew.img_character && (
                        <Carousel.Item interval={1500} key={index}>
                          <Image
                            className="w-100"
                            src={
                              crew.img_character.img_1280
                                ? crew.img_character.img_1280
                                : crew.img_character.img_500
                            }
                            onClick={() => navigate(`/player/${crew.id}`)}
                            alt="..."
                          />
                          <Container
                            fluid
                            className="cast-name-overlay position-absolute bottom-0 start-0 w-100 h-25 d-flex align-items-center justify-content-center"
                          >
                            <p className="text-truncate">
                              {crew.job ? crew.job : "undefined"}
                            </p>
                          </Container>
                        </Carousel.Item>
                      )
                  )}
                </Carousel>
              </Col>
              <Col
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="d-flex flex-sm-column justify-content-between p-0"
              >
                <Image className="h-100" src={person.img.img_500} alt="..." />
              </Col>
            </Container>

            <div className="d-flex">
              <Card.Body className="ps-0 w-75">
                <Card.Title className="fs-4">Biography</Card.Title>
                <Card.Text>
                  <ReadMore>{person?.biography}</ReadMore>
                </Card.Text>
              </Card.Body>

              <Card.Body className="ps-0 bg-body-secondary ps-0 w-75">
                <Card.Title className="fs-4 ps-3">Overview</Card.Title>
                <ul className="list-unstyled fw-bold ps-3">
                  <li>Gender: {person?.gender}</li>
                  <li>
                    Birth name:{" "}
                    {new Date(person?.birthday).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </li>
                </ul>
              </Card.Body>
            </div>
          </Card>
        </Container>

        <Container className="p-2 border border-1 bg-secondary rounded shadow">
          <h3>Related Film</h3>
          <Row
            xs={1}
            sm={2}
            md={4}
            lg={5}
            className="justify-content-start p-2"
          >
            {film?.map((movie: Film, index: number) => (
              <Col key={index} className="ps-2 pe-2 mb-4">
                <MovieCard movieData={movie} className="items-scale" />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}
