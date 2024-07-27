import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessagesAsync,
  selectMessages,
  addMessage,
} from "../../store/chatSlice";
import "./inbox.css";
import io from "socket.io-client";
import MessageItem from "./MessageItem";

const socket = io("https://tager.onrender.com");

const MessageList = ({ senderId, receiverId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const messageListRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    dispatch(fetchMessagesAsync({ senderId, receiverId }));

    socket.emit("join", receiverId);

    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch, senderId, receiverId]);

  const handleScroll = () => {
    if (messageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    }
  };

  useEffect(() => {
    if (isAtBottom && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    // setInterval(() => {
    //   dispatch(fetchMessagesAsync({ senderId, receiverId }));
    // }, 1000);
  }, []);

  return (
    <div className="message-list" ref={messageListRef} onScroll={handleScroll}>
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} senderId={senderId} />
      ))}
    </div>
  );
};

export default MessageList;
