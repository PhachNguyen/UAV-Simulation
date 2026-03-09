import { createRouter, createWebHistory } from "vue-router";

// Import các Page (Component) của bạn
import Dashboard from "../pages/users/Home.vue";
import NoFlyZones from "@/pages/users/NoFlyZones.vue";

const routes = [
  //   {
  //     path: "/",
  //     redirect: "/dashboard",
  //   },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/no-fly-zones",
    name: "NFZ",
    component: NoFlyZones,
  },
  // Thêm các route khác cho monitor, fleet...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
