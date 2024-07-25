import React, { useState } from "react";
import "./userProfile.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpeg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { IoIosArrowRoundForward } from "react-icons/io";
import Map from "../map/Map";

function AddAddress() {
  const [city, setCity] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [street, setStreet] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (city === "") {
      toast.error("city is required.", {
        position: "top-left",
      });
      return false;
    } else if (street === "") {
      toast.error("address is required.", {
        position: "top-left",
      });
      return false;
    } else if (firstName === "") {
      toast.error("firstName is required.", {
        position: "top-left",
      });
      return false;
    } else if (lastName === "") {
      toast.error("lastName is required.", {
        position: "top-left",
      });
      return false;
    } else if (phone === "") {
      toast.error("phone is required.", {
        position: "top-left",
      });
      return false;
    } else if (email === "") {
      toast.error("email is required.", {
        position: "top-left",
      });
      return false;
    }
    return true;
  };

  const formSubmet = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios({
        method: "post",
        url: `http://localhost:9000/address`,
        data: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          city: city,
          street: street,
          streetNumber: streetNumber,
        },
      }).then((data) => {
        toast.success("تمت اضافة العنوان", {
          position: "top-left",
        });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      });
    }
  };

  return (
    <div className="user-profile">
      <div className="logo mb-3">
        <img src={logo} alt="" className="logo w-100" />
      </div>
      <div className="back">
        <Link
          to="/profile/address"
          className="d-flex flex-row-reverse align-items-center text-dark pe-3 text-black-50 fs-6"
        >
          <IoIosArrowRoundForward />
          <span>الرجوع الي العناوين</span>
        </Link>
      </div>
      <Map />
      <div className="add-address">
        <div className="back-pc">
          <Link
            to="/profile"
            className="d-flex flex-row-reverse align-items-center text-dark pe-3 text-black-50 fs-6"
          >
            <span>الرجوع الي الحساب</span>
            <IoIosArrowRoundForward />
          </Link>
        </div>
        <div className="form">
          <Form onSubmit={formSubmet}>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>المدينة</Form.Label>
              <Form.Control
                type="text"
                placeholder="اكتب المدينة"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>الشارع</Form.Label>
              <Form.Control
                type="text"
                placeholder="اكتب اسم الشارع"
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>رقم الشارع</Form.Label>
              <Form.Control
                type="text"
                placeholder="اكتب رقم الشارع"
                onChange={(e) => setStreetNumber(e.target.value)}
              />
            </Form.Group>
            <div className="contact">
              <h2>معلومات التواصل</h2>
              <Form.Group className="mb-3" controlId="formBasicFirst">
                <Form.Label>الاسم الاول</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="الاسم الاول"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLast">
                <Form.Label>الاسم الاخير</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="الاسم الاخير"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>رقم الجوال</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="الجوال"
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength="10"
                  minLength="10"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>الايميل</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ادخل الايميل"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className=" d-flex justify-content-center">
              <Button variant="primary" type="submit">
                اضافة
              </Button>
            </div>
          </Form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
