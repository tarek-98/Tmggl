import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

// Thunks for sending OTP and verifying OTP
export const sendOTP = createAsyncThunk("auth/sendOTP", async (PhoneNumber) => {
  const response = await fetch(`${API_URL}/client/send-otp-phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ PhoneNumber }),
  });
  return response.json();
});

// Async thunk to verify login code
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ phoneNumber, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/client/login-Phone-validate-code/${otp}`,
        {
          body: {
            PhoneNumber: phoneNumber,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to verify singup code
export const verifySignUpOTP = createAsyncThunk(
  "auth/verifySignUpOTP",
  async (
    { phoneNumberRegister, otp, email, firstName, lastName },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/client/signup-Phone-validate-code/${otp}`,
        {
          body: {
            Email: email,
            Password: "123",
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumberRegister,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
  async (
    { Email, FirstName, LastName, PhoneNumber, Password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/client/sign-up`,
        {
          Email,
          FirstName,
          LastName,
          PhoneNumber,
          Password,
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for user login

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
    email: "",
    firstName: "",
    lastName: "",
    phoneNumberRegister: "",
    otp: "",
    status: "idle",
    error: null,
    isNewUser: false,
    userInfo: null,
    token: localStorage.getItem("token") || null,
    isRegisterd: false,
    isAuthenticated: false,
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmailRegister: (state, action) => {
      state.email = action.payload;
    },
    setFirstNameRegister: (state, action) => {
      state.firstName = action.payload;
    },
    setLastNameRegister: (state, action) => {
      state.lastName = action.payload;
    },
    setPhoneNumberRegister: (state, action) => {
      state.phoneNumberRegister = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsRegisterd: (state, action) => {
      state.isRegisterd = action.payload;
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
      .addCase(verifySignUpOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifySignUpOTP.fulfilled, (state, action) => {
        state.status = "otpSucceeded";
        state.isRegisterd = true;
      })
      .addCase(verifySignUpOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.status = "otpSucceeded";
        state.isAuthenticated = true;
        state.isNewUser = action.payload.isNewUser;
        state.userInfo = action.payload;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "logging in succeeded";
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
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
        state.status = "register succeeded";
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const {
  setPhone,
  setEmailRegister,
  setFirstNameRegister,
  setLastNameRegister,
  setOtp,
  setIsAuthenticated,
  setPhoneNumber,
  setPhoneNumberRegister,
  setIsRegisterd,
} = authSlice.actions;

export default authSlice.reducer;
