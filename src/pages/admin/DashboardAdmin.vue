<template>
  <div class="min-h-screen bg-[#f8fafc] pb-12 font-sans">
    <header
      class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="p-2 bg-[#1a2b4c] rounded-lg text-white shadow-lg shadow-blue-900/20"
          >
            <LayoutDashboard :size="20" />
          </div>
          <h1 class="text-lg font-bold text-slate-900 tracking-tight">
            Bảng điều khiển
          </h1>
        </div>

        <div class="flex gap-3">
          <router-link
            to="/admin/course"
            class="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2"
          >
            <Plus :size="14" /> Soạn bài giảng
          </router-link>
          <router-link
            to="/admin/drones/add"
            class="px-4 py-2 bg-[#1a2b4c] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#13203a] transition-all flex items-center gap-2"
          >
            <PlaneTakeoff :size="14" /> Thêm Drone
          </router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 mt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in dashboardStats"
          :key="stat.label"
          class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between mb-4">
            <div :class="['p-3 rounded-xl', stat.bgColor, stat.textColor]">
              <component :is="stat.icon" :size="24" />
            </div>
            <span
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >Active</span
            >
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">{{ stat.label }}</p>
            <h2 class="text-3xl font-bold text-slate-900 mt-1">
              {{ stat.value }}
            </h2>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8 space-y-8">
          <div
            class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center py-12"
          >
            <h3 class="text-lg font-bold text-slate-900 mb-6 text-left">
              Lưu lượng đào tạo
            </h3>
            <div
              class="h-64 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200"
            >
              <p class="text-slate-400 text-sm italic">
                Khu vực hiển thị biểu đồ Chart.js (Dữ liệu học viên & Drone)
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-6">
          <div
            class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <h3
              class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"
            >
              <Activity :size="18" class="text-blue-600" /> Hệ thống
            </h3>
            <div class="space-y-4">
              <div
                v-for="item in recentActivities"
                :key="item.id"
                class="flex gap-4 items-start"
              >
                <div
                  :class="['w-2 h-2 rounded-full mt-2 shrink-0', item.dotColor]"
                ></div>
                <div>
                  <p class="text-sm font-bold text-slate-800">
                    {{ item.title }}
                  </p>
                  <p class="text-xs text-slate-500 mt-0.5">{{ item.time }}</p>
                </div>
              </div>
            </div>
            <button
              class="w-full mt-6 py-3 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              Xem toàn bộ báo cáo
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  LayoutDashboard,
  PlaneTakeoff,
  Plus,
  Box,
  GraduationCap,
  Users,
  Activity,
  Zap,
} from "lucide-vue-next";

// Thống kê Dashboard
const dashboardStats = ref([
  {
    label: "Tổng số Drone",
    value: "14",
    icon: PlaneTakeoff,
    bgColor: "bg-teal-50",
    textColor: "text-teal-600",
  },
  {
    label: "Bài giảng SkyLink",
    value: "28",
    icon: GraduationCap,
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Người dùng",
    value: "152",
    icon: Users,
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    label: "Phiên học online",
    value: "09",
    icon: Zap,
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
]);

// Hoạt động gần đây (Mock data)
const recentActivities = ref([
  {
    id: 1,
    title: "Cập nhật bài giảng UAV Mavic 3",
    time: "2 phút trước",
    dotColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "Drone #09 đã hoàn thành bảo trì",
    time: "1 giờ trước",
    dotColor: "bg-teal-500",
  },
  {
    id: 3,
    title: "5 người dùng mới đăng ký",
    time: "3 giờ trước",
    dotColor: "bg-indigo-500",
  },
  {
    id: 4,
    title: "Hệ thống mô phỏng 3D đã cập nhật",
    time: "5 giờ trước",
    dotColor: "bg-amber-500",
  },
]);
</script>

<style scoped>
/* Đồng bộ font chữ mượt mà */
.font-sans {
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
}
</style>
