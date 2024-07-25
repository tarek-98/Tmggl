// axiosInstance.js
import axios from "axios";
import store from "../store/store"; // Adjust the path to your store

const axiosInstance = axios.create({
  baseURL: "https://tager.onrender.com",
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token; // Adjust to match your state structure
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
