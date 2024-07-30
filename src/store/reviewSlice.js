// src/features/review/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (VendorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/client/view-vendor-reviews/${VendorId}`
      );
      console.log(response.data.data);
      console.log(VendorId);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      console.log(VendorId);
      return rejectWithValue(error.response.data);
    }
  }
);

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({ vendorId, userId, rating, reviewText }) => {
    const response = await axios.patch(
      `${API_URL}/client/add-vendor-review`,
      {
        vendorId,
        userId,
        rating,
        reviewText,
      },
      {
        headers: {
          Authorization: `${Authorization}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
