import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { fetchMessagesAsync } from "../../store/chatSlice";
import "./inbox.css";
import Swal from "sweetalert2";

const socket = io("https://tager.onrender.com"); // Replace with your Socket.io server URL

const Chat = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const userData = userInfo[`Client data`][0];
  const senderId = userData ? userData._id : null;

  const receiverId = localStorage.getItem("receiverId");
  // const receiverId = `667c680074002d1fded8bc9f`;

  useEffect(() => {
    Swal.fire({
      title: "!!! تنبيه",
      text: "نحن غير مسؤولين عن اي معاملة بيع تتم خارج المنصة ( التطبيق ) - تم اتاحة هذه الخدمة للاجابة علي استفسارتكم من البائع مباشرة",
      icon: "info",
      confirmButtonText: "قرأت و فهمت",
    });
  });

  useEffect(() => {
    document.title = "تمقل - الرسائل";
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socket.emit("join", senderId);

    socket.on("newMessage", () => {
      dispatch(fetchMessagesAsync({ senderId, receiverId }));
    });

    return () => {
      socket.off("connect");
      socket.off("newMessage");
    };
  }, [dispatch, senderId, receiverId]);

  return (
    <div className="main-chat">
      <div className="chat-container">
        <MessageList senderId={senderId} receiverId={receiverId} />
        <MessageInput senderId={senderId} receiverId={receiverId} />
      </div>
    </div>
  );
};

export default Chat;
