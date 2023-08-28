import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { WithContext as ReactTags } from "react-tag-input";

export function MultiEdit({
  editMode,
  data,
  name,
  defaultValue,
  single,
  onChange,
  func,
  icon,
  removeOnDone,
  placeholder,
}: any) {
  const [editting, setEditting] = useState(false);
  const [input, setInput] = useState<any>(defaultValue);

  const handleDelete = (i: any) => {
    setInput(input.filter((_tag: any, index: any) => index !== i));
  };

  const handleAddition = (tag: any) => {
    if (single) {
      setInput([tag]);
    } else {
      setInput([...input, { ...tag, id: tag.id, name: tag.text }]);
    }
  };

  if (!editMode) {
    return <>{func ? func(defaultValue) : defaultValue}</>;
  }

  return (
    <div className={`position-relative ${editting ? "d-block" : "d-inline"}`}>
      <span hidden={!editting}>
        <ReactTags
          tags={
            input
              ? input.map((datum: any) => ({
                  id:
                    typeof datum.id === "number"
                      ? datum.id.toString()
                      : datum.id,
                  text: datum.name || datum.text,
                }))
              : []
          }
          suggestions={data.map((datum: any) => ({
            id: typeof datum.id === "number" ? datum.id.toString() : datum.id,
            text: datum.name || datum.text,
          }))}
          placeholder={placeholder}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="top"
          delimiters={[188, 13]}
          autocomplete
          minQueryLength={2}
          name={name}
        />
      </span>
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
            top: editting ? "0%" : "50%",
            left: "100%",
            transform: editting ? "" : "translateY(-50%)",
          }}
          onClick={() => {
            if (editting) {
              onChange(input);
            }
            if (removeOnDone) {
              setInput([]);
            }
            setEditting((editting) => !editting);
          }}
        >
          <i
            className={`position-absolute-center bi bi-${
              icon ? icon : "pencil"
            }`}
          ></i>{" "}
        </Button>
      </OverlayTrigger>
    </div>
  );
}
