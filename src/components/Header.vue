<template>
  <header
    class="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-lg z-50 transition-all duration-300"
  >
    <div
      class="max-w-[1440px] mx-auto px-4 md:px-6 py-3 flex justify-between items-center"
    >
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-3 group">
          <div
            class="p-2.5 bg-slate-900 text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm"
          >
            <Radio class="w-5 h-5" />
          </div>
          <div class="flex flex-col uppercase tracking-tighter">
            <span
              class="text-lg font-black text-slate-900 leading-none tracking-tight"
            >
              SkyLink
            </span>
            <span
              class="text-[9px] text-slate-500 font-extrabold tracking-[0.2em] mt-0.5 group-hover:text-blue-600 transition-colors"
            >
              Flight System
            </span>
          </div>
        </router-link>
      </div>

      <nav class="hidden lg:flex items-center gap-2">
        <div v-for="link in navLinks" :key="link.name" class="relative group">
          <div
            v-if="link.subLinks"
            class="flex items-center gap-1.5 py-2 px-4 text-[13px] font-bold text-slate-600 cursor-default transition-all rounded-lg group-hover:bg-slate-50 group-hover:text-blue-600"
          >
            {{ link.name }}
            <ChevronDown
              class="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform"
            />
          </div>

          <router-link
            v-else
            :to="link.href"
            class="flex items-center gap-1.5 py-2 px-4 text-[13px] font-bold text-slate-600 transition-all rounded-lg hover:bg-slate-50 hover:text-blue-600"
            active-class="text-blue-600 bg-blue-50/50"
          >
            {{ link.name }}
          </router-link>

          <div
            v-if="link.subLinks"
            class="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-2xl p-2 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0"
          >
            <router-link
              v-for="sub in link.subLinks"
              :key="sub.name"
              :to="sub.href"
              class="flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-xl group/item transition-all"
              active-class="text-blue-600 bg-blue-50/50"
            >
              <div class="flex flex-col">
                <span
                  class="text-slate-800 group-hover/item:text-blue-600 text-[13px] font-bold"
                >
                  {{ sub.name }}
                </span>
                <span
                  class="text-[10px] text-slate-400 font-medium leading-tight mt-0.5"
                >
                  {{ sub.desc }}
                </span>
              </div>
              <ArrowRight
                class="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-blue-600"
              />
            </router-link>
          </div>
        </div>
      </nav>

      <div class="flex items-center gap-2 md:gap-4">
        <div
          class="hidden sm:flex items-center border-r border-slate-200 pr-4 gap-1"
        >
          <button
            class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          >
            <Search class="w-5 h-5" />
          </button>
          <button
            v-if="isLoggedIn"
            class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all relative"
          >
            <Bell class="w-5 h-5" />
            <span
              class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"
            ></span>
          </button>
        </div>

        <div class="relative" ref="profileRef">
          <template v-if="isLoggedIn && user">
            <button
              @click="isProfileOpen = !isProfileOpen"
              class="flex items-center gap-3 pl-1.5 pr-4 py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-full transition-all active:scale-95"
              :class="{
                'ring-2 ring-blue-500/20 border-blue-200': isProfileOpen,
              }"
            >
              <div
                class="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
              >
                {{ userAvatar }}
              </div>
              <div
                class="flex flex-col items-start leading-none hidden sm:flex"
              >
                <span class="text-[12px] font-bold text-slate-800">{{
                  user.full_name
                }}</span>
                <span
                  class="text-[10px] text-slate-500 font-semibold uppercase mt-0.5"
                  >{{ user.role }}</span
                >
              </div>
              <ChevronDown
                class="w-3.5 h-3.5 text-slate-400 ml-1 hidden sm:block"
              />
            </button>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="isProfileOpen"
                class="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl rounded-2xl border border-slate-100 p-2 z-[60]"
              >
                <div class="sm:hidden px-3 py-2 border-b border-slate-100 mb-2">
                  <span class="block text-[13px] font-bold text-slate-800">{{
                    user.full_name
                  }}</span>
                  <span
                    class="block text-[11px] text-slate-500 font-medium uppercase"
                    >{{ user.role }}</span
                  >
                </div>

                <router-link
                  v-if="user.role !== 'admin'"
                  to="/profile/dashboard"
                  class="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <UserIcon class="w-4 h-4" /> Hồ sơ cá nhân
                </router-link>

                <router-link
                  v-if="user.role === 'admin'"
                  to="/admin/dashboard"
                  class="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <Settings class="w-4 h-4" /> Bảng điều khiển
                </router-link>

                <div class="h-px bg-slate-100 my-1"></div>

                <button
                  @click="logout"
                  class="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut class="w-4 h-4" /> Đăng xuất
                </button>
              </div>
            </transition>
          </template>

          <div v-else class="flex items-center gap-2">
            <router-link
              to="/login"
              class="hidden sm:block px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Đăng nhập
            </router-link>
            <router-link
              to="/register"
              class="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-[13px] font-bold rounded-full transition-colors shadow-sm active:scale-95"
            >
              <UserPlus class="w-4 h-4" /> Đăng ký
            </router-link>
          </div>
        </div>

        <button
          class="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden transition-colors ml-1"
        >
          <Menu class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  Search,
  ChevronDown,
  Bell,
  Radio,
  ArrowRight,
  UserPlus,
  LogOut,
  Settings,
  User as UserIcon,
  Menu, // Import thêm icon Menu cho màn hình mobile
} from "lucide-vue-next";

const route = useRoute();
const authStore = useAuthStore();

// --- Auth Logic ---
const isLoggedIn = computed(() => !!authStore.token);
const user = computed(() => authStore.user);

// Bổ sung computed để lấy chữ cái đầu tiên của tên làm Avatar
const userAvatar = computed(() => {
  if (!user.value || !user.value.full_name) return "U";
  const names = user.value.full_name.trim().split(" ");
  return names[names.length - 1].charAt(0).toUpperCase();
});

const logout = () => {
  authStore.logout();
  isProfileOpen.value = false;
};

// --- UI Logic ---
const isProfileOpen = ref(false);
const profileRef = ref(null);

const handleClickOutside = (e) => {
  if (profileRef.value && !profileRef.value.contains(e.target)) {
    isProfileOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

// --- Nav Data ---
const navLinks = [
  { name: "Tổng quan", href: "/" },
  { name: "Mô phỏng UAV", href: "/simulation" }, // Tinh chỉnh tên cho phù hợp ngữ cảnh hệ thống
  { name: "Khóa học", href: "/test" },
  { name: "Thư viện Drone", href: "/services" },
  { name: "Lịch sử bay", href: "/history" },
];
</script>
