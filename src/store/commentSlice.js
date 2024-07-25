// src/features/comments/commentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await axios.get(`http://localhost:9000/comments`);
    return response.data;
  }
);
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ productId, client, comment }) => {
    const response = await axios.patch(
      `${API_URL}/products/comment/${productId}`,
      { client, comment }
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ productId, commentId }) => {
    await axios.delete(
      `${API_URL}/products/deletecomment/${productId}/${commentId}`
    );
    return commentId;
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ productId, commentId, newCommentText }) => {
    const response = await axios.patch(
      `${API_URL}/products/editcomment/${productId}/${commentId}`,
      {
        newCommentText,
      }
    );
    return response.data;
  }
);

export const addReply = createAsyncThunk(
  "comments/addReply",
  async ({ productId, commentId, user, reply }) => {
    const response = await axios.patch(`${API_URL}/products/reply`, {
      productId,
      commentId,
      user,
      reply,
    });
    return response.data;
  }
);
export const delReply = createAsyncThunk(
  "comments/delReply",
  async ({ productId, commentId, replyId }) => {
    const response = await axios.delete(
      `${API_URL}/products/deletereply/${productId}/${commentId}/${replyId}`
    );
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "comment Added";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(delReply.fulfilled, (state, action) => {
        state.status = "replay deleted";
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const { id, content } = action.payload;
        const existingComment = state.comments.find(
          (comment) => comment.id === id
        );
        if (existingComment) {
          existingComment.content = content;
        }
      })
      .addCase(addReply.fulfilled, (state, action) => {
        const { commentId, reply } = action.payload;
        const existingComment = state.comments.find(
          (comment) => comment.id === commentId
        );
        if (existingComment) {
          existingComment.replies.push(reply);
        }
      });
  },
});

export default commentsSlice.reducer;
