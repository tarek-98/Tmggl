import { io } from "socket.io-client";

const SOCKET_URL = "https://tager.onrender.com"; // Replace with your Socket.io server URL

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Connect manually
});

socket.on("connect", () => {
  console.log("Connected to Socket.io server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.io server");
});
