import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { FormEvent, createRef, useState } from "react";
import { LoginViewProps } from "./Login";

export function LoginView({ onSubmit }: LoginViewProps) {
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
        <Row className=''>
          <Col className="ms-5 text-center mt-4">
            <Image src="/login-logo.png" className='mb-3 w-1 h-1'/>
            <h2 className='fw-bold'>Log In</h2>
            <p className='fw-bold'>Watch anything, anywhere, and anyhow</p>
            <Form noValidate validated={validated} onSubmit={onSubmitWrapped}>
              <Form.Group className="ms-3 mb-3" controlId="email">
                <Form.Control type="email" ref={emailRef} placeholder='Enter your email here' className=' ' required />
              </Form.Group>

              <Form.Group className='ms-3 mb-3' controlId="password">
                <Form.Control type="password" ref={passwordRef} placeholder='Enter your password here' className='' required />
              </Form.Group>

              <Form.Group className="ms-3 mb-3" controlId="rememberMe">
                <Form.Check type="switch" label="Remember me" className='text-start'/>
              </Form.Group>

              <Button type="submit" variant="danger">Continue</Button>
            </Form>
            <p className='mt-1'>Or using</p>
            
            <Link to=''><Image src="facebook-icon.png" className='me-2'/></Link>
            <Link to=''><Image src="google-icon.png" className='ms-2'/></Link>

            <p className='mt-3'>Don't have an account? <Link to="/signup">Create one!</Link></p>
            <br/>
            <small className='mt-5'>@2023 Cinomnia</small>
          </Col>

          <Col className=''>
          <Image src="/login-background.png" className='ms-5'/>
          </Col>
        </Row>
    </>
  );
}
