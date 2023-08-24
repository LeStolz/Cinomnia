import { SigninViewProps } from "./Signin";
import { FormEvent, createRef, useState } from "react";
import { Row, Col, Image, Button, Form, FloatingLabel } from "react-bootstrap";
import "./Signin.scss";

export function SigninView({ onSubmit, onSubmitGoogle }: SigninViewProps) {
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = createRef<HTMLInputElement>();
  const rememberRef = createRef<HTMLInputElement>();

  const onSubmitWrapped = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await onSubmit(
          { email: emailRef.current?.value },
          rememberRef.current?.checked
        );

        setMessage("Great! Check your email to finish logging in.");
      } catch (err: any) {
        setMessage("An error has occurred. Please try again later.");
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Row className="bg-secondary rounded">
        <Col className="p-0 d-none d-lg-block">
          <Image src="/signin-side.png" className="h-100 rounded" />
        </Col>

        <Col className="ms-0 p-5 text-center">
          <Image src="/logo.png" className="d-none d-lg-inline mb-3 h-lg" />
          <h2 className="fw-bold mb-0">Sign In</h2>
          <p className="text-muted mb-3">
            Watch anything, anywhere, and anyhow
          </p>

          <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
            <Form.Group className="mb-2 text-start" controlId="email">
              <FloatingLabel controlId="floatingEmail" label="Email">
                <Form.Control
                  type="email"
                  ref={emailRef}
                  placeholder="Email"
                  className="w-100"
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid email!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              className="mb-2 d-flex justify-content-start"
              controlId="rememberMe"
            >
              <Form.Check type="switch" label="Remember me" ref={rememberRef} />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Continue
            </Button>
            <Form.Control.Feedback
              className="text-start d-block"
              type={message.includes("error") ? "invalid" : undefined}
            >
              {message}
            </Form.Control.Feedback>
          </Form>

          <Row className="my-2 d-flex align-items-center">
            <Col className="pe-0">
              <hr />
            </Col>
            <Col sm="auto" className="px-4">
              <p className="m-0">Or</p>
            </Col>
            <Col className="ps-0">
              <hr />
            </Col>
          </Row>

          <div>
            <div>
              <Button
                onClick={onSubmitGoogle}
                className="google-btn w-100 mb-3"
              >
                <i className="bi bi-google me-2"></i> Continue with Google
              </Button>
            </div>
          </div>

          <small className="text-muted">&copy; 2023 Cinomnia</small>
        </Col>
      </Row>
    </>
  );
}
