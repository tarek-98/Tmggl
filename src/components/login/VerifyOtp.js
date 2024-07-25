import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, verifyOtp } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { phoneNumber, status, error, isNewUser, userInfo } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (status === "succeeded") {
      if (isNewUser) {
        navigate("/register");
      } else {
        navigate("/profile");
      }
    }
  }, [status, isNewUser, navigate]);

  const handleVerifyOTP = () => {
    dispatch(setOtp(otp));
    dispatch(verifyOTP({ phoneNumber, otp }));
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOTP}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
        {status === "loading" && <p>Verifying OTP...</p>}
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export default VerifyOtp;
