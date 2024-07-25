import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { status, error, isNewUser, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://your-api-url.com/register", {
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    navigate("/profile");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="ادخل الاسم الاول"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="ادخل الاسم الخير"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ادخل رقم الجوال"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="ادخل رقم الجوال"
          required
        />
        <button type="submit">انشاء حساب</button>
      </form>
    </div>
  );
};

export default Register;
