// src/components/ReviewForm.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, submitReview } from "../../store/reviewSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import { toast, ToastContainer } from "react-toastify";

const ReviewForm = ({ vendorId }) => {
  const [rating, setRating] = useState(0);
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const userData = userInfo ? userInfo.data : null;
  const userId = userData ? userData._id : null;
  const [reviewText, setReviewText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(vendorId);
  }, []);

  const handleSubmit = () => {
    if (reviewText === "") {
      toast.error("تقييم فارغ", {
        position: "top-left",
      });
    } else {
      dispatch(submitReview({ vendorId, userId, rating, reviewText })); //test
      setTimeout(() => {
        dispatch(fetchReviews(vendorId));
      }, 1000);
    }
    setRating(0);
    setReviewText("");
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        اضف تقييمك
      </Typography>
      <Rating
        dir="ltr"
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <div dir="rtl">
        <TextField
          label="التقييم"
          multiline
          rows={2}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isAuthenticated}
      >
        اضف
      </Button>
      <ToastContainer />
    </Box>
  );
};

export default ReviewForm;
