import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import PaymentPhoto from "../../../public/PaymentSuccessfull.jpeg"
import { useNavigate } from "react-router-dom";
export function PaymentNotification() {
  const navigate = useNavigate();
  return (
    <Container className="pt-5">
      <Row className="mt-5 text-center">
        <Col>
          <Button
            variant="outline-primary"
            className="rounded-circle h-md w-md"
            onClick={() => navigate("/payment")}
          >
            1
          </Button>
          <p>Payment Method</p>
        </Col>
        <Col>
          <Button className="rounded-circle h-md w-md">2</Button>
          <p>Payment Method</p>
        </Col>
      </Row>
      <Row>
        <Col
          md={12}
          lg={6}
          className="text-white bg-primary border border-1 p-5 mt-2 rounded"
        >
          <h1>Thank you for your order!</h1>
          <h4>Order No. #809320, #249320, #409320 and #809320.</h4>
          <p>
            We’ll email you an order confirmation with details and tracking
            info.
          </p>
          <Button variant="link" className="text-white text-decoration-none">
            <i className="bi bi-printer-fill me-1"></i>
            Print receipt
          </Button>
        </Col>
        <Col className="mt-2">
          <Image
            className="w-100 h-100 rounded"
            src={PaymentPhoto}
            alt="Successfully added payment"
          />
        </Col>
      </Row>
      <Row className="border border-1 p-2 rounded mt-2 bg-secondary">
        <Col md={12} lg={6}>
          <h1>Your purchase</h1>
          <ul className="list-unstyled">
            <li>afa</li>
            <li>rrqr</li>
            <li>qwrwrewr</li>
            <li>rqrwr</li>
          </ul>
        </Col>
        <Col>
          <h3>Primary contacts for any questions</h3>
          <ul className="list-unstyled m-0">
            <li>Ward 4, District 5</li>
            <li>St. Nguyen Van Cu, 227</li>
            <li>Ho Chi Minh, Viet Nam</li>
          </ul>
          <Button variant="link" className="text-info text-decoration-none p-0">
            <i className="bi bi-envelope-at me-1"></i>
            example@gmail.com
          </Button>
        </Col>
        {/* button navigate */}
        <Container className="d-flex justify-content-center justify-content-lg-start p-3">
          <Button
            className="w-auto rounded-pill ps-5 pe-5 me-3"
            variant="outline-primary"
            onClick={() => navigate("/successful")}
          >
            Go to my Account
          </Button>
          <Button
            className="w-auto rounded-pill ps-5 pe-5"
            variant="primary"
            onClick={() => navigate("/")}
          >
            Continue Watching
          </Button>
        </Container>
      </Row>
    </Container>
  );
}
