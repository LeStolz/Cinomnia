import { useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip, Image } from "react-bootstrap";

export function ImageEdit({
  editMode,
  name,
  defaultValue,
  isRequired,
  className,
}: any) {
  const [editting, setEditting] = useState(false);
  const [input, setInput] = useState<File | undefined>();

  if (!editMode) {
    return <Image src={defaultValue} className={className} />;
  }

  return (
    <div className={`position-relative ${editting ? "d-block" : "d-inline"}`}>
      <Form.Control
        className="rounded-2 rounded-start-0 w-100"
        type="file"
        name={name}
        required={isRequired}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;

          if (!target.files || target.files.length === 0) {
            setInput(undefined);
            return;
          }

          setInput(target.files[0]);
        }}
        hidden={!editting}
      />
      <Image
        src={input ? URL.createObjectURL(input) : defaultValue}
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
          onClick={() => setEditting((editting) => !editting)}
        >
          <i className="position-absolute-center bi bi-pencil"></i>
        </Button>
      </OverlayTrigger>
    </div>
  );
}
