<script setup>
import { ref } from "vue";

// 1. Dữ liệu Điều hướng
const navLinks = [
  { name: "Sản phẩm", href: "#", active: true },
  { name: "Khóa học", href: "#", active: false },
  { name: "Mô phỏng", href: "#", active: false },
  { name: "Cộng đồng", href: "#", active: false },
];

// 2. Dữ liệu Sản phẩm Drone
const products = ref([
  {
    id: 1,
    name: "AeroSpeed FPV",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAirPebV3L9RXLPOlLKTZeE095hSk5N-RND27cCLkA2Xoxtk9aNxR3yL5_FI4lmZoiwX4aWrodPqa10Bo5nwrHSqXftsh3WER8b_pJVSF-p4WrR1J35TMPDoa_k7LiHeDhPuMYrHraeOU2wYwedhS-s2AtNffNtiJyjApw9grZhZvMuHNJNJR9qBUSABzQYby99VWMlpuOlUSWmd8l9QUFiU12EgCuLcN0TgMSmXLeK1hexGQgQrgwGQbBfk4UDlx1jg_tCI7xvig",
    stats: [
      { label: "Tốc độ", value: "140 km/h", icon: "speed" },
      { label: "Thời gian bay", value: "15 phút", icon: "timer" },
      { label: "Camera", value: "4K 60fps", icon: "videocam" },
    ],
  },
  {
    id: 2,
    name: "AeroVision 4K",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJUT_TRiC-uxAtn3L68T6eR_PX2nHitV9yDJS2CEyae-bnds3LZMsh3zgMiVpGZyvBQeXoHXi8J1KlPHPKxaZDP4mo4ZwcIfz1ePCH20tlxAgjiinc7yuSE8iCzFyC5zX2ekIrpCuUngl7TtAm5D4UY5G9DqtYHIR7usOdRnmD7GsxsWQYVMDSfy10ciuFZJRnt87GiUwCvzZ3CIGVo9DMSQhQ3tiHuvhTFSU3Oxkx-xINDxW7ntVvMk8Xlj2WJyPNb1DsOYxHIA",
    stats: [
      { label: "Tốc độ", value: "72 km/h", icon: "speed" },
      { label: "Thời gian bay", value: "45 phút", icon: "timer" },
      { label: "Camera", value: "5.4K ProRes", icon: "videocam" },
    ],
  },
  {
    id: 3,
    name: "AeroWork Pro",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAuBuwu7lklbv5OonB_WniV9anybPrmsiZdayjd8ucDjYAdydFDTuQvPWPBC-Tb-6K25gYrYSwbJ1ElgYYZZY7d7pULzj3ozcLVq180peeCzGnkHKq9E2ZS7q77gbjX3KbK4jqx0huCg7Km7jUfTQWjL1PrtXkAsIOrjvW5kufl00qkj3nr_F2mMvUHEzby_VgGIXWCfKutVJfV7L9cShsD4OYH9P2D8qbJDGxqSbk9ydTr9m0-edNfY4yKitPTOuCFBoHnUT5AjA",
    stats: [
      { label: "Tốc độ", value: "50 km/h", icon: "speed" },
      { label: "Thời gian bay", value: "55 phút", icon: "timer" },
      { label: "Camera", value: "Thermal / 20x Zoom", icon: "videocam" },
    ],
  },
]);

