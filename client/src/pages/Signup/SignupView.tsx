import { SignupViewProps } from "./Signup";
import { FormEvent, createRef, useState } from "react";
// import { Button, Card, Form, FloatingLabel } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

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
          <Col className='ps-0' md={5} sm={12}>
            <Image src="/signup-background.png" className='ms-0 ps-0 me-0 pe-5'/>
          </Col>

          <Col className="pt-5 ms-5 ps-5 me-0 text-center" md={6} sm={12}>
            <Image src="/logo.png" className='mb-3 mt-2 h-lg'/>
            <h2 className='fw-bold'>Sign Up</h2>
            <p className='fw-bold'>Watch anything, anywhere, and anyhow</p>
            <p>We will send you a verification mail</p>
            <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
              <Form.Group className="ms-2 mb-3 d-flex justify-content-center" controlId="email">
                <Form.Control type="email" ref={emailRef} placeholder='Enter your email here' className='h-100 w-75' size="lg" required />
              </Form.Group>

              <div className="d-grid gap-3 ms-3">
                <Button className='w-75 ms-5' type="submit" variant="danger">Continue</Button>
              </div>
            </Form>
              
            <h2 className="mt-4">
              <Link to=''><i className="bi bi-facebook me-3"></i></Link>
              <Link to=''><i className="bi bi-google ms-3"></i></Link>
            </h2>

            <p className='mt-3'>Already have an account? <Link to="/login">Log in now!</Link></p>
            <br/>
            <small className='mt-5'>@2023 Cinomnia</small>
          </Col>
        </Row>
    </>
  );
}