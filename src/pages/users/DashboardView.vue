<script setup>
import { ref } from "vue";
import {
  Plane,
  Navigation,
  Database,
  ShieldCheck,
  ChevronRight,
  Activity,
  Wind,
  Signal,
  AlertTriangle,
  Radio,
  Gauge,
} from "lucide-vue-next";

// Quản lý trạng thái hệ thống (Có thể kết nối API sau này)
const systemStatus = ref({
  windSpeed: "8.2 km/h",
  gpsSignal: "Mạnh (12 Satellites)",
  connection: "Ổn định",
  activeDrones: 3,
});

// Cấu trúc dữ liệu cho các thẻ chức năng (Quick Actions)
const uavOperations = [
  {
    id: "fleet",
    label: "PHI ĐỘI",
    title: "Danh sách Drone",
    desc: "Quản lý thiết bị, kiểm tra tình trạng pin, firmware và mức độ sẵn sàng.",
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    icon: Plane,
  },
  {
    id: "mission",
    label: "NHIỆM VỤ",
    title: "Lập trình bay",
    desc: "Thiết lập Waypoints, kịch bản bay tự động và các điểm hạ cánh khẩn cấp.",
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
    icon: Navigation,
  },
  {
    id: "telemetry",
    label: "DỮ LIỆU",
    title: "Telemetry & Media",
    desc: "Truy xuất nhật ký hành trình, biểu đồ độ cao và dữ liệu cảm biến.",
    color: "text-purple-600",
    bg: "bg-purple-50/50",
    icon: Activity,
  },
  {
    id: "safety",
    label: "AN TOÀN",
    title: "Vùng cấm bay (NFZ)",
    desc: "Cập nhật bản đồ khu vực hạn chế và các quy định an toàn hàng không.",
    color: "text-orange-600",
    bg: "bg-orange-50/50",
    icon: ShieldCheck,
  },
];
</script>

<template>
  <div
    class="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
  >
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2
          class="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none"
        >
          Bảng điều khiển <span class="text-teal-500">GCS</span>
        </h2>
        <p class="text-slate-500 mt-3 font-medium flex items-center gap-2">
          Hệ thống SkyLink Flight Center
          <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
          Phiên bản 2.1.0
        </p>
      </div>

      <div
        class="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm"
      >
        <div class="flex flex-col">
          <span
            class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
            >Tín hiệu GPS</span
          >
          <span
            class="text-xs font-bold text-slate-700 flex items-center gap-1.5"
          >
            <Signal class="w-3 h-3 text-emerald-500" />
            {{ systemStatus.gpsSignal }}
          </span>
        </div>
        <div class="h-8 w-px bg-slate-100"></div>
        <div class="flex flex-col">
          <span
            class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
            >Tình trạng link</span
          >
          <span
            class="text-xs font-bold text-emerald-600 flex items-center gap-1.5"
          >
            <div
              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            ></div>
            {{ systemStatus.connection }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        class="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group"
      >
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-6">
            <div class="p-2 bg-slate-900 text-teal-400 rounded-lg">
              <Radio class="w-5 h-5" />
            </div>
            <span
              class="text-xs font-black text-slate-800 uppercase tracking-widest"
              >Hệ thống trực tuyến</span
            >
          </div>

          <h3 class="text-2xl font-black text-slate-900 mb-4 leading-tight">
            Chào mừng Trạm trưởng Phach, <br />
            Hệ thống đã sẵn sàng cất cánh.
          </h3>

          <p
            class="text-slate-500 leading-relaxed text-sm max-w-lg font-medium mb-8"
          >
            Hiện tại có
            <span
              class="text-slate-900 font-bold underline decoration-teal-500 decoration-2 underline-offset-4"
              >{{ systemStatus.activeDrones }} thiết bị</span
            >
            đang ở trạng thái chờ lệnh. Mọi thông số Telemetry đang được đồng bộ
            hóa với vệ tinh.
          </p>

          <div class="flex flex-wrap gap-3">
            <button
              class="px-6 py-3 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
            >
              Khởi tạo nhiệm vụ mới
            </button>
            <button
              class="px-6 py-3 bg-white text-slate-600 rounded-xl text-[11px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Báo cáo vận hành
            </button>
          </div>
        </div>
        <Plane
          class="absolute -right-16 -bottom-16 w-72 h-72 text-slate-50/80 -rotate-12 pointer-events-none group-hover:text-teal-50 transition-colors duration-700"
        />
      </div>

      <div
        class="bg-slate-900 p-10 rounded-[3rem] text-white relative shadow-2xl shadow-slate-200 overflow-hidden group"
      >
        <div class="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span
                class="text-[10px] font-black tracking-[0.3em] text-teal-400 uppercase"
                >An toàn bay</span
              >
              <AlertTriangle class="w-5 h-5 text-orange-400 animate-bounce" />
            </div>

            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <Wind class="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase">
                    Tốc độ gió
                  </p>
                  <p class="text-xl font-black">{{ systemStatus.windSpeed }}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <Gauge class="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase">
                    Áp suất khí quyển
                  </p>
                  <p class="text-xl font-black">1012 hPa</p>
                </div>
              </div>
            </div>
          </div>

          <p
            class="text-[11px] font-medium text-slate-400 italic mt-8 border-l-2 border-teal-500 pl-4"
          >
            "Điều kiện khí tượng lý tưởng cho các nhiệm vụ bay tầm xa (BVLOS)."
          </p>
        </div>
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[80px]"
        ></div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="op in uavOperations"
        :key="op.id"
        class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[250px]"
      >
        <div>
          <div
            :class="[
              op.bg,
              op.color,
              'w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500',
            ]"
          >
            <component :is="op.icon" class="w-8 h-8" />
          </div>

          <span
            class="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase"
            >{{ op.label }}</span
          >
          <h4
            class="text-slate-900 font-black text-xl mt-1 mb-4 leading-tight group-hover:text-teal-600 transition-colors"
          >
            {{ op.title }}
          </h4>
          <p class="text-slate-400 text-xs leading-relaxed font-medium">
            {{ op.desc }}
          </p>
        </div>

        <button
          :class="[
            op.color,
            'flex items-center gap-2 text-[11px] font-black uppercase tracking-widest group-hover:gap-4 transition-all ',
          ]"
        >
          Mở trạm <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hiệu ứng đổ bóng nhẹ cho chữ */
.text-shadow-glow {
  text-shadow: 0 0 20px rgba(45, 212, 191, 0.4);
}

/* Bo tròn mượt mà cho Chrome/Safari */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
