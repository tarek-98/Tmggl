import React, { useEffect, useState } from "react";
import "./userProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpeg";
import {
  DefaultAddress,
  fetchAddress,
  getAllAddress,
} from "../../store/AddressSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserAddress() {
  const address = useSelector(getAllAddress);
  const [defaultAddressId, setDefaultAddressId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    getAddress();
  }, []);

  function getAddress() {
    dispatch(fetchAddress());
  }

  const handleDefaultAddress = (addr) => {
    dispatch(
      DefaultAddress({
        city: addr.city,
        street: addr.street,
        streetNumber: addr.streetNumber,
      })
    );
  };

  useEffect(() => {
    if (address.length > 0) {
      setDefaultAddressId(localStorage.getItem("id"));
    }
  }, [address]);

  const handleSetDefault = (id) => {
    setDefaultAddressId(id);
    localStorage.setItem("id", id);
  };

  function delAddres(id) {
    axios
      .delete(`http://localhost:9000/address/${id}`)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        getAddress();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  function sweetAlertDel(id) {
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "هل تريد حذف العنوان",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم حذف",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "حذفت",
          text: "تم حذف العنوان",
          icon: "success",
        });
        delAddres(id);
      }
    });
  }

  function changeDfAdd() {
    toast.success("تم تغيير العنوان الافتراضي بنجاح", {
      position: "top-left",
    });
  }

  return (
    <div className="user-profile">
      <div className="user-address">
        <div className="logo mb-3">
          <img src={logo} alt="" className="logo w-100" />
        </div>
        <div className="old-address">
          <div className="main-title">
            <h1>العناوين</h1>
            <p className=" text-dark-50">
              أدر عناوينك المحفوظة لتتمكن من إنهاء عمليات الشراء بسرعة وسهولة
              عبر متجرنا
            </p>
            <Link to="/profile/address/add" className="add">
              إضافة عنوان جديد
            </Link>
          </div>
          {address.map((addr) => {
            return (
              <div
                id={`address-info${addr.id}`}
                className="address-info mb-2"
                key={addr.id}
              >
                <p>
                  {addr.id === defaultAddressId && (
                    <span className="default-label mb-5">
                      العنوان الافتراضي
                    </span>
                  )}
                </p>
                <div className="address-address">
                  <span>العنوان </span>
                  <span>
                    {addr.city}-{addr.street}-{addr.streetNumber}
                  </span>
                </div>
                <div className="contact-info flex-column">
                  <h3 className="mb-3">معلومات التواصل</h3>
                  <div className="name">
                    <span>الاسم</span>
                    <span>
                      {addr.firstname} {addr.lastname}
                    </span>
                  </div>
                  <div className="phone">
                    <span> الجوال</span>
                    <span> {addr.phone}</span>
                  </div>
                </div>
                <div className="address-control d-flex gap-5 justify-content-center">
                  <Link to={`/profile/address/editAddress/${addr.id}`}>
                    تعديل
                  </Link>
                  <span
                    onClick={() => {
                      if (addr.id === defaultAddressId) {
                        Swal.fire({
                          text: "لا يمكن حذف عنوان افتراضي",
                          icon: "info",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "فهمت",
                        });
                      } else {
                        sweetAlertDel(addr.id);
                      }
                    }}
                  >
                    حذف
                  </span>
                  <div className=" d-inline">
                    <span className="ms-2">العنوان الافتراضي</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name={`default${addr.id}`}
                        checked={addr.id === defaultAddressId}
                        onChange={() => {
                          handleSetDefault(addr.id);
                          handleDefaultAddress(addr);
                          changeDfAdd();
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UserAddress;
