import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { FormEvent, createRef, useState } from "react";
import { LoginViewProps } from "./Login";

export function LoginView({ onSubmit }: LoginViewProps) {
  const [validated, setValidated] = useState(false);
  const emailRef = createRef<HTMLInputElement>();

  const onSubmitWrapped = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await onSubmit({
          email: emailRef.current?.value,
        });
      } catch (err) {
        console.log(err);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Row className="bg-secondary rounded">
        <Col className="ms-0 p-5 text-center">
          <Image
            src="/logo.png"
            className="mb-3 mt-2 h-lg"
            alt="Cinomnia's logo"
          />
          <h2 className="fw-bold">Log In</h2>
          <p className="fw-bold">Watch anything, anywhere, and anyhow</p>
          <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
            <Form.Group
              className="mb-2 d-flex justify-content-center"
              controlId="email"
            >
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="Enter your email here"
                className="h-100"
                size="lg"
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex justify-content-start"
              controlId="rememberMe"
            >
              <Form.Check type="switch" label="Remember me" />
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100">
              Continue
            </Button>
          </Form>

          <div className="d-flex align-items-center my-2">
            <hr className="w-100" />
            <p className="w-100 m-0">Or using</p>
            <hr className="w-100" />
          </div>

          <div>
            <h6>
              <Button variant="light" className="w-100 text-start px-5">
                <Link to="" className="text-decoration-none text-dark">
                  <i className="bi bi-facebook me-2"></i>
                  Continue with Facebook
                </Link>
              </Button>
            </h6>

            <h6>
              <Button variant="light" className="w-100 text-start px-5">
                <Link to="" className="text-decoration-none text-dark">
                  <i className="bi bi-google me-2"></i>
                  Continue with Google
                </Link>
              </Button>
            </h6>

            <h6>
              <Button variant="light" className="w-100 text-start px-5">
                <Link to="" className="text-decoration-none text-dark">
                  <i className="bi bi-twitter me-2"></i>
                  Continue with Twitter
                </Link>
              </Button>
            </h6>
          </div>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Create one!</Link>
          </p>
          <small className="p-0">@2023 Cinomnia</small>
        </Col>

        <Col className="p-0 d-none d-md-block">
          <Image src="/login-background.png" className="h-100 rounded" />
        </Col>
      </Row>
    </>
  );
}
