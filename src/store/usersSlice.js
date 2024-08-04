import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

export const editUser = createAsyncThunk(
  "product/editUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/client/edit-profile/${id}`,
        userData,
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (id) => {
    const response = await axios.get(`${API_URL}/client/client-profile/${id}`, {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg2ODYzMjZ9.bt9szP4w1_Zx9Kv4fi8OKIEJ7D97A5R2dVchd86WrnQ`,
        // "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    singleUser: [],
    user: [],
    status: "idle",
    reducers: {},
  },

  extraReducers: (builder) => {
    builder.addCase(editUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = "succeded";
    });
    builder
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.singleUser = action.payload;
        const user = action.payload.data;
        state[user && user._id] = user;
        state.status = "succeded";
      });
  },
});

export const {} = usersSlice.actions;
export const getUserSingle = (state) => state.userSingle;
export const selectUserById = (state, userId) => state.users[userId];
export default usersSlice.reducer;
