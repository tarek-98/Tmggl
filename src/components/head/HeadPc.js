import React from "react";
import "./headPc.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpeg";
import logo2 from "../../assets/images/vat/Apple.png";
import logo3 from "../../assets/images/vat/Mada.png";
import logo4 from "../../assets/images/vat/MasterCard.png";
import logo5 from "../../assets/images/vat/VAT.png";
import logo6 from "../../assets/images/vat/sbs.png";
import logo7 from "../../assets/images/vat/visa.png";

function HeadPc() {
  return (
    <div className="head-pc">
      <div className="head-content">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="option">
          <img src={logo3} alt="" />
          <img src={logo4} alt="" />
          <img src={logo7} alt="" />
          <img src={logo2} alt="" />
          <img src={logo5} alt="" />
          <img src={logo6} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HeadPc;
