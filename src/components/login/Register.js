import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import {
  registerUser,
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

  const { phoneNumberRegister, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(setIsRegisterd(false));
  }, [phone]);

  const saudiPhoneNumberRegex = /^0[0-9]{9}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saudiPhoneNumberRegex.test(phoneNumberRegister)) {
      dispatch(
        registerUser({
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          PhoneNumber: phoneNumberRegister,
          Password: "123",
        })
      );
    } else {
      e.preventDefault();
      toast.error("ادخل رقم جوال صالح", {
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

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
