import { useEffect, useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export function Edit({
  editMode,
  type,
  name,
  defaultValue,
  isRequired,
  func,
  options,
  onChange,
  icon,
}: any) {
  const [editting, setEditting] = useState(false);
  const [input, setInput] = useState(defaultValue);

  useEffect(() => {
    if (input == null) {
      setInput(defaultValue);
    }
  }, [defaultValue]);

  if (!editMode) {
    return <>{func ? func(defaultValue) : defaultValue}</>;
  }

  return (
    <div className={`position-relative ${editting ? "d-block" : "d-inline"}`}>
      {type == "select" ? (
        <Form.Select
          className="rounded-2 rounded-end-0 w-100"
          placeholder={name}
          defaultValue={input}
          aria-label={name}
          name={name}
          required={isRequired}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          hidden={!editting}
        >
          {options.map((option: any) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          className="rounded-2 rounded-end-0 w-100"
          type={type != "textarea" ? type : undefined}
          as={type == "textarea" ? type : undefined}
          rows={type == "textarea" ? 5 : undefined}
          placeholder={name}
          defaultValue={input}
          aria-label={name}
          name={name}
          required={isRequired}
          onChange={(e) => setInput(e.target.value)}
          hidden={!editting}
        />
      )}
      <span hidden={editting}>{func ? func(input) : input}</span>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Edit</Tooltip>}
        trigger={["hover", "focus"]}
      >
        <Button
          variant={editting ? "primary" : "outline-primary"}
          className={`z-3 border-0 position-absolute h-md w-md ${
            editting && "rounded-start-0"
          }`}
          style={{
            top: type == "textarea" ? "100%" : "50%",
            left: "100%",
            transform: "translateY(-50%)",
          }}
          onClick={() => {
            if (editting) {
              onChange(input);
            }
            setEditting((editting) => !editting);
          }}
        >
          <i
            className={`position-absolute-center bi bi-${
              icon ? icon : "pencil"
            }`}
          ></i>
        </Button>
      </OverlayTrigger>
    </div>
  );
}
