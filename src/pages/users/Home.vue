<template>
  <main class="home-page min-h-screen bg-[oklch(0.985_0.006_250)] text-slate-900">
    <section class="hero-shell border-b border-slate-200/70">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-14">
        <div class="motion-rise flex flex-col justify-center">
          <div class="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            <GraduationCap class="h-3.5 w-3.5" />
            Trung tâm bài giảng UAV
          </div>

          <div class="mt-6 max-w-3xl">
            <p class="text-sm font-semibold text-slate-500">SkyLinkEdu Learning Hub</p>
            <h1 class="mt-3 max-w-2xl text-4xl font-extrabold  text-slate-950 md:text-5xl">
              Học UAV theo lộ trình rõ ràng, thực hành ngay trong từng bài.
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Tập trung vào bài giảng, mô phỏng, checklist vận hành và tài liệu kỹ thuật. Mỗi module được chia nhỏ để người học biết đang học gì, còn thiếu gì và bước tiếp theo là gì.
            </p>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <router-link
              to="/test"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-50 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <BookOpenCheck class="h-4 w-4" />
              Vào bài đang học
            </router-link>
            <router-link
              to="/simulation"
              class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-[oklch(0.998_0.004_250)] px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <MonitorPlay class="h-4 w-4" />
              Mở lab mô phỏng
            </router-link>
          </div>

          <div class="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div
              v-for="(stat, index) in learningStats"
              :key="stat.label"
              class="stat-card rounded-2xl border border-slate-200 bg-[oklch(0.998_0.004_250)] p-4"
              :style="{ '--stat-delay': `${index * 110}ms` }"
            >
              <p class="stat-value text-2xl font-extrabold text-slate-950">{{ stat.value }}</p>
              <p class="relative z-10 mt-1 text-sm leading-5 text-slate-500">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <aside class="motion-rise motion-delay-1 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[oklch(0.998_0.004_250)] shadow-[0_20px_54px_oklch(0.68_0.04_250_/_0.12)]">
          <div class="relative min-h-[220px] overflow-hidden bg-blue-50">
            <img
              src="/img/hero-mavic.webp"
              alt="Drone UAV trong bài giảng mô phỏng"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.98_0.01_245_/_0.04),oklch(0.22_0.035_250_/_0.56))]"></div>
            <div class="absolute left-5 top-5 flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-2 rounded-full bg-[oklch(0.998_0.004_250_/_0.94)] px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                Học thử
              </span>
              <span class="rounded-full bg-[oklch(0.998_0.004_250_/_0.94)] px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                Không cần đăng nhập
              </span>
            </div>
            <div class="absolute bottom-5 left-5 right-5">
              <span class="rounded-full bg-[oklch(0.58_0.18_255)] px-3 py-1 text-xs font-semibold text-slate-50">
                SkyLinkEdu Preview
              </span>
            </div>
          </div>

          <div class="p-5 lg:p-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="text-sm font-semibold text-blue-700">Dành cho người mới</p>
                <h2 class="mt-2 text-2xl font-bold leading-tight text-slate-950">Khám phá lộ trình học UAV</h2>
              </div>
              <router-link
                to="/course"
                class="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[oklch(0.58_0.18_255)] px-4 py-2.5 text-sm font-semibold text-slate-50 transition duration-200 hover:-translate-y-0.5 hover:bg-[oklch(0.52_0.17_255)] focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <BookOpenCheck class="h-4 w-4" />
                Xem khóa học
              </router-link>
            </div>

            <p class="mt-4 max-w-xl text-sm leading-6 text-slate-600">
              Xem trước cách SkyLink chia bài học, lab mô phỏng và checklist thực hành trước khi tạo tài khoản.
            </p>

            <div class="mt-5 flex flex-col gap-3 sm:flex-row">
              <router-link
                to="/simulation"
                class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-[oklch(0.985_0.006_250)] px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <MonitorPlay class="h-4 w-4" />
                Thử mô phỏng
              </router-link>
              <router-link
                to="/register"
                class="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent px-4 py-2.5 text-sm font-semibold text-blue-700 transition duration-200 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <BadgeCheck class="h-4 w-4" />
                Tạo tài khoản
              </router-link>
            </div>

            <div class="mt-5 space-y-4 border-t border-slate-200 pt-5">
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                  <BookOpen class="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-900">Học theo module rõ ràng</p>
                  <p class="mt-1 text-sm leading-6 text-slate-500">Bắt đầu từ an toàn bay, cảm biến, bản đồ đến nhiệm vụ tự động.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50">
                  <MonitorPlay class="h-5 w-5 text-emerald-700" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-900">Có lab để thử ngay</p>
                  <p class="mt-1 text-sm leading-6 text-slate-500">Quan sát waypoint, pin và telemetry mẫu trong môi trường mô phỏng.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
                  <BadgeCheck class="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-900">Đăng nhập khi cần lưu tiến độ</p>
                  <p class="mt-1 text-sm leading-6 text-slate-500">Tài khoản giúp lưu bài đã học, checklist và tài liệu cần xem lại.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold text-blue-700">Lộ trình học mở</p>
          <h2 class="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-slate-950">
            Bắt đầu nhẹ, hiểu chắc, rồi mới vào nhiệm vụ bay.
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Người mới có thể xem trước từng chặng học và chọn module phù hợp trước khi đăng nhập để lưu tiến độ.
          </p>
        </div>
        <router-link
          to="/course"
          class="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-300 bg-[oklch(0.998_0.004_250)] px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Xem tất cả module
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div class="motion-rise motion-delay-2 rounded-[1.75rem] border border-slate-200 bg-[oklch(0.998_0.004_250)] p-6">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Route class="h-5 w-5" />
            </div>
            <div>
              <p class="text-base font-bold text-slate-950">4 chặng học chính</p>
              <p class="mt-1 text-sm text-slate-500">Đi theo thứ tự hoặc chọn chặng cần ôn trước.</p>
            </div>
          </div>

          <div class="mt-7">
            <div
              v-for="(step, index) in roadmap"
              :key="step.title"
              class="grid grid-cols-[auto_1fr] gap-4 pb-6 last:pb-0"
            >
              <div class="relative flex justify-center">
                <div class="flex h-9 w-9 items-center justify-center rounded-2xl bg-[oklch(0.965_0.014_250)] text-sm font-bold text-blue-700 ring-1 ring-blue-100">
                  {{ index + 1 }}
                </div>
                <div
                  v-if="index < roadmap.length - 1"
                  class="absolute top-11 h-[calc(100%-2rem)] w-px bg-slate-200"
                ></div>
              </div>
              <div>
                <h3 class="font-bold text-slate-900">{{ step.title }}</h3>
                <p class="mt-1 text-sm leading-6 text-slate-600">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="motion-rise grid gap-4">
          <router-link
            v-for="module in modules"
            :key="module.title"
            :to="module.href"
            class="group grid gap-4 rounded-[1.35rem] border border-slate-200 bg-[oklch(0.998_0.004_250)] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:grid-cols-[auto_1fr]"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" :class="module.iconBg">
              <component :is="module.icon" class="h-5 w-5" :class="module.iconColor" />
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span class="text-blue-700">{{ module.kicker }}</span>
                <span class="text-slate-300">/</span>
                <span class="text-slate-500">{{ module.lessons }} bài</span>
              </div>
              <h3 class="mt-2 font-bold text-slate-950">{{ module.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-slate-600">{{ module.desc }}</p>
              <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span class="text-sm font-medium text-slate-500">{{ module.level }}</span>
                <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition group-hover:gap-2">
                  {{ module.cta }}
                  <ArrowRight class="h-4 w-4" />
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="border-y border-slate-200 bg-[oklch(0.958_0.012_250)]">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold text-blue-700">Bài giảng nổi bật</p>
              <h2 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">Nội dung khóa học.</h2>
            </div>
            <router-link
              to="/course"
              class="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-300 bg-[oklch(0.998_0.004_250)] px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Tất cả khóa học
              <ArrowRight class="h-4 w-4" />
            </router-link>
          </div>

          <div class="mt-7 grid gap-4">
            <article
              v-for="lesson in featuredLessons"
              :key="lesson.title"
              class="group grid gap-4 rounded-[1.5rem] border border-slate-200 bg-[oklch(0.998_0.004_250)] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 md:grid-cols-[160px_1fr_auto]"
            >
              <img
                :src="lesson.image"
                :alt="lesson.alt"
                class="h-36 w-full rounded-[1.15rem] object-cover md:h-full"
              />
              <div class="flex flex-col justify-center">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{{ lesson.type }}</span>
                  <span class="text-xs font-medium text-slate-500">{{ lesson.duration }}</span>
                </div>
                <h3 class="mt-3 text-lg font-bold text-slate-950">{{ lesson.title }}</h3>
                <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{{ lesson.desc }}</p>
              </div>
              <div class="flex items-center md:justify-end">
                <button
                  class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-slate-50 transition duration-200 group-hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  aria-label="Mở bài giảng"
                >
                  <ArrowRight class="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>
        </div>

        <aside class="rounded-[1.75rem] border border-slate-200 bg-[oklch(0.998_0.004_250)] p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-blue-700">Tài liệu nhanh</p>
              <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950">Chuẩn bị trước buổi thực hành</h2>
            </div>
            <FileText class="h-6 w-6 text-slate-400" />
          </div>

          <div class="mt-6 space-y-3">
            <a
              v-for="doc in quickDocs"
              :key="doc.title"
              href="#"
              class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[oklch(0.985_0.006_250)] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" :class="doc.color">
                <component :is="doc.icon" class="h-5 w-5" />
              </div>
              <div class="min-w-0">
                <h3 class="truncate text-sm font-bold text-slate-900">{{ doc.title }}</h3>
                <p class="mt-1 text-xs text-slate-500">{{ doc.meta }}</p>
              </div>
              <ArrowRight class="ml-auto h-4 w-4 shrink-0 text-slate-400" />
            </a>
          </div>
        </aside>
      </div>
    </section>

    <section class="overflow-hidden border-y border-slate-200 bg-[oklch(0.958_0.012_250)]">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold text-blue-700">Lab mô phỏng mở</p>
            <h2 class="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-slate-950">
              Xem drone trong không gian 3D trước khi vào bài thực hành.
            </h2>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Xoay mô hình, quan sát điểm chú thích và chọn bài lab phù hợp. Người mới vẫn có thể thử nhanh trước khi đăng nhập.
            </p>
          </div>
          <router-link
            to="/simulation"
            class="inline-flex w-fit items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-50 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <MonitorPlay class="h-4 w-4" />
            Mở lab đầy đủ
          </router-link>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div class="motion-rise relative min-h-[390px] overflow-hidden rounded-[1.75rem] bg-slate-950 text-slate-50 shadow-[0_22px_60px_oklch(0.44_0.05_250_/_0.18)]">
            <Uav3DViewer
              class="uav-home-viewer"
              :model-src="uavPreviewModel"
              :custom-hotspots="uavPreviewHotspots"
            />
            <div class="pointer-events-none absolute left-5 top-5 rounded-full bg-slate-50/10 px-3 py-1.5 text-xs font-semibold text-blue-100 ring-1 ring-slate-50/15">
              Preview tương tác
            </div>
            <div class="pointer-events-none absolute bottom-5 left-5 right-5 flex flex-col gap-3 rounded-[1.25rem] bg-slate-950/78 p-4 ring-1 ring-slate-50/10 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-sm font-semibold text-slate-50">DJI Flip 3D model</p>
                <p class="mt-1 text-xs leading-5 text-slate-300">Kéo để xoay, cuộn để phóng to, chọn marker để xem chú thích.</p>
              </div>
              <span class="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/25">
                WebGL ready
              </span>
            </div>
          </div>

          <div class="grid gap-4">
            <router-link
              v-for="lab in labs"
              :key="lab.title"
              to="/simulation"
              class="group flex gap-4 rounded-[1.5rem] border border-slate-200 bg-[oklch(0.998_0.004_250)] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" :class="lab.iconBg">
                <component :is="lab.icon" class="h-5 w-5" :class="lab.iconColor" />
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-bold text-slate-950">{{ lab.title }}</h3>
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    <Clock3 class="h-3.5 w-3.5" />
                    {{ lab.time }}
                  </span>
                </div>
                <p class="mt-2 text-sm leading-6 text-slate-600">{{ lab.desc }}</p>
                <span class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition group-hover:gap-2">
                  Mở bài lab
                  <ArrowRight class="h-4 w-4" />
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BookOpenCheck,
  ChartNoAxesColumnIncreasing,
  Clock3,
  ClipboardCheck,
  Compass,
  FileText,
  Gauge,
  GraduationCap,
  Map,
  MapPinned,
  MonitorPlay,
  Radio,
  Route,
  ShieldCheck,
  Wrench,
} from "lucide-vue-next";

const Uav3DViewer = defineAsyncComponent(() => import("@/components/Uav3DViewer.vue"));

const learningStats = [
  { value: "24", label: "bài giảng có cấu trúc" },
  { value: "8", label: "lab mô phỏng UAV" },
  { value: "12h", label: "thực hành có hướng dẫn" },
];

const uavPreviewModel = "/models/DJI Flip.glb";

const uavPreviewHotspots = [
  {
    id: 1,
    pos: { x: 0, y: 0.11, z: 0.6 },
    title: "Camera và gimbal",
    desc: "Quan sát cụm camera, nơi người học làm quen với góc chụp, chống rung và dữ liệu hình ảnh.",
  },
  {
    id: 2,
    pos: { x: 0.01, y: 0.34, z: 0.48 },
    title: "Cảm biến tránh vật cản",
    desc: "Điểm minh họa cho bài học về nhận diện môi trường, giữ khoảng cách an toàn và bay trong khu vực hẹp.",
  },
  {
    id: 3,
    pos: { x: -0.43, y: 0.21, z: 0.65 },
    title: "Động cơ và cánh quạt",
    desc: "Khu vực dùng để giải thích lực đẩy, hướng quay cánh quạt và kiểm tra trước khi cất cánh.",
  },
  {
    id: 4,
    pos: { x: 0.19, y: 0.42, z: -0.13 },
    title: "Pin thông minh",
    desc: "Theo dõi năng lượng, thời gian bay còn lại và điều kiện kích hoạt quay về tự động.",
  },
];

const roadmap = [
  {
    title: "Nền tảng bay và an toàn",
    desc: "Hiểu khung pháp lý, giới hạn không vực, pin, tín hiệu và checklist trước khi cất cánh.",
  },
  {
    title: "Cấu tạo hệ thống UAV",
    desc: "Đọc sơ đồ phần cứng, cảm biến, IMU, GNSS, payload và luồng dữ liệu điều khiển.",
  },
  {
    title: "Nhiệm vụ tự động",
    desc: "Thiết kế waypoint, thiết lập độ cao, tốc độ, vùng khảo sát và phương án quay về.",
  },
  {
    title: "Phân tích dữ liệu sau bay",
    desc: "Tổng hợp log, ảnh khảo sát, bản đồ 3D và báo cáo sai số nhiệm vụ.",
  },
];

const modules = [
  {
    icon: Compass,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    kicker: "Làm quen",
    title: "UAV bay được nhờ những gì?",
    desc: "Một vòng ngắn về lực nâng, hướng bay, tọa độ và những thuật ngữ người mới hay gặp.",
    level: "Nên xem đầu tiên",
    lessons: 6,
    cta: "Bắt đầu nhẹ",
    href: "/course",
  },
  {
    icon: ClipboardCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    kicker: "Trước khi bay",
    title: "Checklist an toàn dễ nhớ",
    desc: "Kiểm tra pin, cánh quạt, tín hiệu và vùng bay bằng quy trình đủ ngắn để dùng được ngoài sân.",
    level: "Thực hành cơ bản",
    lessons: 5,
    cta: "Xem quy trình",
    href: "/course",
  },
  {
    icon: MapPinned,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-700",
    kicker: "Nhiệm vụ",
    title: "Lập tuyến bay trên bản đồ",
    desc: "Đặt waypoint, chọn độ cao, kiểm tra vùng phủ và chuẩn bị phương án quay về khi có sự cố.",
    level: "Ứng dụng",
    lessons: 5,
    cta: "Mở ví dụ",
    href: "/simulation",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
    kicker: "Sau chuyến bay",
    title: "Đọc log và hiểu sai số",
    desc: "Nhìn vào pin, độ cao, GNSS và sai lệch quỹ đạo để biết chuyến bay có đáng tin hay không.",
    level: "Dành cho lab",
    lessons: 4,
    cta: "Xem dữ liệu mẫu",
    href: "/test",
  },
];

const featuredLessons = [
  {
    type: "Video + quiz",
    duration: "18 phút",
    title: "Đọc checklist an toàn trước chuyến bay",
    desc: "Một quy trình ngắn để kiểm tra pin, propeller, tín hiệu, vùng bay và phương án hạ cánh khẩn cấp.",
    image: "/img/Classification.jpg",
    alt: "Bài giảng phân loại và an toàn UAV",
  },
  {
    type: "Interactive lab",
    duration: "32 phút",
    title: "Thiết kế nhiệm vụ khảo sát bằng waypoint",
    desc: "Kéo thả tuyến bay, kiểm tra độ phủ ảnh, đặt giới hạn độ cao và chạy thử mô phỏng trong trình duyệt.",
    image: "/img/drones/Mavic-3.webp",
    alt: "Drone phục vụ bài lab waypoint",
  },
  {
    type: "Tài liệu kỹ thuật",
    duration: "12 phút",
    title: "Hiệu chỉnh IMU và la bàn đúng cách",
    desc: "Giải thích lỗi thường gặp khi hiệu chỉnh cảm biến và cách nhận biết dữ liệu telemetry bất thường.",
    image: "/img/drones/DJI Air.webp",
    alt: "Drone dùng trong bài học hiệu chỉnh cảm biến",
  },
];

const quickDocs = [
  {
    icon: ShieldCheck,
    title: "Checklist bay an toàn",
    meta: "PDF, 6 trang",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: BadgeCheck,
    title: "Chuẩn đánh giá module",
    meta: "Rubric, cập nhật mới",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Wrench,
    title: "Bảng lỗi cảm biến thường gặp",
    meta: "Tài liệu tra cứu nhanh",
    color: "bg-amber-100 text-amber-700",
  },
];

const labs = [
  {
    icon: MonitorPlay,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    title: "Mô phỏng quỹ đạo",
    desc: "Chạy thử tuyến bay, quan sát sai số, pin, độ cao và phản ứng khi tín hiệu yếu.",
    time: "25 phút",
  },
  {
    icon: Gauge,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    title: "Đọc telemetry",
    desc: "Phân tích tốc độ, độ cao, pin, GNSS và cảnh báo từ log sau mỗi nhiệm vụ.",
    time: "16 phút",
  },
  {
    icon: Radio,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-700",
    title: "Mất tín hiệu",
    desc: "Thiết lập failsafe, điểm quay về và kịch bản xử lý khi kết nối bị gián đoạn.",
    time: "20 phút",
  },
  {
    icon: Map,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
    title: "Khảo sát địa hình",
    desc: "Tạo tuyến bay phủ ảnh, kiểm tra GSD và chuẩn bị dữ liệu cho xử lý bản đồ.",
    time: "28 phút",
  },
];
</script>

<style scoped>
.home-page {
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    system-ui,
    sans-serif;
}

.hero-shell {
  background:
    linear-gradient(135deg, oklch(0.998 0.004 250), oklch(0.966 0.012 250)),
    radial-gradient(circle at 20% 20%, oklch(0.92 0.045 240 / 0.45), transparent 34%);
}

.motion-rise {
  animation: rise-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.motion-delay-1 {
  animation-delay: 80ms;
}

.motion-delay-2 {
  animation-delay: 130ms;
}

.stat-card {
  --stat-delay: 0ms;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  animation: stat-enter 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--stat-delay);
  transition:
    transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 200ms ease,
    box-shadow 200ms ease;
}

.stat-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg, oklch(0.72 0.11 235 / 0.14), transparent 52%, oklch(0.78 0.13 150 / 0.12));
  opacity: 0;
  transition: opacity 200ms ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: oklch(0.82 0.07 245);
  box-shadow: 0 16px 36px oklch(0.65 0.04 250 / 0.14);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-value {
  position: relative;
  z-index: 1;
  animation: stat-value-pop 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--stat-delay) + 130ms);
}

.uav-home-viewer.viewer-container {
  height: 520px;
  min-height: 390px;
  border-radius: 1.75rem;
}

.uav-home-viewer :deep(.ui-panel-bottom) {
  display: none;
}

.uav-home-viewer :deep(.hotspot-detail-card) {
  bottom: 5rem;
  left: 1.25rem;
  right: 1.25rem;
  top: auto;
  width: auto;
  max-width: 28rem;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stat-enter {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes stat-value-pop {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .motion-rise,
  .stat-card,
  .stat-value {
    animation: none;
  }

  .stat-card:hover {
    transform: none;
  }
}
</style>
