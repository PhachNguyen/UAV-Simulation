import { defineStore } from "pinia";
import api from "../utils/apis/axios"; // Đảm bảo đường dẫn đúng với file axios.js

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("userData")) || null,
    token: localStorage.getItem("userToken") || null,
  }),
  actions: {
    // Trong stores/auth.js
    async register(userData) {
      try {
        const { data } = await api.post("/auth/register", userData);
        this.user = data;
        this.token = data.token;
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data));
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Lỗi đăng ký",
        };
      }
    },
    async login(email, password) {
      try {
        const { data } = await api.post("/auth/login", { email, password });

        // Lưu vào State của Pinia
        this.user = data;
        this.token = data.token;

        // Lưu vào trình duyệt để F5 không bị mất đăng nhập
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data));

        return { success: true };
      } catch (error) {
        return { success: false, message: error.response.data.message };
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    },
  },
});
