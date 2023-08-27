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
import { UserCrudView } from "./UserCrud";
import { FormEvent, createRef, useEffect, useState } from "react";

export function UserCrudView({
  users,
  getUsers,
  getUser,
  delUser,
  addUser,
  updateUser,
}: UserCrudView) {
  const searchRef = createRef<HTMLInputElement>();
  const userRef = createRef<HTMLInputElement>();
  const editRef = createRef<HTMLInputElement>();
  const [show, setShow] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editting, setEditting] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const [modalActionName, setModalActionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
    modalActionName: string
  ) => {
    setModalHeader(header);
    setModalBody(body);
    setModalAction(modalAction);
    setModalActionName(modalActionName);
    setShow(true);
  };

  const onSearch = async () => {
    setLoading(true);

    const search = searchRef.current?.value;
    await getUsers(search != null ? search : prevSearch);
    setPrevSearch((prevSearch) => (search != null ? search : prevSearch));

    setLoading(false);
  };

  const onMoreInfo = async (id: string) => {
    try {
      const user = await getUser(id);
      handleShow(user.email, `ID: ${user.id}`, () => handleClose, "Ok");
    } catch (err: any) {
      handleShow(
        `${id} not found`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );
    }
  };

  const delUserWrapped = async (email: string, id: string) => {
    handleShow(
      `Delete ${email}`,
      `Are you sure you want to permanently delete ${email}?`,
      () => async () => {
        try {
          handleClose();
          await delUser(id);
        } catch (err: any) {
          handleShow(
            `Failed to delete ${email}`,
            err.response.data.error,
            () => handleClose,
            "Ok"
          );

          return;
        }

        handleShow(
          `Deleted ${email}`,
          `Successfully deleted ${email}`,
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
      await addUser(userRef?.current?.value!);
    } catch (err: any) {
      handleShow(
        `Failed to add ${userRef?.current?.value!}`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );

      return;
    }

    setAdding(false);
    handleShow(
      `Added ${userRef?.current?.value!}`,
      `Successfully added ${userRef?.current?.value!}`,
      () => handleClose,
      "Ok"
    );

    await onSearch();
  };

  const onEdit = async (
    event: FormEvent<HTMLFormElement>,
    id: string,
    email: string
  ) => {
    event.preventDefault();

    try {
      await updateUser(id, editRef?.current?.value!);
    } catch (err: any) {
      handleShow(
        `Failed to edit ${email}`,
        err.response.data.error,
        () => handleClose,
        "Ok"
      );

      return;
    }

    setEditting("");
    handleShow(
      `Editted ${email}`,
      `Successfully editted ${email}`,
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
            <h1 className="mb-2">Users</h1>
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
                <Button
                  variant="dark"
                  className="d-flex align-items-center w-100 rounded-0 px-3"
                  onClick={() => setAdding(true)}
                >
                  <i className="bi bi-plus-circle me-3 fs-4"></i>
                  <span className="fs-4">Add a new user</span>
                </Button>
              </ListGroup.Item>
              {loading ? (
                <span className="fs-4 mt-2 text-center">
                  <div className="mt-3 spinner-border" role="status"></div>
                </span>
              ) : users.length === 0 ? (
                <span className="fs-4 mt-2 text-center">No user found</span>
              ) : (
                users.map((user) => (
                  <ListGroup.Item
                    className="d-flex align-items-center bg-transparent py-2"
                    key={user.email}
                  >
                    <span className="fs-4 me-auto">{user.email}</span>

                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>More info</Tooltip>}
                      trigger={["hover", "focus"]}
                    >
                      <Button
                        onClick={() => onMoreInfo(user.id)}
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
                        onClick={() => setEditting(user.id)}
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
                        onClick={() => delUserWrapped(user.email, user.id)}
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
