import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessageAsync } from "../../store/chatSlice";
import EmojiPicker from "./EmojiPicker";
import "./inbox.css";

const MessageInput = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessageAsync({ senderId, receiverId, message }));
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim() !== "") {
      dispatch(sendMessageAsync({ senderId, receiverId, message }));
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        className="form-control"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="اكتب رسالتك"
      />
      <button className="btn btn-primary" onClick={handleSendMessage}>
        ارسال
      </button>
    </div>
  );
};

export default MessageInput;
