import { SignupViewProps } from "./Signup";
import { FormEvent, createRef, useState } from "react";
import { Button, Card, Form, FloatingLabel } from "react-bootstrap";

export function SignupView({ onSubmit }: SignupViewProps) {
  const [validated, setValidated] = useState(false);
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const onSubmitWrapped = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await onSubmit({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        });
      } catch (err) {
        console.log(err);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Card.Title className="text-center mb-3">
        <h1>Sign Up</h1>
      </Card.Title>
      <Card.Subtitle className="text-body-secondary text-center mx-sm-5 mb-3">
        <small>Watch anything, anywhere, and anyhow.</small>
      </Card.Subtitle>
      <Card.Text>
        <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
          <Form.Group className="mb-3" controlId="email">
            <FloatingLabel controlId="floatingEmail" label="Email">
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Enter email"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Invalid email!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Enter password"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Invalid password!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="rememberMe">
            <Form.Check type="switch" label="Remember me!" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            <h4>Sign Up</h4>
          </Button>
        </Form>
      </Card.Text>

      <Card.Footer className="d-flex bg-transparent">
        <Card.Link className="me-auto">Login</Card.Link>
        <Card.Link>Forgot Password</Card.Link>
      </Card.Footer>
    </>
  );
}
