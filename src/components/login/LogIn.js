import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, sendOTP, setPhoneNumber } from "../../store/authSlice";
import { useNavigate } from "react-router";
import "./login.css";
import logo from "../../assets/images/logo.jpeg";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const saudiPhoneNumberRegex = /^0[0-9]{9}$/;

  useEffect(() => {
    if (status === "logging in succeeded") {
      navigate("/profile");
    }
  }, [status]);
  useEffect(() => {
    document.title = "تسجيل الدخول الي حسابك";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(status);
    dispatch(loginAsync({ email, pass }));
  };

  return (
    <div className="logIn-main">
      <div className="conatiner">
        <div className="row">
          <div className="col-lg-12">
            <div className="logo mb-3">
              <img src={logo} alt="" className="w-100" />
            </div>
            <h2 className="mb-3">اهلا عزيزي مستخدم تمقل</h2>
            <div className="form">
              <form onSubmit={handleSubmit} className=" d-flex flex-column">
                <input
                  className="mb-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="مثال 0512345678"
                  required
                  // maxLength="10"
                  // minLength="10"
                  name="phone"
                />
                <input
                  className="mb-2"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  // placeholder="مثال 0512345678"
                  required
                  // maxLength="10"
                  // minLength="10"
                  name="pass"
                />
                <button type="submit" className="mb-2" value="">
                  تسجيل الدخول
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

export default Login;
