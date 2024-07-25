import React, { useEffect, useState } from "react";
import "./userProfile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchUsers } from "../../store/usersSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

function EditInfo() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    Password: "",
    Email: "",
    PhoneNumber: "",
  });

  const { userInfo } = useSelector((state) => state.auth);
  const userInformation = userInfo && userInfo[`Client data`][0];
  const id = userInformation && userInformation._id;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(userInfo);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  function handleEdit() {
    dispatch(editUser({ id, userData }));
  }

  const validateForm = () => {
    if (userData.FirstName === "") {
      toast.error("الاسم الاول مطلوب", {
        position: "top-left",
      });
      return false;
    } else if (userData.LastName === "") {
      toast.error("الاسم الاخير مطلوب", {
        position: "top-left",
      });
      return false;
    } else if (userData.PhoneNumber === "") {
      toast.error("رقم الجوال مطلوب", {
        position: "top-left",
      });
      return false;
    } else if (userData.Email === "") {
      toast.error("الايميل مطلوب", {
        position: "top-left",
      });
      return false;
    }
    return true;
  };

  const formSubmet = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleEdit();
    }
  };

  return (
    <div className="user-profile">
      <div className="logo mb-3">
        <img src={logo} alt="" className="logo w-100" />
      </div>
      <div className="back">
        <Link
          to="/profile"
          className="d-flex flex-row-reverse align-items-center text-dark pe-3 text-black-50 fs-6"
        >
          <IoIosArrowRoundForward />
          <span>الرجوع الي الحساب</span>
        </Link>
      </div>
      <div className="form">
        <Form onSubmit={formSubmet}>
          <Form.Group className="mb-3" controlId="formBasicFirst">
            <Form.Label>الاسم الاول</Form.Label>
            <Form.Control
              type="text"
              name="FirstName"
              value={userData && userData.FirstName}
              placeholder={userInformation && userInformation.FirstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLast">
            <Form.Label>الاسم الاخير</Form.Label>
            <Form.Control
              type="text"
              name="LastName"
              placeholder={userInformation && userInformation.LastName}
              value={userData && userData.LastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>رقم الجوال</Form.Label>
            <Form.Control
              type="text"
              name="PhoneNumber"
              placeholder={userInformation && userInformation.PhoneNumber}
              value={userData && userData.PhoneNumber}
              onChange={handleChange}
              maxLength="10"
              minLength="10"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>الايميل</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={userData && userData.Email}
              placeholder={userInformation && userInformation.Email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>الباسورد</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={userData && userData.Password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            تعديل
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditInfo;
