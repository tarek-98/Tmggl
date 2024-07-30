import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";

// get lowest price products
export const lowestPriceProducts = createAsyncThunk(
  "sort/lowestPriceProducts",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/client/The-lowest-price`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get highest  price products
export const highestPriceProducts = createAsyncThunk(
  "sort/highest PriceProducts",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/client/The-highest-price`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get high rates  products
export const highRatesProducts = createAsyncThunk(
  "sort/highRatesProducts",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/client/high-rated-products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get trending products views
export const trendingProductsViews = createAsyncThunk(
  "sort/trendingProductsViews",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/client/all-trending-products`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// increase product views
export const increaseProductViews = createAsyncThunk(
  "sort/increaseProductViews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/client/increase-product-views/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sortSlice = createSlice({
  name: "sort",
  initialState: {
    status: "idle",
    error: null,
    viewedProducts: {},
    lowestPriceProducts: [],
    highestPriceProducts: [],
    trendingProductsViews: [],
  },
  reducers: {
    addViewedProduct: (state, action) => {
      state.viewedProducts[action.payload] = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(lowestPriceProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(lowestPriceProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lowestPriceProducts = action.payload;
      })
      .addCase(lowestPriceProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(highestPriceProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(highestPriceProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.highestPriceProducts = action.payload;
      })
      .addCase(highestPriceProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(trendingProductsViews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(trendingProductsViews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trendingProductsViews = action.payload;
      })
      .addCase(trendingProductsViews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(increaseProductViews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(increaseProductViews.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(increaseProductViews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addViewedProduct } = sortSlice.actions;

export default sortSlice.reducer;
