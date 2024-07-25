import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "ordersSlice/fetchOrder",
  async () => {
    const res = await fetch("http://localhost:9000/orders");
    const data = await res.json();
    return data;
  }
);
export const fetchSingleOrder = createAsyncThunk(
  "singleOrder/fetchOrder",
  async (id) => {
    const res = await fetch(`http://localhost:9000/orders/${id}`);
    const data = await res.json();
    return data;
  }
);
const initialState = {
  orders: [],
  singleOrder: [],
};
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
      });
  },
});

export const {} = ordersSlice.actions;
export const getAllOrders = (state) => state.orders.orders;
export const getSingleOrder = (state) => state.orders.singleOrder;
export default ordersSlice.reducer;
