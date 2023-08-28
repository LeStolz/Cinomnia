import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Button, Image, Modal, Row, Col } from "react-bootstrap";
import { PurchaseHistoryModel } from "./PurchaseHistoryModel";
import { PurchaseHistory } from "../../configs/Model";
import { useNavigate } from "react-router-dom";

interface ModalCartProps {
  show: boolean | undefined;
  handleClose: () => void;
  history: PurchaseHistory[];
}

const ModalPurchaseHistory = ({
  show,
  handleClose,
  history,
}: ModalCartProps) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    handleClose();
  };
  const handleGoToStore = () => {
    handleClose();
    navigate("/store");
  };
  const tempHistory = history;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purchase History List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tempHistory.length > 0 ? (
          <Container className="m-1">
            {tempHistory.map((data: PurchaseHistory, index) => (
              <React.Fragment key={index}>
                <Row className="mb-3">
                  <Col xs={2}>
                    <Image
                      src={`${data.film.poster.img_500}`}
                      className="rounded-circle border border-1 w-lg h-lg"
                    />
                  </Col>
                  <Col>
                    <Row className="p-0">
                      <h6 className="text-success movie-name overflow-hidden">
                        {data.film.title}
                      </h6>
                    </Row>
                    <Row className="p-0">
                      <Col>
                        <span>
                          {new Date(data.createdAt).toLocaleDateString("en-GB")}
                        </span>
                        <h6 className="text-primary">{`${data.film.price.toFixed(
                          2
                        )} VND`}</h6>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr></hr>
              </React.Fragment>
            ))}
          </Container>
        ) : (
          <h2>No any items</h2>
        )}
      </Modal.Body>
      <Modal.Footer>
        <h5 className="px-2">{`${tempHistory.length} transation`}</h5>
        <Button variant="primary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export function PurchaseHistory() {
  const [history, setHistory] = useState<PurchaseHistory[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const { getUser } = useAuth();
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const model = new PurchaseHistoryModel();
      try {
        const reponse = await model.getPurchaseList(await getUser());
        if (reponse) {
          setHistory(reponse);
        } else {
          console.error("Film not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPurchaseHistory();
  }, []);
  const handleShowCartModal = () => {
    setShowCartModal(true);
  };
  const handleCloseModal = () => {
    setShowCartModal(false);
  };
  return (
    <>
      <Button
        variant="link"
        className="text-decoration-none"
        onClick={handleShowCartModal}
      >
        <i className="bi bi-download me-1"></i>
        Purchase History
      </Button>

      <ModalPurchaseHistory
        show={showCartModal}
        handleClose={handleCloseModal}
        history={history}
      />
    </>
  );
}
