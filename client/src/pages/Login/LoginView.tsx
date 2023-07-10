import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { FormEvent, createRef, useState } from "react";
import { LoginViewProps } from "./Login";
import { Container } from 'react-bootstrap';

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
      <Container className='h-50'>
        <Row className='mt-5 border border-1 bg-secondary'>
          <Col className="pt-5 text-center" xs={7}>
            <Image src="/logo.png" className='mb-3 h-lg'/>
            <h2 className='fw-bold'>Log In</h2>
            <p className='fw-bold'>Watch anything, anywhere, and anyhow.</p>

            <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
              <Form.Group className="mb-3 d-flex justify-content-center" controlId="email">
                <Form.Control type="email" ref={emailRef} placeholder='Enter your email here' className='w-75' required />
              </Form.Group>
                <Form.Group className="mb-3 ms-5" controlId="rememberMe">
                  <Form.Check type="switch" label="Remember me" className='ms-5 text-start'/>
                </Form.Group>
              <Button type="submit" variant="danger">Continue</Button>
            </Form>
            <p className='mt-1'>Or using</p>
            
            <h2>
            <Link to=''><i className="bi bi-facebook me-3"></i></Link>
            <Link to=''><i className="bi bi-google ms-3"></i></Link>
            </h2>

            <p className='mt-3'>Don't have an account? <Link to="/signup">Create one!</Link></p>
            <br/>
            <small className='mt-5'>@2023 Cinomnia</small>
          </Col>

          <Col className='' xs={5}>
            <Image src="/login-background.png" className='ps-4 ms-3'/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
