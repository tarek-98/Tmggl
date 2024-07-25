import React from "react";
import { encryptPhoneNumberInText } from "./encryptPhoneNumberInText";

const MessageItem = ({ message, senderId }) => {
  const encryptedMessage = encryptPhoneNumberInText(message.message);

  return (
    <div
      className={`message-item ${
        message.senderId === senderId ? "sent" : "received"
      }`}
    >
      <p className="mb-1">{encryptedMessage}</p>
    </div>
  );
};

export default MessageItem;
