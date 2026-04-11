<template>
  <div
    class="min-h-screen bg-slate-50 grid transition-all duration-300 ease-in-out"
    :style="{ gridTemplateColumns: isSidebarOpen ? '260px 1fr' : '80px 1fr' }"
  >
    <aside
      class="bg-slate-900 text-white flex flex-col sticky top-0 h-screen z-50 overflow-hidden"
    >
      <div
        class="h-20 flex items-center px-6 border-b border-slate-800 shrink-0"
      >
        <div
          class="p-2 bg-teal-500 rounded-lg text-slate-900 shadow-lg shadow-teal-500/20"
        >
          <Radio :size="20" />
        </div>
        <transition name="fade">
          <span
            v-if="isSidebarOpen"
            class="ml-4 font-black tracking-tighter text-xl uppercase whitespace-nowrap"
            style="margin-left: 16px"
          >
            SkyAdmin
          </span>
        </transition>
      </div>

      <nav
        class="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar"
        style="overflow-x: hidden"
      >
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center p-3 rounded-xl transition-all group relative"
          :class="[isSidebarOpen ? 'gap-4' : 'justify-center']"
          active-class="bg-teal-500 !text-slate-900 shadow-lg shadow-teal-500/30"
        >
          <component :is="item.icon" :size="22" class="shrink-0" />

          <span
            v-if="isSidebarOpen"
            class="font-bold text-sm whitespace-nowrap transition-opacity"
          >
            {{ item.name }}
          </span>

          <span
            v-if="!isSidebarOpen"
            class="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[60] whitespace-nowrap"
          >
            {{ item.name }}
          </span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-800 shrink-0">
        <button
          @click="logout"
          class="flex items-center p-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          :class="isSidebarOpen ? 'gap-4' : 'justify-center'"
        >
          <LogOut :size="22" />
          <span v-if="isSidebarOpen" class="font-bold text-sm">Đăng xuất</span>
        </button>
      </div>
    </aside>

    <div class="flex flex-col min-w-0">
      <header
        class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-[12px] flex items-center justify-between sticky top-0 z-40"
      >
        <div class="flex items-center">
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="cursor-pointer p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
          >
            <Menu v-if="!isSidebarOpen" />
            <ChevronLeft v-else />
          </button>

          <div class="h-8 w-px bg-slate-200 hidden md:block"></div>

          <h2
            class="text-slate-800 font-black uppercase tracking-tight hidden md:block"
          >
            {{ currentPageName }}
          </h2>
        </div>

        <div class="flex items-center gap-6">
          <button
            class="relative p-2 text-slate-400 hover:text-teal-600 transition-colors"
          >
            <Bell :size="22" />
            <span
              class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
            ></span>
          </button>

          <div class="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div class="text-right hidden sm:block">
              <p class="text-xs font-black text-slate-900 leading-none">
                PhachNguyen
              </p>
              <p class="text-[10px] text-teal-600 font-bold uppercase mt-1">
                Super Admin
              </p>
            </div>
            <div
              class="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-teal-400 font-black text-xs ring-4 ring-slate-50 shadow-sm"
            >
              AD
            </div>
          </div>
        </div>
      </header>

      <main class="">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  LayoutDashboard,
  Box,
  LogOut,
  Radio,
  Menu,
  ChevronLeft,
  Bell,
  // Thêm lại các icon nếu bạn mở lại menu
  Users,
  FileText,
  Settings,
  ShieldAlert,
  Map,
  Database,
  GraduationCap,
  PlaneTakeoff,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const isSidebarOpen = ref(true);

const menuItems = [
  { name: "Bảng điều khiển", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Quản lý UAV", path: "/admin/drones", icon: PlaneTakeoff }, // Hoặc sử dụng 'Navigation' hoặc 'Cpu'
  { name: "Quản lý bài giảng", path: "/admin/course/add", icon: GraduationCap }, // Hoặc sử dụng 'BookOpen' hoặc 'Library'
];

const currentPageName = computed(() => {
  const current = menuItems.find((item) => route.path.includes(item.path));
  return current ? current.name : "Hệ thống";
});

const logout = () => {
  router.push("/login");
};
</script>

<style scoped>
/* Page Transitions mượt hơn */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.25s ease;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Hiệu ứng hiện chữ logo */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}
</style>
