import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, selectConversations } from "../../store/chatSlice";
import "./inbox.css";
import ConversationItem from "./ConversationItem";

const ConversationsPage = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const userData = userInfo[`Client data`][0];
  const userId = userData ? userData._id : null;

  useEffect(() => {
    dispatch(fetchConversations(userId));
    console.log(conversations);
  }, []);

  return (
    <div className="conversations-page">
      <h2 className="mb-5">المحادثات</h2>
      <ul className="conversation-list">
        {conversations.map((conversation, index) => (
          <ConversationItem
            index={index}
            conversation={conversation}
            vendorId={conversation && conversation.participants[1]}
            userId={userId}
          />
        ))}
      </ul>
    </div>
  );
};

export default ConversationsPage;
