// axiosConfig.js
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

export default axiosInstance;
