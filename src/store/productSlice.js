import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import axios from "axios";

const API_URL = "https://tager.onrender.com";
const Authorization = localStorage.getItem("token");

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
  newestProducts: [],
  newestProductsStatus: STATUS.IDLE,
  trendProducts: [],
  trendProductsStatus: STATUS.IDLE,
  productsByVendor: [],
  productsByVendorStatus: STATUS.IDLE,
  sharedProduct: [],
  sharedProductState: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.productsStatus = "loading";
      })

      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
      })

      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED;
      })

      .addCase(fetchAsyncNewestProducts.pending, (state, action) => {
        state.newestProductsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncNewestProducts.fulfilled, (state, action) => {
        state.newestProducts = action.payload;
        state.newestProductsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncNewestProducts.rejected, (state, action) => {
        state.newestProductsStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncTrendProducts.pending, (state, action) => {
        state.trendProductsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncTrendProducts.fulfilled, (state, action) => {
        state.trendProducts = action.payload;
        state.trendProductsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncTrendProducts.rejected, (state, action) => {
        state.trendProductsStatus = STATUS.FAILED;
      })

      .addCase(fetchProductByVendor.pending, (state, action) => {
        state.productsByVendorStatus = STATUS.LOADING;
      })

      .addCase(fetchProductByVendor.fulfilled, (state, action) => {
        state.productsByVendor = action.payload;
        state.productsByVendorStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchProductByVendor.rejected, (state, action) => {
        state.productsByVendorStatus = STATUS.FAILED;
      })

      .addCase(shareProduct.fulfilled, (state, action) => {
        state.sharedProduct = action.payload;
        state.sharedProductState = STATUS.SUCCEEDED;
      });
  },
});

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const response = await axios.get(`${API_URL}/products/getall`, {
      headers: {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIE1heSAyMiAyMDI0IDE5OjM5OjI5IEdNVCswMzAwICjYqtmI2YLZitiqINi02LHZgiDYo9mI2LHZiNio2Kcg2KfZhNi12YrZgdmKKSIsInVzZXJJZCI6IjY2NGEzNTQ2Njk4NTVkNmM3OGJhZjEyNiIsImlhdCI6MTcxNjM5NTk2OX0.MgCtXcPKZQwFHNmZ_eesNTi4oqDxCg4-kulBDIY8kXA`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const fetchAsyncNewestProducts = createAsyncThunk(
  "newestProducts/fetch",
  async () => {
    const response = await axios.get(`${API_URL}/products/sortedProducts`);
    return response.data;
  }
);
export const fetchAsyncTrendProducts = createAsyncThunk(
  "TrendProducts/fetch",
  async () => {
    const response = await axios.get(`${API_URL}/client/all-trending-products`);
    return response.data;
  }
);

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    // const response = await fetch(`${API_URL}/products/product/${id}`);
    const response = await fetch(
      `${API_URL}/client/view-productByProductId/${id}`
    );
    const data = await response.json();
    return data;
  }
);

// getting the single product data also
export const fetchProductByVendor = createAsyncThunk(
  "fetchProductByVendor/fetch",
  async (vendorId) => {
    const response = await axios.get(`${API_URL}/products/products/${vendorId}`, {
      headers: {
        authorization: `${Authorization}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  }
);
// share product
export const shareProduct = createAsyncThunk(
  "shareProduct/fetch",
  async (productId) => {
    const response = await fetch(`${API_URL}/products/share/${productId}`);
    const data = await response.json();
    return data;
  }
);

export const getAllProducts = (state) => state.product.products;
export const getAllNewestProducts = (state) => state.product.newestProducts;
export const getNewestProductsStatus = (state) =>
  state.product.newestProductsStatus;
export const getAllTrendProducts = (state) => state.product.trendProducts;
export const getTrendProductsStatus = (state) =>
  state.product.trendProductsStatus;
export const getProductsByVendor = (state) => state.product.productsByVendor;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSharedProduct = (state) => state.product.sharedProduct;
export const getSingleProductStatus = (state) =>
  state.product.productSingleStatus;
export default productSlice.reducer;
