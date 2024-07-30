import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import io from "socket.io-client";

const API_URL = "https://tager-dpsl.onrender.com";

const socket = io("https://tager-dpsl.onrender.com");

const sendMessage = async ({ senderId, receiverId, message }) => {
  const response = await axios.post(
    `${API_URL}/message/send/${receiverId}`,
    { message },
    {
      params: { senderId },
    }
  );
  socket.emit("newMessage", { senderId, receiverId, message });
  return response.data;
};
const fetchMessages = async (senderId, receiverId) => {
  const response = await axios.get(`${API_URL}/message/${receiverId}`, {
    params: { senderId },
  });
  return response.data;
};

export const sendMessageAsync = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, receiverId, message }) => {
    const response = await sendMessage({ senderId, receiverId, message });
    return response;
  }
);

export const fetchMessagesAsync = createAsyncThunk(
  "chat/fetchMessages",
  async ({ senderId, receiverId }) => {
    const response = await fetchMessages(senderId, receiverId);
    return response;
  }
);

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/message/getConversations/${id}`
    );
    return response.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    list: [],
    messageCounts: {}, // { conversationId: messageCount }
    newMessages: {}, // { conversationId: hasNewMessages }
    status: "idle",
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearConversations: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
        state.messages = action.payload;
      })

      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchConversations.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectMessages = (state) => state.chat.messages;
export const selectConversations = (state) => state.chat.list;
export const { addMessage, clearMessages, clearConversations } =
  chatSlice.actions;
export default chatSlice.reducer;
