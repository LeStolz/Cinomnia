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
import { GenreCrudView } from "./GenreCrud";
import { FormEvent, createRef, useState } from "react";

export function GenreCrudView({
  genres,
  getGenres,
  getGenre,
  delGenre,
  addGenre,
  updateGenre,
}: GenreCrudView) {
  const searchRef = createRef<HTMLInputElement>();
  const genreRef = createRef<HTMLInputElement>();
  const editRef = createRef<HTMLInputElement>();
  const [show, setShow] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editting, setEditting] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const [modalActionName, setModalActionName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (
    header: string,
    body: string,
    modalAction: () => void,
    modalActionName: string
  ) => {
    setModalHeader(header);
    setModalBody(body);
    setModalAction(modalAction);
    setModalActionName(modalActionName);
    setShow(true);
  };

  const onSearch = async () => {
    const search = searchRef.current?.value;

    await getGenres(search != null ? search : prevSearch);
    setPrevSearch((prevSearch) => (search != null ? search : prevSearch));
  };

  const onMoreInfo = async (id: string) => {
    try {
      const genre = await getGenre(id);
      handleShow(genre.name, `ID: ${genre.id}`, () => handleClose, "Ok");
    } catch (err: any) {
      handleShow(
        `${id} not found`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );
    }
  };

  const delGenreWrapped = async (name: string, id: string) => {
    handleShow(
      `Delete ${name}`,
      `Are you sure you want to permanently delete ${name}?`,
      () => async () => {
        try {
          handleClose();
          await delGenre(id);
        } catch (err: any) {
          handleShow(
            `Failed to delete ${name}`,
            err.response.data.error,
            () => handleClose,
            "Ok"
          );

          return;
        }

        handleShow(
          `Deleted ${name}`,
          `Successfully deleted ${name}`,
          () => handleClose,
          "Ok"
        );

        await onSearch();
      },
      "Yes"
    );
  };

  const onAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addGenre(genreRef?.current?.value!);
    } catch (err: any) {
      handleShow(
        `Failed to add ${genreRef?.current?.value!}`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );

      return;
    }

    setAdding(false);
    handleShow(
      `Added ${genreRef?.current?.value!}`,
      `Successfully added ${genreRef?.current?.value!}`,
      () => handleClose,
      "Ok"
    );

    await onSearch();
  };

  const onEdit = async (
    event: FormEvent<HTMLFormElement>,
    id: string,
    name: string
  ) => {
    event.preventDefault();

    try {
      await updateGenre(id, editRef?.current?.value!);
    } catch (err: any) {
      handleShow(
        `Failed to edit ${name}`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );

      return;
    }

    setEditting("");
    handleShow(
      `Editted ${name}`,
      `Successfully editted ${name}`,
      () => handleClose,
      "Ok"
    );

    await onSearch();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
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
            <h1 className="mb-2">Genres</h1>
            <Form className="mb-3">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="rounded-start-2"
                onChange={onSearch}
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
                      placeholder="Genre"
                      aria-label="Genre"
                      className="rounded-2 w-100 mx-3 my-2"
                      ref={genreRef}
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
                    <span className="fs-4">Add a new genre</span>
                  </Button>
                )}
              </ListGroup.Item>
              {genres.length === 0 ? (
                <span className="fs-4 mt-2 text-center">No genre found</span>
              ) : (
                genres.map((genre) => (
                  <ListGroup.Item
                    className="d-flex align-items-center bg-transparent py-2"
                    key={genre.id}
                  >
                    {editting === genre.id ? (
                      <Form
                        className="w-100 d-flex align-items-center"
                        onSubmit={(event) =>
                          onEdit(event, genre.id, genre.name)
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder="Genre"
                          defaultValue={genre.name}
                          aria-label="Genre"
                          className="rounded-2 w-100 me-3"
                          ref={editRef}
                          required
                        />

                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Edit</Tooltip>}
                          trigger={["hover", "focus"]}
                        >
                          <Button
                            type="submit"
                            variant="outline-success"
                            className="border-0 position-relative h-md w-md"
                          >
                            <i className="position-absolute-center bi bi-pencil"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Cancel</Tooltip>}
                          trigger={["hover", "focus"]}
                        >
                          <Button
                            variant="outline-primary"
                            className="border-0 position-relative h-md w-md"
                            onClick={() => setEditting("")}
                          >
                            <i className="position-absolute-center bi bi-x-lg"></i>
                          </Button>
                        </OverlayTrigger>
                      </Form>
                    ) : (
                      <>
                        <span className="fs-4 me-auto">{genre.name}</span>

                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>More info</Tooltip>}
                          trigger={["hover", "focus"]}
                        >
                          <Button
                            onClick={() => onMoreInfo(genre.id)}
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
                            onClick={() => setEditting(genre.id)}
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
                            onClick={() =>
                              delGenreWrapped(genre.name, genre.id)
                            }
                          >
                            <i className="position-absolute-center bi bi-x-lg"></i>
                          </Button>
                        </OverlayTrigger>
                      </>
                    )}
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
