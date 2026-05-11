<template>
  <footer class="border-t border-slate-800 bg-slate-950 text-slate-300">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_1.85fr] lg:px-8">
      <div>
        <router-link to="/" class="inline-flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-blue-300/20">
            <GraduationCap class="h-5 w-5" />
          </div>
          <div>
            <p class="text-lg font-extrabold leading-none text-slate-50">SkyLinkEdu</p>
            <p class="mt-1 text-xs font-semibold text-slate-400">UAV Learning Platform</p>
          </div>
        </router-link>

        <p class="mt-5 max-w-md text-sm leading-7 text-slate-400">
          Nền tảng bài giảng UAV dành cho sinh viên, kỹ sư và giảng viên: học theo module, thực hành với lab mô phỏng và theo dõi checklist vận hành.
        </p>

        <div class="mt-6 grid max-w-md gap-3 sm:grid-cols-3">
          <div
            v-for="item in footerStats"
            :key="item.label"
            class="rounded-2xl border border-slate-800 bg-slate-900/70 p-3"
          >
            <p class="text-base font-bold text-slate-50">{{ item.value }}</p>
            <p class="mt-1 text-xs leading-5 text-slate-500">{{ item.label }}</p>
          </div>
        </div>
      </div>

      <div class="grid gap-8 sm:grid-cols-3">
        <div v-for="column in footerColumns" :key="column.title">
          <h3 class="text-sm font-bold text-slate-50">{{ column.title }}</h3>
          <ul class="mt-4 space-y-3">
            <li v-for="link in column.links" :key="link.label">
              <router-link
                :to="link.href"
                class="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-200"
              >
                <component :is="link.icon" class="h-4 w-4" />
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-800">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>&copy; 2026 SkyLinkEdu. Nền tảng đào tạo kỹ thuật UAV.</p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span class="inline-flex items-center gap-2">
            <ShieldCheck class="h-4 w-4 text-emerald-300" />
            Nội dung học tập có cấu trúc
          </span>
          <span class="inline-flex items-center gap-2">
            <Mail class="h-4 w-4 text-blue-200" />
            Hỗ trợ học viên và giảng viên
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  BadgeCheck,
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Mail,
  MonitorPlay,
  Plane,
  Route,
  Settings,
  ShieldCheck,
} from "lucide-vue-next";

const footerStats = [
  { value: "24", label: "bài giảng theo module" },
  { value: "8", label: "lab mô phỏng UAV" },
  { value: "12h", label: "thực hành có hướng dẫn" },
];

const footerColumns = [
  {
    title: "Học tập",
    links: [
      { label: "Tổng quan", href: "/", icon: Route },
      { label: "Khóa học", href: "/course", icon: BookOpen },
      { label: "Bài học mẫu", href: "/test", icon: BadgeCheck },
      { label: "Khóa học của tôi", href: "/profile/courses", icon: ClipboardCheck },
    ],
  },
  {
    title: "Thực hành",
    links: [
      { label: "Lab mô phỏng", href: "/simulation", icon: MonitorPlay },
      { label: "Thư viện UAV", href: "/services", icon: Plane },
      { label: "Vùng cấm bay", href: "/no-fly-zones", icon: ShieldCheck },
      { label: "Nhật ký bay", href: "/history", icon: FileText },
    ],
  },
  {
    title: "Tài khoản",
    links: [
      { label: "Đăng nhập", href: "/login", icon: BadgeCheck },
      { label: "Đăng ký học", href: "/register", icon: GraduationCap },
      { label: "Cài đặt", href: "/settings", icon: Settings },
      { label: "Hồ sơ học viên", href: "/profile/dashboard", icon: ClipboardCheck },
    ],
  },
];
</script>
