import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import logo from "../../../../public/logo.png";
import { Container, Form, Image } from "react-bootstrap";

interface CommentProps {
  handleInsertNode: (id: number, input: string) => void;
  handleEditNode: (id: number, input: string) => void;
  handleDeleteNode: (id: number) => void;
  comment: {
    id: number;
    name: string;
    items?: {
      id: number;
      name: string;
    }[];
  };
}

const CommentChild: React.FC<CommentProps> = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText || "");
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <Container>
      <Container
        className={
          comment.id === 1
            ? "inputContainer"
            : "commentContainer p-3 border border-1 m-2"
        }
      >
        {comment.id === 1 ? (
          <>
            <Form className="rounded-1 p-3 border border-1 m-2 d-flex align-items-center justify-content-between">
              <Image src={logo} className="w-lg me-2" />
              <Form.Control
                className="m-0 me-2"
                type="text"
                placeholder="What do you think ?"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Action
                className="rounded-pill me-2"
                type="Comment"
                handleClick={onAddComment}
                variant="dark"
              />
              <Action
                className="rounded-pill me-2"
                type="Cancel"
                handleClick={() => {
                  setShowInput(false);
                  if (!comment?.items?.length) setExpand(false);
                }}
                variant="dark"
              />
            </Form>
          </>
        ) : (
          <>
            <Image src={logo} className="w-lg me-2" />
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <Container className="d-flex">
              {editMode ? (
                <>
                  <Action
                    className="rounded-pill me-2"
                    type="Save"
                    handleClick={onAddComment}
                    variant="dark"
                  />
                  <Action
                    className="rounded-pill me-2"
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                    variant="dark"
                  />
                </>
              ) : (
                <>
                  <Action
                    className="rounded-pill me-2"
                    type={
                      expand ? (
                        <i className="bi bi-caret-up-fill"></i>
                      ) : (
                        <i className="bi bi-caret-down-fill"></i>
                      )
                    }
                    handleClick={handleNewComment}
                    variant="link"
                  />

                  <Action
                    className="rounded-pill me-2"
                    type="Edit"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                    variant="dark"
                  />
                  <Action
                    className="rounded-pill me-2"
                    type="Delete"
                    handleClick={handleDelete}
                    variant="dark"
                  />
                </>
              )}
            </Container>
          </>
        )}
      </Container>

      <Container
        style={{ display: expand ? "block" : "none", paddingLeft: 25 }}
      >
        {showInput && (
          <Container className="inputContainer">
            <Form className="rounded-1 p-3 border border-1 m-2 d-flex align-items-center justify-content-between">
              <Image src={logo} className="w-lg me-2" />
              <Form.Control
                className="m-0 me-2"
                type="text"
                placeholder="What do you think ?"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Form>
            <Action
              className="rounded-pill me-2"
              type="Reply"
              handleClick={onAddComment}
              variant="dark"
            />
            <Action
              className="rounded-pill me-2"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
              variant="dark"
            />
          </Container>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <CommentChild
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </Container>
    </Container>
  );
};

export default CommentChild;
