import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function MovieCardSkeleton() {
  return (
    <>
      <Container
        fluid
        className="p-1 rounded position-relative shadow-sm"
      >
        <Skeleton height={350}></Skeleton>
        <Container
          fluid
          className="rounded p-2 position-absolute bg-secondary z-1 start-0 bottom-0"
        >
          <Container
            fluid
            className="d-flex justify-content-between p-0"
          >
            <Container fluid className="p-0 d-flex">
              <Skeleton circle width={30} height={30} className="me-1"/>
              <Skeleton circle width={30} height={30} className="me-1"/>
              <Skeleton circle width={30} height={30} />
            </Container>
            <Skeleton circle width={30} height={30} />
          </Container>
          <Container fluid className="rounded p-0 mt-2">
            <Skeleton width={200} height={20} />
          </Container>
          <Container fluid className="rounded p-0 mt-2">
            <Skeleton width={100} count={2} />
          </Container>
        </Container>
      </Container>
    </>
  );
}
