import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import {
  sendOTP,
  setEmailRegister,
  setFirstNameRegister,
  setIsRegisterd,
  setLastNameRegister,
  setPhoneNumberRegister,
} from "../../store/authSlice";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsRegisterd(false));
  }, [phone]);

  const saudiPhoneNumberRegex = /^0[0-9]{9}$/;
  const lastNineDigits = phone.length === 10 && phone.slice(-9);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saudiPhoneNumberRegex.test(phone)) {
      dispatch(sendOTP(lastNineDigits));
      dispatch(setPhoneNumberRegister(phone));
      dispatch(setEmailRegister(email));
      dispatch(setFirstNameRegister(firstName));
      dispatch(setLastNameRegister(lastName));
      navigate("/verifySingupOtp");
    } else {
      toast.error("ادخل رقم جوال صالح", {
        position: "top-left",
      });
    }
  };

  return (
    <div className="register-main">
      <div className="container form-container">
        <h2 className="text-center">انشاء حساب جديد</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="ادخل الاسم الاول"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="ادخل الاسم الاخير"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ادخل الايميل"
              required
            />
            <input
              className="form-control"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="مثال 0512345678"
              required
              maxLength="10"
              minLength="10"
              name="phone"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            انشاء حساب
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
