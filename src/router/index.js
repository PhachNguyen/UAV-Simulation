import { createRouter, createWebHistory } from "vue-router";

// Import các Page (Component) của bạn
import Dashboard from "../pages/users/Home.vue";
import NoFlyZones from "@/pages/users/NoFlyZones.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import ProductPage from "@/pages/users/ProductPage.vue";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import MainLayoutUser from "@/layout/MainLayoutUser.vue";
const routes = [
  // history: createWebHistory(),
  //   {
  //     path: "/",
  //     redirect: "/dashboard",
  //   },

  {
    path: "/profile",
    component: MainLayoutUser,
    children: [
      {
        path: "dashboard",
        component: () => import("../pages/users/DashboardView.vue"),
      },
    ],
    meta: { hideHeaderFooter: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideHeaderFooter: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { hideHeaderFooter: true }, // Ẩn header/footer
  },
  {
    path: "/simulation/:id",
    name: "Simulation",
    component: Uav3DViewer,
  },
  {
    path: "/fleet/list",
    name: "ProductPage",
    component: ProductPage,
  },
  {
    path: "/drone/:id",
    name: "droneDetail",
    component: ProductDetail,
  },
  {
    path: "/no-fly-zones",
    name: "NFZ",
    component: NoFlyZones,
  },
  {
    path: "/fleet/drones",
    name: "ListDrones",
    component: () => import("@/pages/users/DroneList.vue"),
  },
  {
    path: "/fleet/battery",
    name: "Battery",
    component: () => import("@/pages/users/Battery.vue"),
  },
  {
    path: "/fleet/stations",
    name: "Stations",
    component: () => import("@/pages/users/Stations.vue"),
  },
  {
    path: "/missions/planner",
    name: "Planner",
    component: () => import("@/pages/users/Planner.vue"),
  },
  {
    path: "/missions/data",
    name: "Data",
    component: () => import("@/pages/users/Data.vue"),
  },
  {
    path: "/missions/history",
    name: "History",
    component: () => import("@/pages/users/History.vue"),
  },
  {
    path: "/monitor/live-map",
    name: "LiveMap",
    component: () => import("@/pages/users/LiveMap.vue"),
  },
  {
    path: "/monitor/live-stream",
    name: "LiveStream",
    component: () => import("@/pages/users/LiveStream.vue"),
  },
  {
    path: "/monitor/telemetry",
    name: "Telemetry",
    component: () => import("@/pages/users/Telemetry.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/pages/users/Settings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
