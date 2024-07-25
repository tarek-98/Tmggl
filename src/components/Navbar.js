import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";

function Navbar() {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  return (
    <div className="page-header">
      <div className="nav-container w-100 ms-2 me-2">
        <div className="nav-content">
          <Link
            to="/search"
            className="nav-item d-flex align-items-center justify-content-center"
          >
            <CiSearch className="me-1" />
            <span>البحث</span>
          </Link>
          <Link className="nav-item" to="/trend">
            <span>الترند #</span>
          </Link>
          <Link to="/newest" className="nav-item">
            <span>المضاف حديثا</span>
          </Link>
          <Link
            to={isAuthenticated ? "/following" : "/login"}
            className="nav-item"
          >
            <span>اتابعهم</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
