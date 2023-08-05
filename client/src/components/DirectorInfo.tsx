import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { Film } from "./Film";
import CarouselFilm from "./CarouselFilm";

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

const director = {
  id: 1113116,
  name: "Andy Muschietti",
  biography:
    "Andrés Walter Muschietti, better known as Andy Muschietti (Vicente López, Buenos Aires, Argentina, August 26, 1973), is an Argentine film director, screenwriter and publicist. He studied at the Universidad de Cine (FUC) and began his career with a small role as a production assistant in Evita (1996), by Alan Parker and as a director in Historias Breves, a short film competition promoted by the National Institute of Cinema and Arts. Audiovisuals (INCAA).\n\nHe is known for his work in horror films such as Mama (2013), It (2017), an adaptation of Stephen King's novel and its sequel, It Chapter Two (2019) and The Flash (2023).\n\nHe is the brother of Bárbara Muschietti, who works as a producer for his films.",
  birthday: "1973-08-26",
  gender: "Male",
  img: "https://image.tmdb.org/t/p/w500/mzOMGWzqFFLqIqa2WkDv5I1IxHE.jpg",
  crews: [
    {
      id: 140656,
      job: "Director",
    },
    {
      id: 132232,
      job: "Director",
    },
    {
      id: 346364,
      job: "Director",
    },
    {
      id: 474350,
      job: "Director",
    },
    {
      id: 557692,
      job: "Director",
    },
    {
      id: 298618,
      job: "Director",
    },
    {
      id: 662548,
      job: "Director",
    },
    {
      id: 878790,
      job: "Director",
    },
    {
      id: 955409,
      job: "Director",
    },
    {
      id: 745739,
      job: "Director",
    },
    {
      id: 1123778,
      job: "Director",
    },
    {
      id: 1081004,
      job: "Director",
    },
    {
      id: 581837,
      job: "Assistant Director",
    },
    {
      id: 127435,
      job: "Second Assistant Director",
    },
  ],
};

export function DirectorInfo() {
  return (
    <>
      <Container>
        <Container className="actor p-0">
          <Card className="pb-2">
            <Card.Header className="pt-3 ps-0">
              <Card.Title id="name" className="fs-1">
                {director.name}
              </Card.Title>
              <Card.Text id="job">Actor</Card.Text>
            </Card.Header>

            <div className="d-flex">
              <div className="pe-2 w-100">
                <Image src="https://placehold.co/125x43" className="w-100" />
              </div>
              <div className="d-flex flex-sm-column justify-content-between w-50">
                <CarouselFilm slides={director.crews} />

                <CarouselFilm slides={director.crews} />
              </div>
            </div>

            <div className="d-flex">
              <Card.Body className="ps-0 w-75">
                <Card.Title className="fs-4">Biography</Card.Title>
                <Card.Text>
                  <ReadMore>{director.biography}</ReadMore>
                </Card.Text>
              </Card.Body>

              <Card.Body className="ps-0 bg-body-secondary ps-0 w-75">
                <Card.Title className="fs-4 ps-3">Overview</Card.Title>
                <ul className="list-unstyled fw-bold ps-3">
                  <li>Gender: {director.gender}</li>
                  <li>Birth name: {director.birthday}</li>
                </ul>
              </Card.Body>
            </div>
          </Card>
        </Container>

        <Container className="bg-body-secondary" fluid>
          <Card.Title className="fs-3 ps-2 pe-4 pb-2 pt-4">
            Movies Related
          </Card.Title>
          <Film movies={director.crews} />
        </Container>
      </Container>
    </>
  );
}
