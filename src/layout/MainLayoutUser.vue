<template>
  <div class="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
    <aside
      class="w-72 bg-white border-r border-slate-100 hidden md:flex flex-col sticky top-0 h-screen z-50"
    >
      <div class="p-8">
        <h2
          class="text-sm font-black uppercase tracking-tighter text-slate-800"
        >
          UAV Pilot Mastery
        </h2>
        <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">
          Module 01: Core Systems
        </p>

        <div class="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div class="flex justify-between items-end mb-2">
            <span class="text-[10px] font-black uppercase text-teal-600"
              >45% Hoàn thành</span
            >
          </div>
          <div class="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-teal-500 w-[45%] transition-all duration-1000"
            ></div>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2 overflow-y-auto">
        <router-link
          v-for="link in navigationLinks"
          :key="link.name"
          :to="link.href"
          class="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-[13px] transition-all group text-slate-400 hover:text-slate-900"
          active-class="bg-teal-50/50 !text-teal-600 ring-1 ring-teal-100"
        >
          <div
            class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors border border-slate-100 shadow-sm"
            :class="{
              '!bg-teal-500 !text-white !border-teal-400':
                $route.path === link.href,
            }"
          >
            <component :is="link.icon" class="w-4 h-4" />
          </div>
          <span>{{ link.name }}</span>
        </router-link>
      </nav>

      <div class="p-6 border-t border-slate-50 space-y-2">
        <button
          class="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-900"
        >
          <Settings class="w-4 h-4" /> Cài đặt
        </button>
        <button
          class="w-full bg-slate-900 text-white py-3 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-slate-200"
        >
          Tiếp tục học
        </button>
      </div>
    </aside>

    <div
      class="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar"
    >
      <main class="p-4 md:p-12 max-w-6xl mx-auto w-full">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  LayoutDashboard,
  Plane,
  Map,
  Activity,
  Database,
  Settings,
  Radio,
  GraduationCap,
  Compass,
} from "lucide-vue-next";

const navigationLinks = [
  {
    name: "Thông tin cá nhân",
    icon: LayoutDashboard,
    href: "/profile/dashboard",
  },
  {
    name: "Khóa học của tôi",
    icon: GraduationCap,
    href: "/profile/courses",
  },
  // { name: "Vật lý bay", icon: Plane, href: "/profile/physics" },
  // { name: "Hệ thống động lực", icon: Activity, href: "/profile/propulsion" },
  // { name: "Định vị & GPS", icon: Compass, href: "/profile/gps" },
];
</script>
