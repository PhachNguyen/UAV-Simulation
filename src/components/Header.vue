<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-[oklch(0.998_0.004_250_/_0.92)] backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <router-link to="/" class="flex min-w-0 items-center gap-3" @click="isMobileOpen = false">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-blue-200 shadow-sm">
          <GraduationCap class="h-5 w-5" />
        </div>
        <div class="min-w-0">
          <p class="text-base font-extrabold leading-none text-slate-950">SkyLinkEdu</p>
          <p class="mt-1 truncate text-xs font-semibold text-slate-500">UAV Learning Platform</p>
        </div>
      </router-link>

      <nav class="hidden items-center rounded-2xl border border-slate-200 bg-[oklch(0.985_0.006_250)] p-1 lg:flex">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.href"
          class="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-[oklch(0.998_0.004_250)] hover:text-blue-700"
          active-class="bg-[oklch(0.998_0.004_250)] text-blue-700 shadow-sm"
          exact-active-class="bg-[oklch(0.998_0.004_250)] text-blue-700 shadow-sm"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <div class="flex items-center gap-2">
        <router-link
          to="/simulation"
          class="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-[oklch(0.998_0.004_250)] px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 md:inline-flex"
        >
          <MonitorPlay class="h-4 w-4" />
          Lab mô phỏng
        </router-link>

        <div class="relative" ref="profileRef">
          <template v-if="isLoggedIn && user">
            <button
              @click="isProfileOpen = !isProfileOpen"
              class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[oklch(0.998_0.004_250)] py-1.5 pl-1.5 pr-3 transition duration-200 hover:border-blue-200 hover:bg-blue-50/60"
              :class="{ 'border-blue-200 ring-4 ring-blue-100': isProfileOpen }"
            >
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-slate-50">
                {{ userAvatar }}
              </span>
              <span class="hidden min-w-0 text-left sm:block">
                <span class="block max-w-32 truncate text-sm font-bold text-slate-900">{{ user.full_name }}</span>
                <span class="mt-0.5 block text-xs font-semibold text-slate-500">{{ roleLabel }}</span>
              </span>
              <ChevronDown class="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>

            <transition
              enter-active-class="transition duration-180 ease-out"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition duration-120 ease-in"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
            >
              <div
                v-if="isProfileOpen"
                class="absolute right-0 top-full z-[60] mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-[oklch(0.998_0.004_250)] p-2 shadow-[0_18px_48px_oklch(0.42_0.04_250_/_0.18)]"
              >
                <div class="border-b border-slate-200 px-3 py-3">
                  <p class="truncate text-sm font-bold text-slate-900">{{ user.full_name }}</p>
                  <p class="mt-1 text-xs font-medium text-slate-500">{{ roleLabel }}</p>
                </div>

                <router-link
                  :to="dashboardPath"
                  class="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  @click="isProfileOpen = false"
                >
                  <LayoutDashboard class="h-4 w-4" />
                  Bảng học tập
                </router-link>

                <router-link
                  v-if="user.role !== 'admin'"
                  to="/profile/courses"
                  class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  @click="isProfileOpen = false"
                >
                  <BookOpenCheck class="h-4 w-4" />
                  Khóa học của tôi
                </router-link>

                <button
                  @click="logout"
                  class="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  <LogOut class="h-4 w-4" />
                  Đăng xuất
                </button>
              </div>
            </transition>
          </template>

          <div v-else class="hidden items-center gap-2 sm:flex">
            <router-link
              to="/login"
              class="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Đăng nhập
            </router-link>
            <router-link
              to="/register"
              class="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-50 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <UserPlus class="h-4 w-4" />
              Bắt đầu học
            </router-link>
          </div>
        </div>

        <button
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-[oklch(0.998_0.004_250)] text-slate-700 transition hover:border-blue-200 hover:text-blue-700 lg:hidden"
          type="button"
          :aria-expanded="isMobileOpen"
          aria-label="Mở menu"
          @click="isMobileOpen = !isMobileOpen"
        >
          <X v-if="isMobileOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-if="isMobileOpen" class="border-t border-slate-200 bg-[oklch(0.998_0.004_250)] lg:hidden">
        <div class="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:px-6">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.href"
            class="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            active-class="bg-blue-50 text-blue-700"
            exact-active-class="bg-blue-50 text-blue-700"
            @click="isMobileOpen = false"
          >
            {{ link.name }}
          </router-link>

          <div v-if="!isLoggedIn" class="mt-2 grid gap-2 border-t border-slate-200 pt-4 sm:hidden">
            <router-link
              to="/login"
              class="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
              @click="isMobileOpen = false"
            >
              Đăng nhập
            </router-link>
            <router-link
              to="/register"
              class="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-slate-50"
              @click="isMobileOpen = false"
            >
              Bắt đầu học
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import {
  BookOpenCheck,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MonitorPlay,
  UserPlus,
  X,
} from "lucide-vue-next";

const authStore = useAuthStore();

const isLoggedIn = computed(() => !!authStore.token);
const user = computed(() => authStore.user);

const userAvatar = computed(() => {
  if (!user.value?.full_name) return "U";
  const names = user.value.full_name.trim().split(" ");
  return names[names.length - 1].charAt(0).toUpperCase();
});

const roleLabel = computed(() => (user.value?.role === "admin" ? "Quản trị viên" : "Học viên"));
const dashboardPath = computed(() => (user.value?.role === "admin" ? "/admin/dashboard" : "/profile/dashboard"));

const isProfileOpen = ref(false);
const isMobileOpen = ref(false);
const profileRef = ref(null);

const logout = () => {
  authStore.logout();
  isProfileOpen.value = false;
  isMobileOpen.value = false;
};

const handleClickOutside = (event) => {
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    isProfileOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

const navLinks = [
  { name: "Tổng quan", href: "/" },
  { name: "Khóa học", href: "/course" },
  { name: "Bài học mẫu", href: "/test" },
  { name: "Thư viện UAV", href: "/services" },
  // { name: "Tài liệu", href: "/history" },
];
</script>
