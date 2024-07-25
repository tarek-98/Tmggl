import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";

// Thunks for sending OTP and verifying OTP
export const sendOTP = createAsyncThunk("auth/sendOTP", async (phoneNumber) => {
  const response = await fetch(`${API_URL}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });
  return response.json();
});

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ phoneNumber, otp }) => {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    return response.json();
  }
);

// Async thunk for user login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, pass }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/client/login/${email}/${pass}`
      );
      localStorage.setItem("token", response.data.JWT);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/client/sign-up`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for user login
const Authorization = localStorage.getItem("token");
export const logOutAsync = createAsyncThunk("auth/logOutAsync", async () => {
  // Example of access request and obtaining token
  fetch(`${API_URL}/client/logout`, {
    method: "POST",
    headers: {
      Authorization: `${Authorization}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error logging in:", error));
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    phoneNumber: "",
    otp: "",
    status: "idle",
    error: null,
    isNewUser: false,
    userInfo: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isNewUser = action.payload.isNewUser;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "logging in succeeded";
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.token = action.payload.JWT;
        localStorage.setItem("token", action.payload.JWT);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = false;
        state.userInfo = null;
        state.token = null;
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.token = action.payload.JWT;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const { setPhone, setOtp, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
