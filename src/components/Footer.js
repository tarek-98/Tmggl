import React, { Fragment, useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { FaHome, FaWindowRestore } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlineMoveToInbox } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "../store/cartSlice";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

function Footer() {
  const carts = useSelector(getAllCarts);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const [buy, setBuy] = useState(false);
  const [sell, setSell] = useState(false);
  const [terms, setTerms] = useState(false);
  const [info, setInfo] = useState(false);

  const [toggle, setToggle] = useState(0);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="footer">
      <div>
        <footer className="footer-container">
          <div
            className={toggle === 0 ? "tab-container active" : "tab-container"}
          >
            <Link to="/" className="tab-link" onClick={() => setToggle(0)}>
              <FaHome className="tab-icon" />
              <div className="tab-text">الرئيسية</div>
            </Link>
          </div>
          <div
            className={
              toggle === 1 ? "tab-container active pop" : "tab-container pop"
            }
          >
            <Link
              to={isAuthenticated ? "/inbox" : "/login"}
              className="tab-link"
              onClick={() => setToggle(1)}
            >
              <MdOutlineMoveToInbox className="tab-icon" />
              <span
                className={carts.length <= 0 ? "cart-num-hide" : "cart-num"}
              >
                {carts.length}
              </span>
              <div className={toggle === 1 ? "tab-text active" : "tab-text"}>
                {" "}
                الوارد
              </div>
            </Link>
          </div>
          <div
            className={
              toggle === 2 ? "tab-container active pop" : "tab-container pop"
            }
          >
            <Link
              to={isAuthenticated ? "/cart" : "/login"}
              className="tab-link"
              onClick={() => setToggle(2)}
            >
              <FaCartArrowDown className="tab-icon" />
              <span
                className={carts.length <= 0 ? "cart-num-hide" : "cart-num"}
              >
                {carts.length}
              </span>
              <div className={toggle === 2 ? "tab-text active" : "tab-text"}>
                السلة
              </div>
            </Link>
          </div>
          <div
            className={toggle === 3 ? "tab-container active" : "tab-container"}
          >
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="tab-link"
              onClick={() => setToggle(3)}
            >
              <FaRegUserCircle className="tab-icon" />
              {isAuthenticated ? (
                <div className={toggle === 3 ? "tab-text active" : "tab-text"}>
                  حسابي
                </div>
              ) : (
                <div className={toggle === 3 ? "tab-text active" : "tab-text"}>
                  تسجيل الدخول
                </div>
              )}
            </Link>
          </div>
        </footer>
      </div>
      <hr />
      <div className="footer-links pb-3 ps-1">
        <div className="terms">
          <div
            className="d-flex justify-content-between align-items-center w-100 cur"
            onClick={() => {
              setBuy((buy) => !buy);
              setInfo(false);
              setSell(false);
              setTerms(false);
            }}
          >
            {buy ? <FiMinus /> : <GoPlus />}
            <span className="fw-bold">الشراء من المتجر</span>
          </div>
          {buy && (
            <div className={buy ? "show-menu" : "hide-menu"}>
              <Link className="footer-links-item">
                <span>إرجاع الطلب</span>
              </Link>
              <Link className="footer-links-item">
                <span>الأسئلة الشائعة</span>
              </Link>
              <Link className="footer-links-item">
                <span>تراخيص المنصة</span>
              </Link>
              <Link className="footer-links-item">
                <span>الخصوصية</span>
              </Link>
              <Link className="footer-links-item">
                <span>عن تمقل</span>
              </Link>
            </div>
          )}
        </div>
        <div className="terms">
          <div
            className="d-flex justify-content-between align-items-center w-100 cur"
            onClick={() => {
              setSell((sell) => !sell);
              setInfo(false);
              setBuy(false);
              setTerms(false);
            }}
          >
            {sell ? <FiMinus /> : <GoPlus />}
            <span className="fw-bold">البيع علي المتجر</span>
          </div>
          {sell && (
            <div className={sell ? "show-menu" : "hide-menu"}>
              <Link className="footer-links-item">
                <span>التسجيل كتاجر</span>
              </Link>
              <Link className="footer-links-item">
                <span>سياسة البيع </span>
              </Link>
            </div>
          )}
        </div>
        <div className="terms">
          <div
            className="d-flex justify-content-between align-items-center w-100 cur"
            onClick={() => {
              setTerms((terms) => !terms);
              setInfo(false);
              setBuy(false);
              setSell(false);
            }}
          >
            {terms ? <FiMinus /> : <GoPlus />}
            <span className="fw-bold">الخصوصية</span>
          </div>
          {terms && (
            <div className={terms ? "show-menu" : "hide-menu"}>
              <Link className="footer-links-item">
                <span>سياسة الشحن و الاسترجاع</span>
              </Link>
              <Link className="footer-links-item">
                <span>الشروط و الاحكام</span>
              </Link>
              <Link className="footer-links-item">
                <span>عن تمقل</span>
              </Link>
            </div>
          )}
        </div>
        <div className="terms">
          <div
            className="d-flex justify-content-between align-items-center w-100 cur"
            onClick={() => {
              setInfo((info) => !info);
              setTerms(false);
              setBuy(false);
              setSell(false);
            }}
          >
            {info ? <FiMinus /> : <GoPlus />}
            <span className="fw-bold">معلومات التواصل</span>
          </div>
          {info && (
            <div className={info ? "show-menu" : "hide-menu"}>
              <Link className="footer-links-item">
                <span>المملكة العربية السعودية - الرياض</span>
              </Link>
              <Link className="footer-links-item">
                <span> 920013501</span>
              </Link>
              <Link className="footer-links-item">
                <span>Tmggl@gmail.com</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
