<template>
  <header class="border-b sticky top-0 bg-white/80 backdrop-blur-md z-40">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div
        class="flex items-center gap-2 text-2xl font-bold text-teal-600 cursor-pointer"
      >
        <span
          class="p-2 bg-teal-600 text-white rounded-lg shadow-lg shadow-teal-200"
          >U</span
        >
        <span class="tracking-tight text-slate-800"
          >Thế Giới <span class="text-teal-600">UAV</span></span
        >
      </div>

      <nav
        class="hidden lg:flex gap-8 font-semibold text-sm uppercase tracking-wide"
      >
        <div v-for="link in navLinks" :key="link.name" class="relative group">
          <a
            :href="link.href"
            class="flex items-center gap-1 py-2 transition-colors duration-300"
            :class="
              link.active
                ? 'text-teal-600'
                : 'text-slate-600 hover:text-teal-600'
            "
          >
            {{ link.name }}
            <ChevronDown
              v-if="link.subLinks"
              class="w-4 h-4 group-hover:rotate-180 transition-transform"
            />
          </a>

          <div
            v-if="link.subLinks"
            class="absolute top-full left-0 w-56 bg-white shadow-xl rounded-2xl p-4 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            <ul class="space-y-3">
              <li v-for="sub in link.subLinks" :key="sub.name">
                <a
                  :href="sub.href"
                  class="text-slate-500 hover:text-teal-600 text-sm font-medium transition-colors block"
                >
                  {{ sub.name }}
                </a>
              </li>
            </ul>
          </div>

          <span
            class="absolute bottom-0 left-0 h-0.5 bg-teal-600 transition-all duration-300"
            :class="link.active ? 'w-full' : 'w-0 group-hover:w-full'"
          ></span>
        </div>
      </nav>

      <div class="flex items-center gap-3">
        <button
          class="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
        >
          <Search class="w-5 h-5" />
        </button>

        <button
          class="p-2.5 hover:bg-slate-100 rounded-xl transition-colors relative text-slate-600"
        >
          <ShoppingCart class="w-5 h-5" />
          <span
            class="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white"
          >
            2
          </span>
        </button>

        <div class="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

        <button
          class="hidden sm:block font-bold text-sm text-slate-700 hover:text-teal-600 transition-colors"
        >
          Đăng nhập
        </button>

        <button
          class="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-200 transition-all duration-300 active:scale-95"
        >
          Đăng ký
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ShoppingCart, Search, ChevronDown } from "lucide-vue-next";

const navLinks = [
  { name: "Trang chủ", href: "#", active: true },
  {
    name: "Cửa hàng",
    href: "#",
    active: false,
    subLinks: [
      { name: "Drone Quay phim", href: "#" },
      { name: "Drone Công nghiệp", href: "#" },
      { name: "Drone Nông nghiệp", href: "#" },
      { name: "Linh kiện & Phụ kiện", href: "#" },
    ],
  },
  { name: "Mô phỏng", href: "#", active: false },
  { name: "Dịch vụ", href: "#", active: false },
  { name: "Tin tức", href: "#", active: false },
  { name: "Liên hệ", href: "#", active: false },
];
</script>
