<template>
  <div class="min-h-screen bg-[#f8fafc] flex font-sans">
    <aside
      class="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col sticky top-0 h-screen z-50"
    >
      <div class="p-6 flex items-center gap-3">
        <div
          class="w-10 h-10 bg-slate-900 text-teal-400 rounded-xl flex items-center justify-center shadow-lg"
        >
          <Radio class="w-6 h-6" />
        </div>
        <div class="flex flex-col uppercase tracking-tighter">
          <span class="text-sm font-black text-slate-800 leading-none"
            >SkyLink</span
          >
          <span class="text-[9px] text-teal-600 font-bold tracking-[0.2em] mt-1"
            >Hệ thống điều hành</span
          >
        </div>
      </div>

      <nav class="flex-1 px-4 overflow-y-auto space-y-6">
        <div v-for="group in sidebarGroups" :key="group.title">
          <h3
            class="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
          >
            {{ group.title }}
          </h3>
          <div class="space-y-1">
            <router-link
              v-for="link in group.links"
              :key="link.name"
              :to="link.href"
              class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-bold text-[13px] group text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              active-class="!bg-slate-900 !text-white shadow-xl shadow-slate-200"
            >
              <div class="flex items-center gap-3">
                <component :is="link.icon" class="w-4 h-4" />
                <span>{{ link.name }}</span>
              </div>
              <span
                v-if="link.live"
                class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
              ></span>
            </router-link>
          </div>
        </div>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <header
        class="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-8 flex items-center justify-between"
      >
        <h1 class="text-xl font-black text-slate-900 uppercase tracking-tight">
          Hệ thống SkyLink
        </h1>
        <div class="flex items-center gap-6">
          <div
            class="flex items-center gap-3 border-l pl-6 border-slate-100 cursor-pointer"
          >
            <div class="text-right hidden sm:block">
              <p class="text-xs font-black text-slate-900">Phach Nguyen</p>
              <p class="text-[9px] text-teal-600 font-bold uppercase">Admin</p>
            </div>
            <img
              src="https://ui-avatars.com/api/?name=Phach&background=0f172a&color=2dd4bf"
              class="w-10 h-10 rounded-xl"
            />
          </div>
        </div>
      </header>

      <main class="p-8">
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
} from "lucide-vue-next";
const sidebarGroups = [
  {
    title: "Chính",
    links: [
      {
        name: "Bảng điều khiển",
        icon: LayoutDashboard,
        href: "/profile/dashboard",
      },
    ],
  },
  {
    title: "Vận hành",
    links: [
      { name: "Phi đội Drone", icon: Plane, href: "/fleet" },
      { name: "Lập trình bay", icon: Map, href: "/missions" },
      { name: "Giám sát", icon: Activity, href: "/tracking", live: true },
    ],
  },
  {
    title: "Hệ thống",
    links: [{ name: "Cài đặt", icon: Settings, href: "/settings" }],
  },
];
</script>
