<template>
  <header
    class="border-b border-slate-200 sticky top-0 bg-white/90 backdrop-blur-md z-50"
  >
    <div
      class="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center"
    >
      <router-link to="/dashboard" class="flex items-center gap-6 group">
        <div
          class="flex items-center gap-2 text-xl font-extrabold cursor-pointer"
        >
          <div
            class="p-2 bg-slate-900 text-teal-400 rounded-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300"
          >
            <Radio class="w-6 h-6" />
          </div>
          <div class="flex flex-col leading-none">
            <span class="tracking-tight text-slate-900 uppercase">SkyLink</span>
            <span
              class="text-[10px] text-teal-600 font-bold tracking-widest uppercase"
              >Control System</span
            >
          </div>
        </div>

        <div
          class="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            ></span>
          </span>
          <span
            class="text-[11px] font-bold text-emerald-700 uppercase tracking-tighter"
            >Hệ thống Online</span
          >
        </div>
      </router-link>

      <nav class="hidden lg:flex gap-6 items-center">
        <div v-for="link in navLinks" :key="link.name" class="relative group">
          <router-link
            :to="link.href"
            class="flex items-center gap-1.5 py-2 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 transition-colors"
            active-class="text-teal-600"
          >
            {{ link.name }}
            <ChevronDown
              v-if="link.subLinks"
              class="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform"
            />

            <span
              class="absolute -bottom-[13px] left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-[.router-link-active]:w-full"
            ></span>
          </router-link>

          <div
            v-if="link.subLinks"
            class="absolute top-[120%] left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-xl p-2 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            <div v-for="sub in link.subLinks" :key="sub.name">
              <router-link
                :to="sub.href"
                class="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 rounded-lg group/item transition-all"
                active-class="bg-teal-50 !text-teal-600"
              >
                <span
                  class="text-slate-600 group-hover/item:text-teal-600 text-sm font-semibold tracking-tight"
                >
                  {{ sub.name }}
                </span>
                <ArrowRight
                  class="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"
                />
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex items-center gap-2">
        <button
          class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
        >
          <Search class="w-5 h-5" />
        </button>

        <button
          class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all relative"
        >
          <Bell class="w-5 h-5" />
          <span
            class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
          ></span>
        </button>

        <div class="h-5 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

        <button
          class="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          <div
            class="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          >
            AD
          </div>
          <span class="text-xs font-bold tracking-wide">Admin Control</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Search, ChevronDown, Bell, Radio, ArrowRight } from "lucide-vue-next";

const navLinks = [
  { name: "Tổng quan", href: "/dashboard" },
  {
    name: "Giám sát bay",
    href: "/monitor",
    subLinks: [
      { name: "Bản đồ thời gian thực", href: "/monitor/live-map" },
      { name: "Luồng Video trực tiếp", href: "/monitor/live-stream" },
      { name: "Thông số Telemetry", href: "/monitor/telemetry" },
    ],
  },
  {
    name: "Thiết bị",
    href: "/fleet",
    subLinks: [
      { name: "Danh sách Drone", href: "/fleet/drones" },
      { name: "Quản lý Pin", href: "/fleet/battery" },
      { name: "Trạm mặt đất (GCS)", href: "/fleet/stations" },
    ],
  },
  {
    name: "Nhiệm vụ",
    href: "/missions",
    subLinks: [
      { name: "Lập kế hoạch bay", href: "/missions/planner" },
      { name: "Lịch sử chuyến bay", href: "/missions/history" },
      { name: "Dữ liệu thu thập", href: "/missions/data" },
    ],
  },
  { name: "Vùng cấm bay", href: "/no-fly-zones" },
  { name: "Cài đặt", href: "/settings" },
];
</script>

<style scoped>
/* Đảm bảo router-link-active cho menu cấp 1 có màu chuẩn */
.router-link-active {
  color: #0d9488 !important; /* text-teal-600 */
}
</style>
