import {
  Container,
  Card,
  ListGroup,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import { FilmCrudView } from "./FilmCrud";
import { FormEvent, createRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function FilmCrudView({
  films,
  getFilms,
  getFilm,
  delFilm,
  addFilm,
}: FilmCrudView) {
  const searchRef = createRef<HTMLInputElement>();
  const filmRef = createRef<HTMLInputElement>();

  const [show, setShow] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState<any>("");
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const [nav, setNav] = useState<any>("");
  const [modalActionName, setModalActionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(onSearch, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    (async () => {
      await onSearch();
    })();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (
    header: string,
    body: string,
    modalAction: () => void,
    modalActionName: string,
    nav?: string
  ) => {
    setModalHeader(header);
    setModalBody(body);
    setModalAction(modalAction);
    setModalActionName(modalActionName);
    setNav(nav);
    setShow(true);
  };

  const onSearch = async () => {
    setLoading(true);

    const search = searchRef.current?.value;
    await getFilms(search != null ? search : prevSearch);
    setPrevSearch((prevSearch) => (search != null ? search : prevSearch));

    setLoading(false);
  };

  const onMoreInfo = async (id: string) => {
    try {
      const film = await getFilm(id);
      handleShow(
        film.title,
        `ID: ${film.id}`,
        () => handleClose,
        "Ok",
        `/detail/${id}`
      );
    } catch (err: any) {
      handleShow(
        `${id} not found`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );
    }
  };

  const onAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addFilm(filmRef?.current?.value!);
    } catch (err: any) {
      handleShow(
        `Failed to add ${filmRef?.current?.value!}`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );

      return;
    }

    setAdding(false);
    handleShow(
      `Added ${filmRef?.current?.value!}`,
      `Successfully added ${filmRef?.current?.value!}`,
      () => handleClose,
      "Ok"
    );

    await onSearch();
  };

  const delFilmWrapped = async (title: string, id: string) => {
    handleShow(
      `Delete ${title}`,
      `Are you sure you want to permanently delete ${title}?`,
      () => async () => {
        try {
          handleClose();
          await delFilm(title);
        } catch (err: any) {
          handleShow(
            `Failed to delete ${title}`,
            err.response.data.error,
            () => handleClose,
            "Ok"
          );

          return;
        }

        handleShow(
          `Deleted ${title}`,
          `Successfully deleted ${title}`,
          () => handleClose,
          "Ok"
        );

        await onSearch();
      },
      "Yes"
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalHeader}{" "}
            {nav != undefined && (
              <Link to={nav}>
                <i className="bi bi-escape"></i>
              </Link>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={modalAction}>
            {modalActionName}
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Card className="w-100 bg-secondary p-3 rounded-3 shadow-sm">
          <Card.Header className="p-0 bg-transparent">
            <h1 className="mb-2">Films</h1>
            <Form className="mb-3">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="rounded-start-2"
                onChange={(event) => setSearch(event.target.value)}
                ref={searchRef}
              />
            </Form>
          </Card.Header>
          <Card.Body className="p-0">
            <ListGroup
              variant="flush"
              className="overflow-y-scroll"
              style={{
                maxHeight:
                  "calc(100vh - var(--header-size) - var(--card-header-size) - 2 * 16px)",
              }}
            >
              <ListGroup.Item
                className="d-flex align-items-center bg-transparent p-0"
                key={-1}
              >
                {adding ? (
                  <Form
                    className="w-100 d-flex align-items-center"
                    onSubmit={onAdd}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Film"
                      aria-label="Film"
                      className="rounded-2 w-100 mx-3 my-2"
                      ref={filmRef}
                      required
                    />

                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Add</Tooltip>}
                      trigger={["hover", "focus"]}
                    >
                      <Button
                        type="submit"
                        variant="outline-success"
                        className="border-0 position-relative h-md w-md"
                      >
                        <i className="position-absolute-center bi bi-plus-circle"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Cancel</Tooltip>}
                      trigger={["hover", "focus"]}
                    >
                      <Button
                        variant="outline-primary"
                        className="border-0 position-relative h-md w-md me-3"
                        onClick={() => setAdding(false)}
                      >
                        <i className="position-absolute-center bi bi-x-lg"></i>
                      </Button>
                    </OverlayTrigger>
                  </Form>
                ) : (
                  <Button
                    variant="dark"
                    className="d-flex align-items-center w-100 rounded-0 px-3"
                    onClick={() => setAdding(true)}
                  >
                    <i className="bi bi-plus-circle me-3 fs-4"></i>
                    <span className="fs-4">Add a new film</span>
                  </Button>
                )}
              </ListGroup.Item>
              {loading ? (
                <span className="fs-4 mt-2 text-center">
                  <div className="mt-3 spinner-border" role="status"></div>
                </span>
              ) : films.length === 0 ? (
                <span className="fs-4 mt-2 text-center">No films found</span>
              ) : (
                films.map((film) => (
                  <ListGroup.Item
                    className="d-flex align-items-center bg-transparent py-2"
                    key={film.id}
                  >
                    <span className="fs-4 me-auto">{film.title}</span>

                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>More info</Tooltip>}
                      trigger={["hover", "focus"]}
                    >
                      <Button
                        onClick={() => onMoreInfo(film.id)}
                        variant="outline-info"
                        className="border-0 position-relative h-md w-md"
                      >
                        <i className="position-absolute-center bi bi-info-circle"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Edit</Tooltip>}
                      trigger={["hover", "focus"]}
                    >
                      <Button
                        onClick={() => navigate(`/film-update/${film.id}`)}
                        variant="outline-success"
                        className="border-0 position-relative h-md w-md"
                      >
                        <i className="position-absolute-center bi bi-pencil"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Delete</Tooltip>}
                      trigger={["hover", "focus"]}
                    >
                      <Button
                        variant="outline-primary"
                        className="border-0 position-relative h-md w-md"
                        onClick={() => delFilmWrapped(film.title, film.id)}
                      >
                        <i className="position-absolute-center bi bi-x-lg"></i>
                      </Button>
                    </OverlayTrigger>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
