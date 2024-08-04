import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifySignUpOTP } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import OtpInput from "react-otp-input";
import "./ckeck.css";

const VerifySingupOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { phoneNumberRegister, status, error, isRegisterd } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isRegisterd === true) {
      navigate("/register");
    }
  }, [isRegisterd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(verifySignUpOTP({ phoneNumberRegister, otp }));
    } catch (error) {
      console.error("Email verification failed:", error);
    }
    console.log(isRegisterd);
  };

  return (
    <div className="verify-main">
      <div className="container">
        <h3 className="mb-4">قم بتأكيد رقم الجوال</h3>
        <span className="mb-3">
          تم إرسال كلمة المرور المؤقتة إلى <br />
          {phoneNumberRegister}
        </span>
        <form
          onSubmit={handleSubmit}
          className="mt-4 d-flex justify-content-center align-items-center flex-column"
        >
          <OtpInput
            className="justify-content-center"
            containerStyle="justify-content-center mb-3 otp-input"
            shouldAutoFocus={true}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType="number"
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button type="submit" className="btn-24">
            <span>تحقق</span>
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifySingupOtp;
