import { useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip, Image } from "react-bootstrap";

export function ImageEdit({
  editMode,
  name,
  defaultValue,
  isRequired,
  className,
  onChange,
}: any) {
  const [editting, setEditting] = useState(false);
  const [input, setInput] = useState<any>();

  if (!editMode) {
    return <Image src={defaultValue} className={className} />;
  }

  return (
    <div className={`position-relative ${editting ? "d-block" : "d-inline"}`}>
      <Form.Control
        className="rounded-2 rounded-end-0 w-100"
        type="text"
        placeholder={name}
        defaultValue={input}
        aria-label={name}
        name={name}
        required={isRequired}
        onChange={(e) => setInput(e.target.value)}
        hidden={!editting}
      />
      <Image
        src={input ? input : defaultValue}
        className={className}
        hidden={editting}
      />

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Edit</Tooltip>}
        trigger={["hover", "focus"]}
      >
        <Button
          variant={editting ? "primary" : "outline-primary"}
          className={`z-3 border-0 position-absolute h-md w-md ${
            editting && "rounded-end-0"
          }`}
          style={{
            top: "50%",
            right: "100%",
            transform: "translateY(-50%)",
          }}
          onClick={() => {
            if (editting) {
              onChange(input);
            }
            setEditting((editting) => !editting);
          }}
        >
          <i className="position-absolute-center bi bi-pencil"></i>
        </Button>
      </OverlayTrigger>
    </div>
  );
}
