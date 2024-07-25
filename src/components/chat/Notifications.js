// src/components/Notifications.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  addNotification,
} from "../../store/notificationsSlice";
import { Toast, ToastContainer } from "react-bootstrap";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);
  const notificationStatus = useSelector((state) => state.notifications.status);
  const error = useSelector((state) => state.notifications.error);

  useEffect(() => {
    if (notificationStatus === "idle") {
      dispatch(fetchNotifications());
    }

    // Simulate receiving real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: "New notification!",
      };
      dispatch(addNotification(newNotification));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, notificationStatus]);

  useEffect(() => {
    document.title = "تمقل - اشعاراتي";
  }, []);

  return (
    <div className="main-inbox">
      <ToastContainer position="top-end" className="p-3">
        {notifications.map((notification) => (
          <Toast key={notification.id} bg="info">
            <Toast.Body>{notification.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};

export default Notifications;
