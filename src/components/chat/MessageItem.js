import React from "react";
import { encryptPhoneNumberInText } from "./encryptPhoneNumberInText";
import { format } from "date-fns";

const MessageItem = ({ message, senderId, date }) => {
  const encryptedMessage = encryptPhoneNumberInText(message.message);
  const messageDate = format(new Date(message.createdAt), "eeee, MMMM d, yyyy");
  const messageTime = format(new Date(message.createdAt), "hh:mm a");

  return (
    <div
      className={`message-item ${
        message.senderId === senderId ? "sent" : "received"
      }`}
    >
      <p className="mb-0">{encryptedMessage}</p>
      <span className="message-time">{messageTime}</span>
    </div>
  );
};

export default MessageItem;
