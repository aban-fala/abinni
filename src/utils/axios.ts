// axiosConfig.js
import axios from "axios";
console.log("REACT_APP_API_ENDPOINT", process.env.REACT_APP_API_ENDPOINT);
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

export default axiosInstance;
