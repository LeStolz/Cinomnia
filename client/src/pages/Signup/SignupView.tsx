import { SignupViewProps } from "./Signup";
import { FormEvent, createRef, useState } from "react";
import { Container } from 'react-bootstrap';
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
      <Container className='h-50'>
        <Row className="mt-5 border border-1 bg-secondary">
          <Col className='ps-0' xs={5}>
            <Image src="/signup-background.png" className='pe-4 me-3'/>
          </Col>

          <Col className="pt-5 text-center" xs={7}>
              <Image src="/logo.png" className='mb-3 h-lg'/>
              <h2 className='fw-bold'>Sign Up</h2>
              <p className='fw-bold'>Unlimited movies, TV shows, and more. Are you ready?</p>

              <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
                <Form.Group className="mb-3 d-flex justify-content-center" controlId="email">
                  <Form.Control type="email" ref={emailRef} placeholder='Enter your email here' className='w-50' required />
                </Form.Group>

                <Button type="submit" variant="danger" className="mb-2">Sign Up</Button>
              </Form>

              <p className='mt-1'>Or using</p>
              
              <h2>
                <Link to=''><i className="bi bi-facebook me-3"></i></Link>
                <Link to=''><i className="bi bi-google ms-3"></i></Link>
              </h2>

              <p className='mt-3'>Already have an account? <Link to="/login">Log in now!</Link></p>
              <br/>
              <small className='mt-5'>@2023 Cinomnia</small>
          </Col>
        </Row>
      </Container>
    </>
  );
}