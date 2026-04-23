<template>
  <div
    class="min-h-screen bg-[#f8fafc] grid transition-all duration-300 ease-in-out"
    :style="{ gridTemplateColumns: isSidebarOpen ? '260px 1fr' : '80px 1fr' }"
  >
    <aside
      class="bg-white text-slate-600 flex flex-col sticky top-0 h-screen z-50 border-r border-slate-100 transition-all duration-300"
    >
      <div
        class="h-20 flex items-center px-5 border-b border-slate-100 shrink-0"
      >
        <div
          class="p-2.5 bg-[#5b6275] rounded-xl text-white shadow-sm shrink-0 flex items-center justify-center"
        >
          <PlaneTakeoff :size="22" stroke-width="2.5" />
        </div>
        <transition name="fade">
          <div
            v-if="isSidebarOpen"
            class="ml-3 flex flex-col overflow-hidden whitespace-nowrap"
          >
            <span class="font-bold text-[17px] text-slate-800 leading-tight">
              SkyGate Drone
            </span>
            <span
              class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5"
            >
              Hệ thống quản lý
            </span>
          </div>
        </transition>
      </div>

      <nav
        class="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar overflow-x-hidden"
      >
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center p-3 rounded-xl transition-all group relative font-medium"
          :class="[isSidebarOpen ? 'gap-3.5' : 'justify-center']"
          active-class="bg-[#5b6275] !text-white shadow-md shadow-slate-500/20"
        >
          <component
            :is="item.icon"
            :size="20"
            class="shrink-0 transition-colors"
            :class="
              route.path.includes(item.path)
                ? 'text-white'
                : 'text-slate-400 group-hover:text-slate-700'
            "
          />

          <span
            v-if="isSidebarOpen"
            class="text-[14px] whitespace-nowrap transition-opacity"
          >
            {{ item.name }}
          </span>

          <span
            v-if="!isSidebarOpen"
            class="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[60] whitespace-nowrap shadow-xl"
          >
            {{ item.name }}
          </span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-100 shrink-0 space-y-2">
        <button
          v-if="isSidebarOpen"
          @click="$router.push('/admin/drones/add')"
          class="w-full flex items-center justify-center gap-2 bg-[#5b6275] hover:bg-[#4a5061] text-white p-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
          <PlusCircle :size="18" />
          <span>Thêm Drone mới</span>
        </button>

        <button
          @click="logout"
          class="flex items-center p-3 w-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-medium"
          :class="isSidebarOpen ? 'gap-3.5' : 'justify-center'"
          title="Đăng xuất"
        >
          <LogOut :size="20" />
          <span v-if="isSidebarOpen" class="text-sm">Đăng xuất</span>
        </button>
      </div>
    </aside>

    <div class="flex flex-col min-w-0">
      <header
        class="h-20 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40"
      >
        <div class="flex items-center gap-4 flex-1">
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="cursor-pointer p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Menu v-if="!isSidebarOpen" :size="22" />
            <ChevronLeft v-else :size="22" />
          </button>

          <div class="relative w-full max-w-md hidden lg:block ml-2">
            <Search
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              :size="16"
            />
            <input
              type="text"
              placeholder="Tìm kiếm drone, mã thiết bị..."
              class="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border-none rounded-xl text-[13px] font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#5b6275]/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div
            class="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-slate-500"
          >
            <a href="#" class="hover:text-slate-800 transition-colors"
              >Hệ thống</a
            >
            <a href="#" class="hover:text-slate-800 transition-colors"
              >Báo cáo</a
            >
            <a href="#" class="hover:text-slate-800 transition-colors"
              >Hỗ trợ</a
            >
          </div>

          <div class="flex items-center gap-4 pl-6 border-l border-slate-100">
            <button
              class="relative p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Bell :size="20" />
              <span
                class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"
              ></span>
            </button>

            <button
              class="p-1.5 text-slate-400 hover:text-slate-600 transition-colors hidden sm:block"
            >
              <Settings :size="20" />
            </button>

            <div class="flex items-center gap-3 cursor-pointer group">
              <div
                class="w-9 h-9 bg-[#1e293b] rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-transparent group-hover:ring-slate-200 transition-all"
              >
                PN
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 relative">
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
  Menu,
  ChevronLeft,
  Bell,
  Search,
  Settings,
  PlusCircle,
  GraduationCap,
  PlaneTakeoff,
  Calendar,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const isSidebarOpen = ref(true);

// Đồng bộ menu với bản thiết kế
const menuItems = [
  { name: "Bảng điều khiển", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Thư viện Drone", path: "/admin/drones", icon: PlaneTakeoff },
  { name: "Quản lý bài giảng", path: "/admin/course", icon: GraduationCap },
  { name: "Lịch bay", path: "/admin/schedule", icon: Calendar },
];

const logout = () => {
  // Logic đăng xuất
  router.push("/login");
};
</script>

<style scoped>
/* Hiệu ứng chuyển trang mượt mà */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.2s ease-out;
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Hiệu ứng mờ chữ Logo khi thu gọn Sidebar */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Tùy chỉnh thanh cuộn tinh tế cho Sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #94a3b8;
}
</style>
