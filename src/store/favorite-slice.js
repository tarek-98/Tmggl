import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

export const fetchFavoriteProduct = createAsyncThunk(
  "favorite/fetchFavoriteProduct",
  async (UserId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/client/all-favourite-products/${UserId}`,
        {
          headers: {
            Authorization: `${Authorization}`,
            // "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToFavorite = createAsyncThunk(
  "favorite/addToFavorite",
  async ({ vendorId, productId, UserId }) => {
    fetch(
      `${API_URL}/client/add-favourite-product/${vendorId}/${productId}/${UserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${Authorization}`,
          // "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("add to fav");
        return data;
      })
      .catch((error) => console.error("Error logging in:", error));
  }
);
export const delFavorite = createAsyncThunk(
  "favorite/delFavorite",
  async ({ productId, UserId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/client/delete-favourite-product/${productId}/${UserId}`,
        {
          headers: {
            Authorization: `${Authorization}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      console.log(UserId, productId);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      console.log(UserId, productId);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  favorites: [],
  loading: false,
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
  status: "idle",
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  status: "idle",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteProduct.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchFavoriteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload.productDetails;
        state.status = "favorite Product successed";
      })
      .addCase(fetchFavoriteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(addToFavorite.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "added Successffully";
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(delFavorite.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(delFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "deleted Successffully";
      })
      .addCase(delFavorite.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllFavorites = (state) => state.favorite.favorites;
export const getCartItemsCount = (state) => state.favorite.itemsCount;

export default favSlice.reducer;
