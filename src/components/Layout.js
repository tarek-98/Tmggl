import React, { Fragment } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import NavBar from "./Navbar";

function Layout() {
  return (
    <Fragment>
      <NavBar />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default Layout;
