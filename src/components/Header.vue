<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  Search,
  ChevronDown,
  Bell,
  Radio,
  ArrowRight,
  User,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-vue-next";

// Quản lý trạng thái đóng/mở Submenu Profile
const isProfileOpen = ref(false);
const profileRef = ref(null);

const toggleProfile = () => (isProfileOpen.value = !isProfileOpen.value);

const handleClickOutside = (event) => {
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    isProfileOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

const navLinks = [
  { name: "Tổng quan", href: "/" },
  {
    name: "Vận hành",
    href: "/operation",
    subLinks: [
      {
        name: "Các vùng cấm bay",
        href: "/no-fly-zones",
        desc: "Kiểm tra khu vực trước khi bay",
      },
      {
        name: "Lập trình đường bay",
        href: "/operation/planner",
        desc: "Thiết lập Waypoints cho nhiệm vụ",
      },
      {
        name: "Kiểm tra an toàn",
        href: "/operation/checklist",
        desc: "Quy trình Pre-flight bắt buộc",
      },
    ],
  },
  {
    name: "Thiết bị",
    href: "/fleet",
    subLinks: [
      {
        name: "Sản phẩm",
        href: "/fleet/list",
        desc: "Thông số kỹ thuật & Firmware",
      },
      {
        name: "Tình trạng Pin",
        href: "/fleet/battery",
        desc: "Theo dõi chu kỳ & điện áp",
      },
      {
        name: "Nhật ký bảo trì",
        href: "/fleet/maintenance",
        desc: "Lịch sử sửa chữa thiết bị",
      },
    ],
  },
  {
    name: "Dữ liệu",
    href: "/data",
    subLinks: [
      {
        name: "Lịch sử chuyến bay",
        href: "/data/history",
        desc: "Xem lại quỹ đạo bay (Playback)",
      },
      {
        name: "Thư viện hình ảnh",
        href: "/data/media",
        desc: "Ảnh & Video thu thập từ Drone",
      },
      {
        name: "Báo cáo nhiệm vụ",
        href: "/data/reports",
        desc: "Xuất file PDF kết quả sau bay",
      },
    ],
  },
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

        <div
          class="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full select-none"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span class="relative rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span
            class="text-[10px] font-bold text-emerald-700 tracking-tight uppercase"
            >Cổng tín hiệu: Sẵn sàng</span
          >
        </div>
      </div>

      <nav class="hidden lg:flex items-center gap-1">
        <div v-for="link in navLinks" :key="link.name" class="relative group">
          <router-link
            :to="link.href"
            class="flex items-center gap-1.5 py-2 px-4 text-[13px] font-bold uppercase tracking-wide text-slate-600 transition-all rounded-lg hover:bg-slate-50 hover:text-teal-600"
            active-class="!text-teal-600 bg-teal-50/50"
          >
            {{ link.name }}
            <ChevronDown
              v-if="link.subLinks"
              class="w-3.5 h-3.5 opacity-40 group-hover:rotate-180 transition-transform"
            />
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
            title="Tìm kiếm"
          >
            <Search class="w-5 h-5" />
          </button>
          <button
            class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all relative"
            title="Thông báo"
          >
            <Bell class="w-5 h-5" />
            <span
              class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
            ></span>
          </button>
        </div>

        <div class="relative" ref="profileRef">
          <button
            @click="toggleProfile"
            class="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all active:scale-95 shadow-md shadow-slate-200 group border border-slate-700/50"
            :class="{ 'ring-2 ring-teal-500/50': isProfileOpen }"
          >
            <div
              class="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-[11px] font-black shadow-inner ring-2 ring-slate-800 group-hover:ring-teal-500/30 transition-all"
            >
              OP
            </div>
            <div class="flex flex-col items-start leading-none">
              <span class="text-[11px] font-bold tracking-wide"
                >PhachNguyen</span
              >
              <span
                class="text-[9px] text-teal-400 font-medium uppercase mt-0.5 tracking-wider"
                >Operator</span
              >
            </div>
          </button>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-2"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-2"
          >
            <div
              v-if="isProfileOpen"
              class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[60] overflow-hidden"
            >
              <div
                class="px-4 py-3 bg-slate-50/50 border-b border-slate-100 mb-1"
              >
                <p
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                >
                  Hệ thống
                </p>
                <p class="text-xs font-bold text-slate-700 truncate">
                  phachnguyen@sky.link
                </p>
              </div>

              <div class="px-1.5 space-y-0.5">
                <router-link
                  to="/profile"
                  class="flex items-center gap-3 px-3 py-2 text-[13px] font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-all group/item"
                >
                  <div
                    class="p-1.5 bg-slate-100 rounded-lg group-hover/item:bg-white transition-colors"
                  >
                    <User class="w-4 h-4" />
                  </div>
                  Bảng điều khiển
                </router-link>
                <router-link
                  to="/settings"
                  class="flex items-center gap-3 px-3 py-2 text-[13px] font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-all group/item"
                >
                  <div
                    class="p-1.5 bg-slate-100 rounded-lg group-hover/item:bg-white transition-colors"
                  >
                    <Settings class="w-4 h-4" />
                  </div>
                  Cài đặt hệ thống
                </router-link>
              </div>

              <div class="mt-2 pt-1 border-t border-slate-100 px-1.5">
                <button
                  class="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-black text-red-500 hover:bg-red-50 rounded-xl transition-all group/logout"
                >
                  <div
                    class="p-1.5 bg-red-100/50 rounded-lg group-hover/logout:bg-white transition-colors"
                  >
                    <LogOut class="w-4 h-4" />
                  </div>
                  ĐĂNG XUẤT
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>
