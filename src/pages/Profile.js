import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../components/login.css";
import UserProfile from "../components/user/UserProfile";

function Profile({ socket }) {
  const { showComp, success } = useSelector((state) => state.otp);

  return (
    <div className="log-home">
      <UserProfile socket={socket} />
    </div>
  );
}

export default Profile;
