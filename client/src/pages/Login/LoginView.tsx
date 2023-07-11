import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { FormEvent, createRef, useState } from "react";
import { LoginViewProps } from "./Login";
import background from "/public/login-background.png";

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
      <div className='bg-image' style={{backgroundImage: `url("${background}")`}}>
        <Row className='bg-secondary rounded'>
          <Col sm={12} lg={6} className="ms-0 text-center pt-5">
            <Image src="/logo.png" className='mb-3 mt-2 h-lg'/>
            <h2 className='fw-bold'>Log In</h2>
            <p className='fw-bold'>Watch anything, anywhere, and anyhow</p>
            <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
              <Form.Group className="ms-2 mb-2 d-flex justify-content-center" controlId="email">
                <Form.Control type="email" ref={emailRef} placeholder='Enter your email here' className='h-100 w-75' size="lg" required />
              </Form.Group>

              <Form.Group className="ps-3 ms-4 mb-3 d-flex justify-content-start" controlId="rememberMe">
                <Form.Check type="switch" label="Remember me" className='ps-5 ms-2 text-start'/>
              </Form.Group>

              <div className="d-grid gap-3 ms-2">
                <Button className='w-75 ms-5' type="submit" variant="danger">Continue</Button>
              </div>
            </Form>
            <p className='mt-3'>Or using</p>
            <h2>
              <Link to=''><i className="bi bi-facebook me-3"></i></Link>
              <Link to=''><i className="bi bi-google ms-3"></i></Link>
            </h2>

            <p className='mt-3'>Don't have an account? <Link to="/signup">Create one!</Link></p>
            <br/>
            <small className='mt-5'>@2023 Cinomnia</small>
          </Col>

          <Col sm={12} lg={5}>
            <Image src="/login-background.png" className='ms-0 ps-0 rounded'/>
          </Col>
        </Row>
        </div>
    </>
  );
}
