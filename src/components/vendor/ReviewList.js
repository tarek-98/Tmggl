// src/components/ReviewList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviewSlice";
import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import { Col, Row } from "react-bootstrap";
import { fetchFollowers, getAllFollowers } from "../../store/vendorsSlice";

const ReviewList = ({ vendorId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const userId = userData ? userData._id : null;
  const reviewsData = reviews ? reviews.data : null;
  const followers = useSelector(getAllFollowers);

  useEffect(() => {
    dispatch(fetchReviews(vendorId));
    dispatch(fetchFollowers(userId));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Row>
      {reviewsData &&
        reviewsData.reviews.map((review, index) => (
          <Col lg="4">
            <Box
              key={index}
              sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
            >
              {/*<p>{review.name}</p> */}
              <Rating value={review.rating} readOnly />
              <Typography variant="body1">{review.reviewText}</Typography>
            </Box>
          </Col>
        ))}
    </Row>
  );
};

export default ReviewList;
