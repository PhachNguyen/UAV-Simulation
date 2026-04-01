import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // URL của Backend Node.js
});

// Middleware cho Frontend: Tự động lấy Token từ LocalStorage và gắn vào Header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
