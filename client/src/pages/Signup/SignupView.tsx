import { SignupViewProps } from "./Signup";
import { FormEvent, createRef, useState } from "react";
// import { Button, Card, Form, FloatingLabel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

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
      <Row className="bg-secondary rounded">
        <Col className="p-0 d-none d-md-block">
          <Image src="/signup-background.png" className="h-100 rounded " />
        </Col>

        <Col className="text-center p-5">
          <Image src="/logo.png" className="mb-3 mt-2 h-lg" />
          <h2 className="fw-bold">Sign Up</h2>
          <p className="fw-bold">Watch anything, anywhere, and anyhow</p>
          <p>We will send you a verification mail</p>

          <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
            <Form.Group
              className="d-flex justify-content-center mb-3"
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
          </Form>
            <Button type="submit" variant="danger" className="w-100">
              Continue
            </Button>

            <p className="mt-2">Or using</p>
          
            <h6>
          <Button variant="light" className="w-100">
          <Link to="" className='text-decoration-none text-dark'>
              <i className="bi bi-facebook me-2"></i>
              Continue with Facebook
          </Link>
          </Button>
          </h6>

          <h6>
            <Button variant="light" className="w-100">
              <Link to="" className='text-decoration-none text-dark'>
                  <i className="bi bi-google me-2"></i>
                  Continue with Google
              </Link>
            </Button>
          </h6>

          <h6>
            <Button variant="light" className="w-100">
              <Link to="" className='text-decoration-none text-dark'>
                  <i className="bi bi-twitter me-2"></i>
                  Continue with Twitter
              </Link>
            </Button>
          </h6>

          <p className="mt-2">
            Already have an account? <Link to="/login">Log in now!</Link>
          </p>
          <small className="p-0">@2023 Cinomnia</small>
        </Col>
      </Row>
    </>
  );
}