// 3. Các tính năng Học viện
const academyFeatures = [
  {
    title: "Giáo trình chuẩn",
    desc: "Hệ thống bài giảng được thiết kế bởi các chuyên gia hàng đầu trong ngành hàng không.",
    icon: "school",
  },
  {
    title: "Mô phỏng 3D",
    desc: "Luyện tập kỹ năng bay an toàn trong môi trường ảo trước khi chạm vào thiết bị thật.",
    icon: "water_loss",
    hasBar: true,
  },
  {
    title: "Cấp chứng chỉ",
    desc: "Hoàn thành khóa học và nhận chứng chỉ xác thực kỹ năng bay chuyên nghiệp.",
    icon: "workspace_premium",
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-background text-on-surface font-body selection:bg-primary/20"
  >
    <!-- <nav
      class="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100/50 font-headline tracking-tight"
    >
      <div class="text-xl font-extrabold text-slate-900 tracking-tighter">
        AeroEdu
      </div>

      <div class="hidden md:flex space-x-8 items-center">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          :class="[
            link.active
              ? 'text-slate-900 border-b-2 border-slate-900'
              : 'text-slate-500 hover:text-slate-900',
            'pb-1 transition-all text-sm font-semibold',
          ]"
        >
          {{ link.name }}
        </a>
      </div>

      <div class="flex items-center space-x-4">
        <button
          class="material-symbols-outlined text-slate-800 p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          notifications
        </button>
        <div
          class="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-slate-200"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhrPsrFWm9u0035kL9v9HssaitDNjAsPhdLjEl7vE8lwzWka49G9-iCh1fdFEG7OQWpJMzszuE9tM9fef2OSjXxFsu_yfUNQRo7K0-FxP6dhssHcR-rQ2y1VyC-WJddPATV6osrv1RaaqQAXjYDMrkpGj4WvvD5L76YhtT0NUGD9qaoLnaOQ8mk_G9T7BQYeY6JrKURNWQa2ZzBCk95IIwSX63LWD6TOpt_SPKc35vOy_LvVX9xOnv6eDQhz74Q4CkxX2rTQ-bQQ"
            alt="User"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav> -->

    <main class="pt-16">
      <section
        class="relative min-h-[90vh] flex items-center justify-center bg-white overflow-hidden"
      >
        <div
          class="container mx-auto px-8 grid md:grid-cols-2 gap-12 items-center"
        >
          <div class="z-10 animate-fade-in">
            <h1
              class="font-headline text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6"
            >
              Hệ sinh thái Drone<br /><span class="text-primary-dim"
                >thế hệ mới</span
              >
            </h1>
            <p
              class="text-lg text-on-surface-variant max-w-md mb-8 leading-relaxed"
            >
              Khám phá công nghệ bay không người lái tiên tiến nhất, kết hợp
              giữa hiệu suất cơ khí chính xác và trí tuệ nhân tạo đột phá.
            </p>
            <button
              class="bg-[#0F172A] text-white px-10 py-4 rounded-lg font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 group shadow-lg shadow-slate-200"
            >
              Khám phá ngay
              <span
                class="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                >arrow_forward</span
              >
            </button>
          </div>

          <div class="relative flex justify-center items-center">
            <div
              class="absolute -z-10 w-[120%] h-[120%] bg-gradient-to-tr from-primary-container/30 to-transparent rounded-full blur-[100px]"
            ></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACMmSf8ug0j83NUyAr1Ix8R-ukxDnf7fxxQ4unZ6-NSEIvcPYFFfsQm6Pp5bWxZKS0KRRRGQ70efr8SjhlM8KhI9cZGAkyHj2w1-kZFs0jWzuYCVaExz1gFy1U9Eu16mu4AGj6TaUoNEVPavReB1GwnaY7JaA4jiw0g5b-_AgWI39pXRYGJIWLi0kYXq_RDS7rg8VC0xxEdYaSPdI9lQMOGCO-e5raaS96SmfeZBkMQLSH36WIfPFvuSQSAs7fbZiLUiY0HU4YFA"
              alt="Hero Drone"
              class="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      <section class="py-24 bg-surface">
        <div class="container mx-auto px-8">
          <div
            class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
          >
            <div>
              <span
                class="text-tertiary font-bold tracking-[0.2em] uppercase text-[10px]"
                >Danh mục sản phẩm</span
              >
              <h2 class="font-headline text-4xl font-bold mt-2 text-slate-900">
                Các mẫu Drone tiêu biểu
              </h2>
            </div>
            <button
              class="text-sm font-bold text-slate-900 flex items-center gap-1 hover:gap-2 transition-all"
            >
              Tất cả sản phẩm
              <span class="material-symbols-outlined text-sm"> </span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="drone in products"
              :key="drone.id"
              class="bg-surface-container-lowest p-8 rounded-2xl transition-all border border-transparent hover:border-slate-200 hover:shadow-2xl group"
            >
              <div
                class="aspect-square mb-8 overflow-hidden rounded-xl bg-surface-container-low relative"
              >
                <img
                  :src="drone.image"
                  :alt="drone.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <h3 class="font-headline text-2xl font-bold mb-6 text-slate-900">
                {{ drone.name }}
              </h3>

              <div class="space-y-4 mb-8">
                <div
                  v-for="stat in drone.stats"
                  :key="stat.label"
                  class="flex items-center justify-between text-sm"
                >
                  <span class="text-on-surface-variant flex items-center gap-3">
                    <span
                      class="material-symbols-outlined text-lg opacity-70"
                      >{{ stat.icon }}</span
                    >
                    {{ stat.label }}
                  </span>
                  <span class="font-bold text-slate-900">{{ stat.value }}</span>
                </div>
              </div>

              <button
                class="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-primary transition-all shadow-md"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-white relative overflow-hidden">
        <div class="container mx-auto px-8 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <span
              class="text-tertiary font-bold tracking-[0.2em] uppercase text-[10px]"
              >Học viện Drone</span
            >
            <h2
              class="font-headline text-4xl md:text-5xl font-bold mt-4 mb-8 text-slate-900 leading-tight"
            >
              Đào tạo phi công chuyên nghiệp
            </h2>
            <p class="text-lg text-on-surface-variant leading-relaxed mb-16">
              Nền tảng AeroEdu cung cấp lộ trình học tập toàn diện từ lý thuyết
              bay, mô phỏng 3D đến thực hành thực tế. Chúng tôi giúp bạn làm chủ
              bầu trời.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              <div
                v-for="feature in academyFeatures"
                :key="feature.title"
                class="flex flex-col gap-4 group"
              >
                <div
                  class="w-14 h-14 bg-tertiary-container/20 rounded-2xl flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-all duration-300"
                >
                  <span class="material-symbols-outlined text-3xl">{{
                    feature.icon
                  }}</span>
                </div>
                <div
                  v-if="feature.hasBar"
                  class="h-1.5 w-12 bg-tertiary-container rounded-full"
                ></div>
                <h4 class="font-headline font-bold text-xl text-slate-900">
                  {{ feature.title }}
                </h4>
                <p class="text-sm text-on-surface-variant leading-relaxed">
                  {{ feature.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="w-full py-16 border-t border-slate-100 bg-white">
      <div class="container mx-auto px-8 flex flex-col items-center">
        <div class="flex space-x-12 mb-8">
          <a
            v-for="item in ['Điều khoản', 'Bảo mật', 'Liên hệ']"
            :key="item"
            href="#"
            class="text-slate-400 hover:text-primary font-bold text-[10px] uppercase tracking-widest transition-colors"
          >
            {{ item }}
          </a>
        </div>
        <p
          class="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          © 2026 AeroEdu. Một phần của hệ sinh thái Aeronautical Intelligence.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

/* 1. Thiết lập font chuẩn cho các class đã dùng */
.font-headline {
  font-family: "Manrope", sans-serif;
}
.font-body {
  font-family: "Inter", sans-serif;
}

/* 2. Hiệu ứng mờ nền chuẩn Tailwind v4 */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 3. Animation đơn giản cho Hero */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

/* 4. Tùy chỉnh thanh cuộn ẩn cho showcase */
.scroll-hide::-webkit-scrollbar {
  display: none;
}
</style>
