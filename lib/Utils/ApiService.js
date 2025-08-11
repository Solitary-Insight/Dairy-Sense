// utils/axiosInstance.js
import axios from "axios";
import {DAIRY_SENSE_SERVER_BASE_ADDRESS} from './CREDENTIALS'

const api = axios.create({
  baseURL:DAIRY_SENSE_SERVER_BASE_ADDRESS,
    headers: {
    "Content-Type": "application/json",
    

  },
  withCredentials: true, // optional, for cookies or sessions
});


// Add interceptors if needed
api.interceptors.response.use(
  response => response,
  error => {
    // Global error handler
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
