<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800">
    <header
      class="flex justify-center gap-8 py-6 text-sm font-medium text-slate-600 bg-white shadow-sm"
    >
      <a href="#" class="hover:text-blue-600">Trang chủ</a>
      <a href="#" class="hover:text-blue-600">Danh mục UAV</a>
      <a href="#" class="hover:text-blue-600 text-blue-800 font-semibold"
        >Tài nguyên học tập</a
      >
      <a href="#" class="hover:text-blue-600">Hồ sơ</a>
    </header>

    <main class="max-w-[1400px] mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
          UAV Unified Detail Dashboard
        </h1>
        <p class="text-slate-600 text-lg">
          All-in-one UAV technical detail dashboard for educational platforms.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-3 flex flex-col gap-6">
          <div
            class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
          >
            <h2 class="text-lg font-bold mb-4">Ảnh Tĩnh Drone</h2>
            <div
              class="bg-slate-100 rounded-xl overflow-hidden aspect-video flex items-center justify-center"
            >
              <img
                src="https://placehold.co/600x400/e2e8f0/475569?text=Drone+Main+Image"
                alt="Drone Main"
                class="object-cover w-full h-full"
              />
            </div>
          </div>

          <div
            class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1"
          >
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-bold">Thư viện ảnh</h2>
              <div class="flex gap-2">
                <button class="p-1 bg-slate-100 hover:bg-slate-200 rounded-md">
                  <ChevronLeftIcon class="w-4 h-4" />
                </button>
                <button class="p-1 bg-slate-100 hover:bg-slate-200 rounded-md">
                  <ChevronRightIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(img, index) in gallery"
                :key="index"
                class="aspect-square bg-slate-100 rounded-lg overflow-hidden border-2 cursor-pointer"
                :class="
                  index === 0
                    ? 'border-blue-800'
                    : 'border-transparent hover:border-slate-300'
                "
              >
                <img
                  :src="img"
                  alt="Thumbnail"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="lg:col-span-6 bg-[#ebf0f7] rounded-3xl p-6 shadow-inner relative flex flex-col border border-slate-200"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-slate-800">
              Mô hình 3D Tương tác (Xoay 360° & Kiểm tra linh kiện)
            </h2>
            <button
              class="flex items-center gap-2 px-3 py-1.5 bg-white text-sm font-medium rounded-full shadow-sm hover:bg-slate-50"
            >
              <RefreshCcwIcon class="w-4 h-4" /> Reset View
            </button>
          </div>

          <div
            class="flex-1 bg-gradient-to-b from-transparent to-slate-200/50 rounded-2xl relative min-h-[400px] flex items-center justify-center"
          >
            <img
              src="https://placehold.co/800x600/transparent/475569?text=Interactive+3D+Canvas\n(Three.js/WebGL)"
              alt="3D Model"
              class="object-contain max-h-full opacity-80"
            />

            <div
              class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white/80 backdrop-blur rounded-full p-2 shadow-sm"
            >
              <button class="p-2 hover:bg-slate-200 rounded-full">
                <MaximizeIcon class="w-5 h-5 text-slate-700" />
              </button>
              <div class="w-full h-px bg-slate-300 my-1"></div>
              <button class="p-2 hover:bg-slate-200 rounded-full">
                <PlusIcon class="w-5 h-5 text-slate-700" />
              </button>
              <button class="p-2 hover:bg-slate-200 rounded-full">
                <MinusIcon class="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3 flex flex-col gap-6">
          <div
            class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h2 class="text-lg font-bold mb-5">Thông số Kỹ thuật</h2>
            <div class="grid grid-cols-2 gap-y-6 gap-x-2">
              <div
                v-for="spec in technicalSpecs"
                :key="spec.label"
                class="flex gap-3 items-start"
              >
                <div class="p-2 bg-[#1a2b4c] text-white rounded-lg shrink-0">
                  <component :is="spec.icon" class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs font-semibold text-slate-900 leading-tight">
                    {{ spec.label }}
                  </p>
                  <p class="text-xs text-slate-500 mt-1">{{ spec.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 flex flex-col"
          >
            <h2 class="text-lg font-bold mb-3">Mô tả & Ứng dụng (Giáo dục)</h2>
            <p
              class="text-sm text-slate-600 leading-relaxed mb-6 flex-1 text-justify"
            >
              Chiếc drone này được thiết kế tối ưu cho mục đích học tập và
              nghiên cứu, trang bị các cảm biến hiện đại giúp sinh viên tìm hiểu
              về nguyên lý hoạt động của UAV, kỹ thuật điều khiển bay, và ứng
              dụng trong các lĩnh vực như khảo sát địa hình, nông nghiệp thông
              minh, và giám sát môi trường. Hệ thống cho phép lập trình đường
              bay tự động và tích hợp với các nền tảng phân tích dữ liệu giáo
              dục...
            </p>
            <button
              class="w-full py-3.5 bg-gradient-to-r from-[#1a2b4c] to-[#2a4374] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Xem Bài giảng
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-6 mt-6 text-sm text-slate-500">
        <a href="#" class="hover:text-slate-800">Liên hệ Hỗ trợ</a>
        <a href="#" class="hover:text-slate-800">Tài liệu Kỹ thuật PDF</a>
      </div>
    </main>
  </div>
</template>

<script setup>
// Sử dụng thư viện icon Lucide (npm install lucide-vue-next)
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshCcwIcon,
  MaximizeIcon,
  PlusIcon,
  MinusIcon,
  BoxIcon,
  BatteryIcon,
  CameraIcon,
  TargetIcon,
  ClockIcon,
  GaugeIcon,
  MapPinIcon,
  WeightIcon,
} from "lucide-vue-next";

// Dữ liệu mock cho thông số kỹ thuật
const technicalSpecs = [
  { icon: BoxIcon, label: "Loại Drone", value: "Quadcopter Đa Năng" },
  { icon: WeightIcon, label: "Trọng lượng", value: "1.5 kg" },
  { icon: TargetIcon, label: "Kích thước (Mở rộng)", value: "450x450x200 mm" },
  {
    icon: ClockIcon,
    label: "Thời gian bay",
    value: "30 phút (tải trọng tiêu chuẩn)",
  },
  { icon: MapPinIcon, label: "Phạm vi hoạt động", value: "5 km" },
  { icon: TargetIcon, label: "Độ cao bay tối đa", value: "500 m" },
  { icon: CameraIcon, label: "Camera", value: "4K UHD, 12MP, zoom 4x" },
  { icon: TargetIcon, label: "Hệ thống định vị", value: "GPS/GLONASS" },
  { icon: GaugeIcon, label: "Tốc độ tối đa", value: "60 km/h" },
  { icon: BatteryIcon, label: "Dung lượng pin", value: "4500 mAh" },
];

// Dữ liệu mock cho gallery
const gallery = [
  "https://placehold.co/300x300/e2e8f0/475569?text=Img+1",
  "https://placehold.co/300x300/e2e8f0/475569?text=Img+2",
  "https://placehold.co/300x300/e2e8f0/475569?text=Img+3",
  "https://placehold.co/300x300/e2e8f0/475569?text=Img+4",
  "https://placehold.co/300x300/e2e8f0/475569?text=Img+5",
  "https://placehold.co/300x300/e2e8f0/475569?text=Img+6",
];
</script>
