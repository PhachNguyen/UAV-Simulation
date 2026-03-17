import "./assets/main.css";
import router from "./router";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
const options = {
  // Cấu hình mặc định nếu muốn
  position: "top-right",
  timeout: 3000,
};
app.use(router);
app.use(Toast, options);
app.mount("#app");
