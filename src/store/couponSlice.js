import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coupons: {},
  status: "idle",
  error: null,
};

export const fetchCoupon = createAsyncThunk(
  "coupons/fetchCoupon",
  async (code) => {
    const response = await axios.get(
      `http://localhost:9000/coupons?code=${code}`
    );
    return response.data[0];
  }
);

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      const { vendor, discount } = action.payload;
      state.coupons[vendor] = discount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoupon.fulfilled, (state, action) => {
        state.status = "succeeded";
        const coupon = action.payload;
        if (coupon) {
          state.coupons[coupon.vendor] = coupon.discount;
        }
      })
      .addCase(fetchCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { applyCoupon } = couponSlice.actions;
export default couponSlice.reducer;
