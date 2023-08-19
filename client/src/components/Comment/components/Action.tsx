import { ReactElement } from "react";
import { Button } from "react-bootstrap";

interface ActionProps {
  handleClick: () => void;
  type: string;
  className: string;
  variant: string;
}

const Action = ({ handleClick, type, className, variant }: ActionProps): ReactElement => {
  return (
    <Button variant={variant} className={className} onClick={handleClick}>
      {type}
    </Button>
  );
};

export default Action;