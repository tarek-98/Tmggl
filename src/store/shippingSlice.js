// src/features/shipping/shippingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  methods: [],
  status: "idle",
  error: null,
};

export const fetchShippingMethods = createAsyncThunk(
  "shipping/fetchShippingMethods",
  async () => {
    const response = await axios.get("http://localhost:9000/shipping-methods");
    return response.data;
  }
);

export const toggleShippingMethod = createAsyncThunk(
  "shipping/toggleShippingMethod",
  async (id, { getState }) => {
    const method = getState().shipping.methods.find(
      (method) => method.id === id
    );
    const updatedMethod = { ...method, enabled: !method.enabled };
    await axios.put(
      `http://localhost:9000/shipping-methods/${id}`,
      updatedMethod
    );
    return updatedMethod;
  }
);

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingMethods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShippingMethods.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.methods = action.payload;
      })
      .addCase(fetchShippingMethods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleShippingMethod.fulfilled, (state, action) => {
        const index = state.methods.findIndex(
          (method) => method.id === action.payload.id
        );
        if (index !== -1) {
          state.methods[index] = action.payload;
        }
      });
  },
});

export default shippingSlice.reducer;
