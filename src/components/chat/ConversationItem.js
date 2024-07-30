import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import VendorChatInfo from "./VendorChatInfo";

function ConversationItem({ conversation, index, userId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vendorId = conversation && conversation.participants[1];
  const handleConversationClick = (conversationId) => {
    navigate(
      `/inbox/conversations/chat/?senderId=${userId}&receiverId=${vendorId}`
    );
  };

  return (
    <Fragment>
      <li
        className="list-group-item conversation-item mb-3"
        onClick={() => handleConversationClick(conversation._id)}
      >
        <VendorChatInfo vendorId={vendorId} conversation={conversation} />
      </li>
    </Fragment>
  );
}

export default ConversationItem;
