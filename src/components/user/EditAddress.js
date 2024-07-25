import React, { useEffect, useState } from "react";
import "./userProfile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSingleAddress, getSingleAddress } from "../../store/AddressSlice";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

function EditAddress() {
  const [city, setCity] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [street, setStreet] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const address = useSelector(getSingleAddress);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleAddress(id));
  }, []);

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
    }
    return true;
  };

  const formSubmet = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios({
        method: "PUT",
        url: `http://localhost:9000/address/${id}`,
        data: {
          firstname: firstName,
          lastname: lastName,
          email: address.email,
          phone: phone,
          city: city,
          street: street,
          streetNumber: streetNumber,
        },
      }).then((data) => {
        toast.success("تمت تعديل العنوان", {
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
      <div className="form form-edit">
        <div className="back-pc">
          <Link
            to="/profile"
            className="d-flex flex-row-reverse align-items-center text-dark pe-3 text-black-50 fs-6"
          >
            <span>الرجوع الي الحساب</span>
            <IoIosArrowRoundForward />
          </Link>
        </div>
        <Form onSubmit={formSubmet}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="hidden" value={address.email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>المدينة</Form.Label>
            <Form.Control
              type="text"
              placeholder={address.city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>الشارع</Form.Label>
            <Form.Control
              type="text"
              placeholder={address.street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>رقم الشارع</Form.Label>
            <Form.Control
              type="text"
              placeholder={address.streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
            />
          </Form.Group>
          <div className="contact">
            <h2>معلومات التواصل</h2>
            <Form.Group className="mb-3" controlId="formBasicFirst">
              <Form.Label>الاسم الاول</Form.Label>
              <Form.Control
                type="text"
                placeholder={address.firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLast">
              <Form.Label>الاسم الاخير</Form.Label>
              <Form.Control
                type="text"
                placeholder={address.lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>رقم الجوال</Form.Label>
              <Form.Control
                type="text"
                placeholder={address.phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength="10"
                minLength="10"
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            تعديل
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditAddress;
