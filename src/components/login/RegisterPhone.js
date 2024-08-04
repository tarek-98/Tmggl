import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOTP,
  setIsRegisterd,
  setPhoneNumber,
  setPhoneNumberRegister,
} from "../../store/authSlice";
import { useNavigate } from "react-router";
import "./login.css";
import logo from "../../assets/images/logo.jpeg";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterPhone = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const saudiPhoneNumberRegex = /^0[0-9]{9}$/;
  const lastNineDigits = phone.length === 10 && phone.slice(-9);

  useEffect(() => {
    dispatch(setIsRegisterd(false));
    console.log(lastNineDigits);
  }, [phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(status);
    if (saudiPhoneNumberRegex.test(phone)) {
      dispatch(setPhoneNumberRegister(phone));
      dispatch(sendOTP(lastNineDigits));
      navigate("/verifySingupOtp");
    } else {
      toast.error("ادخل رقم جوال صالح", {
        position: "top-left",
      });
    }
  };

  return (
    <div className="logIn-main">
      <div className="conatiner">
        <div className="row">
          <div className="col-lg-12">
            <div className="logo mb-3">
              <img src={logo} alt="" className="w-100" />
            </div>
            <h2 className="mb-1">اهلا عزيزي مستخدم تمقل</h2>
            <span>قم بادخال رقم الجوال</span>
            <div className="form mt-3">
              <form onSubmit={handleSubmit} className=" d-flex flex-column">
                <input
                  className="mb-2"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال 0512345678"
                  required
                  maxLength="10"
                  minLength="10"
                  name="phone"
                />
                <button type="submit" className="mb-2" value="">
                  تأكيد الجوال
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPhone;
