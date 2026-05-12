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
import MainLayoutAdmin from "@/layout/MainLayoutAdmin.vue";
import UserManage from "@/pages/admin/UserManage.vue";
const routes = [
  // history: createWebHistory(),
  //   {
  //     path: "/",
  //     redirect: "/dashboard",
  //   },
  // User routes
  // {
  //   path: "/profile",
  //   component: MainLayoutUser,
  //   children: [
  //     {
  //       path: "dashboard",
  //       component: () => import("../pages/users/DashboardView.vue"),
  //     },
  //     {
  //       path: "fleet",
  //       component: () => import("../pages/users/DroneFleetView.vue"),
  //     },
  //     {
  //       path: "courses",
  //       component: () => import("../pages/users/MyCourses.vue"),
  //     },
  //   ],
  //   meta: { hideHeaderFooter: true },
  // },
  {
    path: "/test",
    component: () => import("../pages/Course.vue"),
  },
  {
    path: "/test1",
    component: () => import("../pages/Test.vue"),
    meta: { hideHeaderFooter: true },
  },
  {
    // Thêm :id để truyền mã định danh của drone vào trang chi tiết
    path: "/test2/:id",
    name: "ProductDetail",
    component: () => import("../pages/ProductPagever2.vue"),
    meta: { hideHeaderFooter: true },
  },
  // {
  //   path: "/test1",
  //   component: () => import("../pages/Test.html"),
  // },
  // Admin routes
  {
    path: "/admin",
    component: MainLayoutAdmin,
    children: [
      {
        path: "dashboard",
        component: () => import("../pages/admin/DashboardAdmin.vue"),
      },
      {
        path: "drones",
        component: () => import("../pages/admin/DroneManagement.vue"),
      },
      {
        path: "drones/add",
        component: () => import("../pages/admin/AddDroneView.vue"),
      },
      {
        path: "chapter/:id",
        name: "LessonEditor",
        component: () => import("../pages/admin/LessonEditor.vue"),
        props: true, // Cho phép nhận id như một props
      },
      {
        path: "lesson/:id/sections",
        name: "SectionEditor",
        component: () => import("../pages/admin/SectionEditor.vue"),
        props: true, // Cho phép nhận id như một props
      },
      // Ví dụ trong router/index.js
      {
        path: "drones/edit/:id",
        name: "EditDrone",
        component: () => import("../pages/admin/AddDroneView.vue"), // Dùng chung file với trang Add
      },

      {
        path: "course",
        component: () => import("../pages/admin/AdminCourseManager.vue"),
      },
      {
        path: "course/add",
        component: () => import("../pages/admin/AdminAddLesson.vue"),
      },
       {
        path: "users",
        component:UserManage,
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
    path: "/simulation",
    name: "Simulation",
    component: () => import("../components/UnityPlayer.vue"),
    meta: { hideHeaderFooter: true },
  },
  {
    path: "/",
    name: "Home",
    component: Dashboard,
    // meta: { hideHeaderFooter: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { hideHeaderFooter: true }, // Ẩn header/footer
  },
  // {
  //   path: "/simulation/:id",
  //   name: "Simulation",
  //   component: Uav3DViewer,
  // },
  {
    path: "/products",
    name: "ProductPage",
    component: ProductPage,
  },
  {
    path: "/course",
    name: "Course",
    component: () => import("@/pages/DetailCourse.vue"),
  },
  {
    path: "/drone/:id",
    name: "Blog",
    component: () => import("@/pages/Blog.vue"),
  },
  // {
  //   path: "/drone/:id",
  //   name: "droneDetail",
  //   component: ProductDetail,
  // },
  // {
  //   path: "/no-fly-zones",
  //   name: "NFZ",
  //   component: NoFlyZones,
  // },
  // {
  //   path: "/fleet/drones",
  //   name: "ListDrones",
  //   component: () => import("@/pages/users/DroneList.vue"),
  // },
  // {
  //   path: "/fleet/battery",
  //   name: "Battery",
  //   component: () => import("@/pages/users/Battery.vue"),
  // },
  {
    path: "/fleet/stations",
    name: "Stations",
    component: () => import("@/pages/users/Stations.vue"),
  },
  {
    path: "/operation/planner",
    name: "Planner",
    component: () => import("@/pages/users/Planner.vue"),
  },
  {
    path: "/missions/data",
    name: "Data",
    component: () => import("@/pages/users/Data.vue"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("@/pages/users/History.vue"),
    meta: { hideHeaderFooter: true }, // Ẩn header/footer
  },
  {
    path: "/monitor/live-map",
    name: "LiveMap",
    component: () => import("@/pages/users/LiveMap.vue"),
  },
  {
    path: "/services",
    name: "Services",
    component: () => import("@/pages/Service.vue"),
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
  // Thêm đoạn code scrollBehavior vào đây
  scrollBehavior(to, from, savedPosition) {
    // Nếu người dùng nhấn nút "Back" (Quay lại), trình duyệt sẽ quay về vị trí cũ
    if (savedPosition) {
      return savedPosition;
    } else {
      // Khi chuyển sang trang chi tiết (ví dụ: /drone/:id), luôn cuộn lên đầu trang
      return { top: 0, left: 0 };
    }
  },
});

export default router;
