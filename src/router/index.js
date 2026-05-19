import { createRouter, createWebHistory } from "vue-router";

// Import các Page (Component)
import Dashboard from "../pages/users/Home.vue";
import ProductPage from "@/pages/users/ProductPage.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import MainLayoutAdmin from "@/layout/MainLayoutAdmin.vue";
import UserManage from "@/pages/admin/UserManage.vue";

// ==========================================
// HÀM KIỂM TRA QUYỀN ADMIN
// ==========================================
const checkIfUserIsAdmin = () => {
  try {
    // Thay "user_info" bằng tên key bạn dùng để lưu thông tin user lúc login
    const userStr = localStorage.getItem("userData"); 
    if (!userStr) return false;

    const user = JSON.parse(userStr);
    
    // Thay "admin" bằng role tương ứng của bạn (ví dụ: role === 1, role === 'ADMIN'...)
    return user.role === "admin"; 
  } catch (error) {
    console.error("Lỗi parse dữ liệu user:", error);
    return false;
  }
};

const routes = [
  // ==========================================
  // ROUTE ADMIN (ĐÃ ĐƯỢC BẢO VỆ)
  // ==========================================
  {
    path: "/admin",
    component: MainLayoutAdmin,
    // Đánh dấu route này và tất cả route con yêu cầu quyền Admin
    meta: { hideHeaderFooter: true, requiresAdmin: true }, 
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
        path: "drones/edit/:id",
        name: "EditDrone",
        component: () => import("../pages/admin/AddDroneView.vue"),
      },
      {
        path: "chapter/:id",
        name: "LessonEditor",
        component: () => import("../pages/admin/LessonEditor.vue"),
        props: true, 
      },
      {
        path: "lesson/:id/sections",
        name: "SectionEditor",
        component: () => import("../pages/admin/SectionEditor.vue"),
        props: true, 
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
        component: UserManage,
      },
    ],
  },

  // ==========================================
  // ROUTE PUBLIC & USER (KHÔNG YÊU CẦU ADMIN)
  // ==========================================
  {
    path: "/",
    name: "Home",
    component: Dashboard,
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
    meta: { hideHeaderFooter: true },
  },
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
    path: "/test2/:id",
    name: "ProductDetail",
    component: () => import("../pages/ProductPagever2.vue"),
    meta: { hideHeaderFooter: true },
  },
  {
    path: "/simulation",
    name: "Simulation",
    component: () => import("../components/UnityPlayer.vue"),
    meta: { hideHeaderFooter: true },
  },
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
    meta: { hideHeaderFooter: true }, 
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

// ==========================================
// ĐIỀU HƯỚNG BẢO MẬT (NAVIGATION GUARDS)
// ==========================================
router.beforeEach((to, from, next) => {
  // Kiểm tra xem route hiện tại hoặc các route cha của nó có yêu cầu quyền admin không
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAdmin) {
    const isAdmin = checkIfUserIsAdmin();

    if (!isAdmin) {
      // Nếu không phải Admin, chặn lại và đá về trang Home (hoặc trang Login tùy bạn)
      alert("Truy cập bị từ chối! Bạn không có quyền quản trị viên.");
      next({ name: "Home" });
    } else {
      // Đúng là Admin thì cho đi tiếp
      next();
    }
  } else {
    // Các route bình thường không yêu cầu admin thì cho qua
    next();
  }
});

export default router;