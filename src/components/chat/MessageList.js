import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessagesAsync,
  selectMessages,
  addMessage,
} from "../../store/chatSlice";
import "./inbox.css";
import MessageItem from "./MessageItem";
import { socket } from "../../services/socket";
import { format } from "date-fns";

const MessageList = ({ senderId, receiverId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const messageListRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    dispatch(fetchMessagesAsync({ senderId, receiverId }));

    socket.connect();
    socket.emit("join", receiverId);

    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("newMessage");
      socket.disconnect();
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
    setInterval(() => {
      dispatch(fetchMessagesAsync({ senderId, receiverId }));
    }, 1000);
  }, []);

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = format(new Date(message.createdAt), "yyyy-MM-dd");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="message-list" ref={messageListRef} onScroll={handleScroll}>
      {messages &&
        Object.keys(groupedMessages).map((date) => (
          <React.Fragment key={date}>
            <div className="message-date text-center">
              {format(new Date(date), "eeee, MMMM d, yyyy")}
            </div>
            {groupedMessages[date].map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                senderId={senderId}
              />
            ))}
          </React.Fragment>
        ))}
    </div>
  );
};

export default MessageList;
