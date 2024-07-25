// src/slices/notificationsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await axios.get("http://localhost:9000/notifications");
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
