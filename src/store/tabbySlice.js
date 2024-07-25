import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  methods: [],
  status: "idle",
  error: null,
};

export const fetchPaymentsMethods = createAsyncThunk(
  "payments/fetchPaymentsMethods",
  async () => {
    const response = await axios.get("http://localhost:9000/payments");
    return response.data;
  }
);

export const togglePaymentsMethods = createAsyncThunk(
  "payments/togglePaymentsMethods",
  async (id, { getState }) => {
    const payment = getState().payments.methods.find(
      (method) => method.id === id
    );
    const updatedMethod = { ...payment, enabled: !payment.enabled };
    await axios.put(`http://localhost:9000/payments/${id}`, updatedMethod);
    return updatedMethod;
  }
);

const tabbySlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentsMethods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaymentsMethods.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.methods = action.payload;
      })
      .addCase(fetchPaymentsMethods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(togglePaymentsMethods.fulfilled, (state, action) => {
        const index = state.methods.findIndex(
          (method) => method.id === action.payload.id
        );
        if (index !== -1) {
          state.methods[index] = action.payload;
        }
      });
  },
});

export default tabbySlice.reducer;
