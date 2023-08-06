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

const actor = {
  id: 132157,
  name: "Ezra Miller",
  biography:
    "Ezra Matthew Miller (born September 30, 1992) is an American actor. Their feature film debut was in Afterschool (2008), which they followed by starring in the dramas We Need to Talk About Kevin (2011) and The Perks of Being a Wallflower (2012).\n\nAfter a supporting role in the comedy Trainwreck (2015), Miller played Credence Barebone in the Fantastic Beasts fantasy films Fantastic Beasts and Where to Find Them (2016), Fantastic Beasts: The Crimes of Grindelwald (2018), and Fantastic Beasts: The Secrets of Dumbledore (2022). In 2020, they had a recurring role on the miniseries The Stand. Miller played the Flash in the DC Extended Universe, including in the films Justice League (2017) and The Flash (2023).",
  birthday: "1992-09-30",
  gender: "Non-binary",
  img: "https://image.tmdb.org/t/p/w500/hLtxNK8eeWZkFSeaAASFWm15Qv0.jpg",
  crews: [
    {
      id: 75090,
      character: "Eddie 'Gonzo' Gilman",
      img_character:
        "https://image.tmdb.org/t/p/w500//aZeOKKcFl2g48ioDk4wZrY6rwpZ.jpg",
    },
    {
      id: 298618,
      character: "Barry Allen / The Flash",
      img_character:
        "https://image.tmdb.org/t/p/w500//yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    },
    {
      id: 759910,
      character: "Jay",
      img_character: "https://image.tmdb.org/t/p/w500/null",
    },
    {
      id: 8926,
      character: "Robert",
      img_character:
        "https://image.tmdb.org/t/p/w500//aH7aikfUkIbcBoZXJUMsf8fzhQe.jpg",
    },
    {
      id: 1036843,
      character: "Barry Allen / The Flash",
      img_character: "https://image.tmdb.org/t/p/w500/null",
    },
    {
      id: 1155289,
      character: "Self",
      img_character: "https://image.tmdb.org/t/p/w500/null",
    },
    {
      id: 71859,
      character: "Kevin Khatchadourian, Teenager",
      img_character:
        "https://image.tmdb.org/t/p/w500//k7lwdrpZ92BDahx6TLdkPE65cpJ.jpg",
    },
    {
      id: 84892,
      character: "Patrick",
      img_character:
        "https://image.tmdb.org/t/p/w500//qb6WoLJ9YtfhV7pgsTfUDlRYaCH.jpg",
    },
    {
      id: 253161,
      character: "Leon Dupuis",
      img_character:
        "https://image.tmdb.org/t/p/w500//eevB0urLnEpuGSu2GDHXcxEmbaA.jpg",
    },
    {
      id: 308032,
      character: "Daniel Culp / Prisoner 8612",
      img_character:
        "https://image.tmdb.org/t/p/w500//b0p0OPx1ZDZVc8iDB1kle0Cc2H9.jpg",
    },
    {
      id: 45077,
      character: "Jonah",
      img_character:
        "https://image.tmdb.org/t/p/w500//eNmoAIVeAIlFVR4OqYuSsLiZpW9.jpg",
    },
    {
      id: 338953,
      character: "Credence Barebone / Aurelius Dumbledore",
      img_character:
        "https://image.tmdb.org/t/p/w500//zGLHX92Gk96O1DJvLil7ObJTbaL.jpg",
    },
    {
      id: 28053,
      character: 'Vincent "Vinnie" Rizzo, Jr.',
      img_character:
        "https://image.tmdb.org/t/p/w500//vy0vzHqPF4PsEip4IF4zwhKNy4P.jpg",
    },
    {
      id: 60422,
      character: "Elliot",
      img_character:
        "https://image.tmdb.org/t/p/w500//eAXlPAnBnyjtoXNA9vFggU2IKWF.jpg",
    },
    {
      id: 141052,
      character: "The Flash / Barry Allen",
      img_character:
        "https://image.tmdb.org/t/p/w500//2nyaeISu2xIxIgZYNpX4UayY8PN.jpg",
    },
    {
      id: 791373,
      character: "Barry Allen / The Flash",
      img_character:
        "https://image.tmdb.org/t/p/w500//pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg",
    },
    {
      id: 825672,
      character: "Mark Vanderhill",
      img_character:
        "https://image.tmdb.org/t/p/w500//7Xukh3pcZWjrXD5HimLHuAsUZfY.jpg",
    },
    {
      id: 338952,
      character: "Credence Barebone",
      img_character:
        "https://image.tmdb.org/t/p/w500//qrtRKRzoNkf5vemO9tJ2Y4DrHxQ.jpg",
    },
    {
      id: 522925,
      character: "Young Salvador Dalí",
      img_character:
        "https://image.tmdb.org/t/p/w500//dkRqcErje4ffPSso7wuoheycotC.jpg",
    },
    {
      id: 271718,
      character: "Donald",
      img_character:
        "https://image.tmdb.org/t/p/w500//aI0fOlVoWNkEZ6rq90gqxoviOsh.jpg",
    },
    {
      id: 259316,
      character: "Credence Barebone",
      img_character:
        "https://image.tmdb.org/t/p/w500//8Qsr8pvDL3s1jNZQ4HK1d1Xlvnh.jpg",
    },
    {
      id: 297761,
      character: "Barry  Allen / The Flash",
      img_character:
        "https://image.tmdb.org/t/p/w500//zC70x9wqPPtxU99HsoGsxQ8IhSw.jpg",
    },
    {
      id: 209112,
      character: "Barry Allen / The Flash",
      img_character:
        "https://image.tmdb.org/t/p/w500//5fX1oSGuYdKgwWmUTAN5MNSQGzr.jpg",
    },
  ],
};

export function ActorInfo() {
  return (
    <>
      <Container>
        <Container className="actor p-0">
          <Card className="pb-2">
            <Card.Header className="pt-3 ps-0">
              <Card.Title id="name" className="fs-1">
                {actor.name}
              </Card.Title>
              <Card.Text id="job">Actor</Card.Text>
            </Card.Header>

            <div className="d-flex">
              <div className="pe-2 w-100">
                <Image src="https://placehold.co/125x43" className="w-100" />
              </div>
              <div className="d-flex flex-sm-column justify-content-between w-50">
                <CarouselFilm slides={actor.crews} />

                <CarouselFilm slides={actor.crews} />
              </div>
            </div>

            <div className="d-flex">
              <Card.Body className="ps-0 w-75">
                <Card.Title className="fs-4">Biography</Card.Title>
                <Card.Text>
                  <ReadMore>{actor.biography}</ReadMore>
                </Card.Text>
              </Card.Body>

              <Card.Body className="ps-0 bg-body-secondary ps-0 w-75">
                <Card.Title className="fs-4 ps-3">Overview</Card.Title>
                <ul className="list-unstyled fw-bold ps-3">
                  <li>Gender: {actor.gender}</li>
                  <li>Birth name: {actor.birthday}</li>
                </ul>
              </Card.Body>
            </div>
          </Card>
        </Container>

        <Container className="bg-body-secondary" fluid>
          <Card.Title className="fs-3 ps-2 pe-4 pb-2 pt-4">
            Movies Related
          </Card.Title>
          <Film movies={actor.crews} />
        </Container>
      </Container>
    </>
  );
}
