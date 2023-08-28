import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { Review } from "../configs/Model";
import { Button, Card, Container, Image, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../configs/Model";

interface ReviewProps {
  filmId: number;
}

const Review: React.FC<ReviewProps> = ({ filmId }) => {
  const { getUser } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User>();
  const [newReview, setNewReview] = useState("");
  const [editedReviewId, setEditedReviewId] = useState("");
  const [editedReviewContent, setEditedReviewContent] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/films/${filmId}`);
      setReviews(response.data[0].review);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const submitReview = async () => {
    try {
      if (newReview.trim() === "") {
        console.error("Review content cannot be empty.");
        return;
      }
      await api.post(`/films/${filmId}`, {
        review: newReview,
        user: user?.email || "anonymous",
      });
      fetchReviews();
      setNewReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const editReview = async (reviewId: string, currentContent: string) => {
    setEditedReviewId(reviewId);
    setEditedReviewContent(currentContent);
  };

  const saveEditedReview = async (reviewId: string) => {
    try {
      if (editedReviewContent.trim() === "") {
        console.error("Review content cannot be empty.");
        return;
      }

      await api.put(`/films/${filmId}/reviews/${reviewId}`, {
        content: editedReviewContent,
      });
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId
          ? { ...review, content: editedReviewContent }
          : review
      );
      setReviews(updatedReviews);
      setEditedReviewId("");
      setEditedReviewContent("");
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await api.delete(`/films/${filmId}/reviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleReviewInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitReview();
    }
  };

  return (
    <div>
      <Card className="shadow border-0 bg-secondary my-3 rounded">
        <Card.Title className="p-3 mb-0 bg-light-subtle">Review</Card.Title>
        <div className="p-2 d-flex">
          <Image
            className="rounded-circle shadow-1-strong me-3"
            src={
              "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
            }
            alt="avatar"
            width="50"
            height="50"
          />
          <Form.Control
            aria-describedby="passwordHelpBlock"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            onKeyPress={handleReviewInputKeyPress}
            placeholder="What are you thinking"
          />
          <div className="m-2 clearfix">
            <Button className="float-end m-2" onClick={submitReview}>
              Publish
            </Button>
          </div>
        </div>
      </Card>

      <ul className="list-unstyled m-3">
        {reviews.map((review) => (
          <li key={review._id}>
            {editedReviewId === review._id ? (
              <>
                <Card className="mb-3 shadow">
                  <Card.Body>
                    <Container className="d-flex flex-start">
                      <Image
                        className="rounded-circle shadow-1-strong me-3"
                        src={
                          "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
                        }
                        alt="avatar"
                        width="50"
                        height="50"
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <Container>
                            <h6 className="text-primary fw-bold mb-0">
                              {review?.user}
                            </h6>
                            <Form.Control
                              type="text"
                              aria-describedby="passwordHelpBlock"
                              value={editedReviewContent}
                              onChange={(e) =>
                                setEditedReviewContent(e.target.value)
                              }
                            />
                          </Container>
                          <p className="mb-0">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="small mb-0" style={{ color: "#aaa" }}>
                            <Button
                              variant="link"
                              className="text-decoration-none"
                              onClick={() => saveEditedReview(review._id)}
                            >
                              Save
                            </Button>
                          </p>
                        </div>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
              </>
            ) : (
              <>
                <Card className="mb-3 shadow">
                  <Card.Body>
                    <Container className="d-flex flex-start">
                      <Image
                        className="rounded-circle shadow-1-strong me-3"
                        src={
                          "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
                        }
                        alt="avatar"
                        width="50"
                        height="50"
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <Container>
                            <h6 className="text-primary fw-bold mb-0">
                              {/* lara_stewart */}
                              {review?.user || "anonymous"}
                            </h6>
                            <span className="ms-2">{review.content}</span>
                          </Container>
                          <p className="mb-0">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="small mb-0" style={{ color: "#aaa" }}>
                            <Button
                              variant="link"
                              className="text-decoration-none"
                              onClick={() => deleteReview(review._id)}
                              hidden={review?.user !== user?.email}
                            >
                              Delete
                            </Button>
                            •
                            <Button
                              variant="link"
                              className="text-decoration-none"
                              onClick={() =>
                                editReview(review._id, review.content)
                              }
                              hidden={review?.user !== user?.email}
                            >
                              Edit
                            </Button>
                          </p>
                        </div>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
