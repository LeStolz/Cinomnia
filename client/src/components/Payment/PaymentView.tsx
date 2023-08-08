import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function PaymentView() {
  const navigate = useNavigate();
  return (
    <Container className="pt-5">
      <Row className="mt-5 text-center">
        <Col>
          <Button className="rounded-circle h-md w-md">1</Button>
          <p>Payment Method</p>
        </Col>
        <Col>
          <Button
            variant="outline-primary"
            className="rounded-circle h-md w-md"
            onClick={() => navigate("/successful")}
          >
            2
          </Button>
          <p>Payment Method</p>
        </Col>
      </Row>
      <Row className="border border-1 p-2 rounded mt-2 bg-secondary">
        <Col xs={3}>
          <h2>Studio Name</h2>
        </Col>
        <Col xs={3}>
          <p>Items: ....</p>
          <p>Payment Method: ....</p>
        </Col>
        <Col xs={4}>
          <Container fluid className="d-flex justify-content-between">
            <p>Total net:</p>
            <p>$..... net</p>
          </Container>
          <Container fluid className="d-flex justify-content-between">
            <p>Total price:</p>
            <p>$..... price</p>
          </Container>
        </Col>
        <Col className="d-flex flex-column align-items-end" xs={2}>
          <p>Status</p>
          <p>Field</p>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={4}
          className=" bg-secondary border border-1 p-2 mt-2 rounded me-2"
        >
          <h2>Delivery Details</h2>
          <h3>Name of Account</h3>
          <Image />
          <p>Contact Infomation</p>
          <Button variant="link" className="text-decoration-none">
            Edit Dtailes
          </Button>
        </Col>
        <Col xs={12} sm={12} md={6} lg={4} className="d-flex flex-column me-2">
          <Row className="border border-1 p-2 rounded mt-2 mb-2 text-center bg-secondary">
            <i className="bi bi-wallet-fill h2"></i>
          </Row>
          <Row className="border border-1 p-2 rounded mt-1 bg-secondary flex-grow-1">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Form.Label className="h5">Credit or Debit card</Form.Label>
                </Row>
                <Row className="p-3">
                  <Container className="mt-2">
                    <h6>Card Number</h6>
                    <Form.Control
                      type="number"
                      placeholder="Enter your card number"
                    />
                  </Container>
                  <Container className="mt-4">
                    <h6>Expired day</h6>
                    <Form.Control
                      type="number"
                      placeholder="Enter your card number"
                    />
                  </Container>
                </Row>
              </Form.Group>
            </Form>
            <Button
              className="w-100 mb-4 rounded"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Row>
        </Col>
        <Col
          className="d-flex flex-column bg-secondary border border-1 mt-2 rounded"
        >
          <Row>
            <h2>Sumary</h2>
          </Row>
          <Row className="border border-1 p-2 rounded mt-2 mb-2">
            <Col>
              <p className="h4">Genre: ...</p>
              <p>Items: ...</p>
            </Col>
            <Col className="d-flex flex-column align-items-end">
              <p className="h6">Price: ...</p>
            </Col>
          </Row>
          <Row>
            <Container className="d-flex justify-content-between">
              <span>Price net:</span>
              <span>$.....</span>
            </Container>
            <Container className="d-flex justify-content-between">
              <span>Discount:</span>
              <span>$.....</span>
            </Container>
            <Container className="d-flex justify-content-between">
              <h5>Total Price:</h5>
              <h5>$.....</h5>
            </Container>
          </Row>
          <Row>
            <Button
              className="w-100 rounded-pill mt-3"
              variant="primary"
              onClick={() => navigate("/successful")}
            >
              Pay
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
