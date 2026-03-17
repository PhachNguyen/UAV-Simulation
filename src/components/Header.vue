<script setup>
import { ref, computed, onMounted, onUnmounted, h } from "vue";
import { useRoute } from "vue-router"; // Thêm useRoute để quản lý trạng thái active
import {
  Search,
  ChevronDown,
  Bell,
  Radio,
  ArrowRight,
  User,
  Settings,
  LogOut,
  UserPlus,
  LogIn,
} from "lucide-vue-next";

const route = useRoute();

// --- Auth Logic ---
const user = ref({
  name: "PhachNguyen",
  email: "phachnguyen@sky.link",
  role: "Operator",
  avatar: "OP",
}); // Giả lập đã login
// const isLoggedIn = computed(() => !!user.value);
const isLoggedIn = computed(() => false); // Tạm thời luôn trả về true để hiển thị menu profile
const logout = () => {
  user.value = null;
  isProfileOpen.value = false;
};

// --- UI Logic ---
const isProfileOpen = ref(false);
const profileRef = ref(null);

const handleClickOutside = (e) => {
  if (profileRef.value && !profileRef.value.contains(e.target))
    isProfileOpen.value = false;
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

// --- Nav Data ---
const navLinks = [
  { name: "Tổng quan", href: "/" },
  {
    name: "Vận hành",
    subLinks: [
      {
        name: "Các vùng cấm bay",
        href: "/no-fly-zones",
        desc: "Kiểm tra khu vực trước khi bay",
      },
      {
        name: "Lập trình đường bay",
        href: "/operation/planner",
        desc: "Thiết lập Waypoints",
      },
    ],
  },
  { name: "Sản Phẩm", href: "/products" },
  // {
  //   name: "Dữ liệu",
  //   subLinks: [
  //     {
  //       name: "Lịch sử chuyến bay",
  //       href: "/data/history",
  //       desc: "Xem lại quỹ đạo bay",
  //     },
  //   ],
  // },
  {
    name: "Blog",
    href: "/blog",
  },
  { name: "Dịch vụ", href: "/services" },
  { name: "Cấu hình", href: "/settings" },
];
</script>
<template>
  <header
    class="border-b border-slate-200 sticky top-0 bg-white/90 backdrop-blur-md z-50"
  >
    <div
      class="max-w-[1440px] mx-auto px-6 py-2.5 flex justify-between items-center"
    >
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-3 group">
          <div
            class="p-2 bg-slate-900 text-teal-400 rounded-xl group-hover:scale-105 transition-all shadow-sm"
          >
            <Radio class="w-6 h-6" />
          </div>
          <div class="flex flex-col uppercase tracking-tighter">
            <span class="text-lg font-black text-slate-900 leading-none"
              >SkyLink</span
            >
            <span
              class="text-[9px] text-teal-600 font-extrabold tracking-[0.2em] mt-1"
              >Flight System</span
            >
          </div>
        </router-link>
      </div>

      <nav class="hidden lg:flex items-center gap-1">
        <div v-for="link in navLinks" :key="link.name" class="relative group">
          <div
            v-if="link.subLinks"
            class="flex items-center gap-1.5 py-2 px-4 text-[13px] font-bold uppercase tracking-wide text-slate-600 cursor-default transition-all rounded-lg group-hover:bg-slate-50 group-hover:text-teal-600"
          >
            {{ link.name }}
            <ChevronDown
              class="w-3.5 h-3.5 opacity-40 group-hover:rotate-180 transition-transform"
            />
          </div>

          <router-link
            v-else
            :to="link.href"
            class="flex items-center gap-1.5 py-2 px-4 text-[13px] font-bold uppercase tracking-wide text-slate-600 transition-all rounded-lg hover:bg-slate-50 hover:text-teal-600"
            active-class="!text-teal-600 bg-teal-50/50"
          >
            {{ link.name }}
          </router-link>

          <div
            v-if="link.subLinks"
            class="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl rounded-xl p-2 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0"
          >
            <router-link
              v-for="sub in link.subLinks"
              :key="sub.name"
              :to="sub.href"
              class="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 rounded-lg group/item transition-all"
              active-class="!text-teal-600 bg-teal-50/50"
            >
              <div class="flex flex-col">
                <span
                  class="text-slate-800 group-hover/item:text-teal-600 text-[13px] font-bold"
                  >{{ sub.name }}</span
                >
                <span
                  class="text-[10px] text-slate-400 font-medium leading-tight"
                  >{{ sub.desc }}</span
                >
              </div>
              <ArrowRight
                class="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-teal-600"
              />
            </router-link>
          </div>
        </div>
      </nav>

      <div class="flex items-center gap-3">
        <div class="flex items-center border-r border-slate-200 pr-2 gap-1">
          <button
            class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Search class="w-5 h-5" />
          </button>
          <button
            v-if="isLoggedIn"
            class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all relative"
          >
            <Bell class="w-5 h-5" />
            <span
              class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
            ></span>
          </button>
        </div>

        <div class="relative" ref="profileRef">
          <template v-if="isLoggedIn">
            <button
              @click="isProfileOpen = !isProfileOpen"
              class="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all active:scale-95 shadow-md border border-slate-700/50"
              :class="{ 'ring-2 ring-teal-500/50': isProfileOpen }"
            >
              <div
                class="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-[11px] font-black ring-2 ring-slate-800"
              >
                {{ user.avatar }}
              </div>
              <div class="flex flex-col items-start leading-none">
                <span class="text-[11px] font-bold tracking-wide">{{
                  user.name
                }}</span>
                <span
                  class="text-[9px] text-teal-400 font-medium uppercase mt-0.5"
                  >{{ user.role }}</span
                >
              </div>
            </button>
          </template>

          <div v-else class="flex items-center gap-1">
            <router-link
              to="/login"
              class="px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-teal-600 transition-colors"
            >
              Đăng nhập
            </router-link>
            <router-link
              to="/register"
              class="flex items-center gap-2 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white text-[13px] font-bold rounded-full transition-all shadow-md active:scale-95"
            >
              <UserPlus class="w-4 h-4" /> Đăng ký
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
