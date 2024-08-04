import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { status, phoneNumberRegister } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://tager-dpsl.onrender.com/client/sign-up", {
      Email: email,
      Password: "123",
      FirstName: firstName,
      LastName: lastName,
      PhoneNumber: phoneNumberRegister,
    });
  };

  useEffect(() => {
    if (status === "register succeeded") {
      navigate("/profile");
    }
  }, [status, navigate]);

  return (
    <div className="register-main">
      <div className="container form-container">
        <h2 className="text-center">انشاء حساب جديد</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
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
    </div>
  );
};

export default Register;
