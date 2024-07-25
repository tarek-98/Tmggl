import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./inbox.css";

function Inbox() {
  useEffect(() => {
    document.title = "تمقل - صندوق الوارد";
  }, []);
  return (
    <div className="main-inbox">
      <div className="container">
        <div className="notification">
          <Link to="/inbox/notifications">الاشعارات</Link>
          <span className="float"></span>
        </div>
        <div className="chat">
          <Link to="/inbox/chat">الرسائل</Link>
          <span className="float"></span>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
