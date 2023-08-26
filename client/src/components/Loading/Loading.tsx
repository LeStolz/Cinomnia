import { Container, Image } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";
import "./Loading.scss";

type LoadingProps = {
  children: JSX.Element;
  duration: number;
  reverse: boolean;
};

type TagProps = {
  text: string;
};

const InfiniteLoopSlider = ({
  children,
  duration,
  reverse = false,
}: LoadingProps) => {
  return (
    <Container
      fluid
      className="loop-slider p-0"
      style={
        {
          "--duration": `${duration}ms`,
          "--direction": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      } // Use "as React.CSSProperties" to assert the style type
    >
      <Container fluid className="inner p-0">
        {children}
        {children}
      </Container>
    </Container>
  );
};

const Tag = ({ text }: TagProps) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
);

export function Loading() {
  const TAGS = [
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Adventure",
    "Action",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Science Fiction",
    "Romance",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
    "Drama",
    "Family",
  ];
  const DURATION = 100000;
  const ROWS = 5;
  const TAGS_PER_ROW = 100;

  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const shuffle = (arr: []) => [...arr].sort(() => 0.5 - Math.random());

  return (
    <Container
      fluid
      className="app pt-3 p-0 mw-100 mh-100 d-flex align-items-center justify-content-center flex-column"
    >
      {/* <Container fluid className="mt-5 p-0">
        <Skeleton baseColor="#5E0911" highlightColor="#FF0000" />
      </Container>{" "} */}
      <Container className="mt-5 d-flex flex-column align-items-center text-center">
        <Image className="w-25" src="/logo-loading.png" />
      </Container>
      <Container className="tag-list w-100 ms-0 me-0 ps-0 pe-0">
        {[...new Array(ROWS)].map((_, i) => (
          <InfiniteLoopSlider
            key={i}
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={i % 2 === 1}
          >
            <>
              {shuffle(TAGS)
                .slice(0, TAGS_PER_ROW)
                .map((tag, idx) => (
                  <Tag text={tag} key={`tag${idx}`} />
                ))}
            </>
          </InfiniteLoopSlider>
        ))}
        <Container className="fade"></Container>
      </Container>
    </Container>
  );
}
