<template>
  <div class="min-h-screen bg-slate-50/50 pb-10">
    <header
      class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="p-2 bg-slate-900 rounded-lg text-white shadow-lg shadow-slate-200"
          >
            <LayoutDashboard :size="20" />
          </div>
          <h1
            class="text-lg font-black text-slate-900 uppercase tracking-tight"
          >
            UAV Control Center
          </h1>
        </div>
        <div class="flex gap-3">
          <router-link
            to="/admin/drones/add"
            class="px-4 py-2 bg-teal-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all flex items-center gap-2"
          >
            <Plus :size="14" /> Thêm UAV
          </router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm"
        >
          <p
            class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1"
          >
            {{ stat.label }}
          </p>
          <div class="flex items-end justify-between">
            <h2 class="text-3xl font-black text-slate-900">{{ stat.value }}</h2>
            <div :class="`p-2 rounded-lg ${stat.bgColor} ${stat.textColor}`">
              <component :is="stat.icon" :size="18" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8 space-y-6">
          <section
            class="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm"
          >
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3
                  class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
                >
                  <Activity :size="16" class="text-teal-500" /> Hiệu suất bay
                  trong tuần
                </h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase mt-1">
                  Tổng giờ bay: 124.5 Giờ
                </p>
              </div>
              <select
                class="text-[10px] font-black bg-slate-50 border-none rounded-lg px-3 py-1 outline-none"
              >
                <option>7 Ngày qua</option>
                <option>30 Ngày qua</option>
              </select>
            </div>

            <div class="h-[300px] w-full">
              <Line :data="chartData" :options="chartOptions" />
            </div>
          </section>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="drone in drones"
              :key="drone.id"
              class="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:border-teal-400 transition-all cursor-pointer group"
            >
              <div
                class="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100"
              >
                <img
                  :src="drone.image"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div class="flex-1">
                <h4 class="font-black text-slate-800 text-xs uppercase">
                  {{ drone.name }}
                </h4>
                <div class="flex items-center gap-3 mt-1">
                  <div
                    class="flex items-center gap-1 text-[9px] font-bold text-slate-400"
                  >
                    <Battery :size="10" class="text-teal-500" />
                    {{ drone.battery }}%
                  </div>
                  <div
                    class="flex items-center gap-1 text-[9px] font-bold text-slate-400"
                  >
                    <Wifi :size="10" class="text-blue-500" />
                    {{ drone.signal }}%
                  </div>
                </div>
              </div>
              <ChevronRight
                :size="16"
                class="text-slate-300 group-hover:text-teal-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-6">
          <section
            class="bg-slate-900 p-6 rounded-[2rem] text-white overflow-hidden relative shadow-xl shadow-slate-200"
          >
            <div class="relative z-10 space-y-4">
              <h3
                class="font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 text-teal-400"
              >
                <MapPin :size="16" /> Vị trí hiện tại
              </h3>
              <div
                class="aspect-video bg-slate-800 rounded-2xl border border-white/10 flex items-center justify-center relative"
              >
                <div
                  class="absolute w-3 h-3 bg-teal-400 rounded-full animate-ping"
                ></div>
                <div
                  class="w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_15px_#2dd4bf]"
                ></div>
                <p
                  class="absolute bottom-3 text-[8px] font-black uppercase tracking-widest opacity-50"
                >
                  Khu vực: Hòa Lạc, Hà Nội
                </p>
              </div>
              <button
                class="w-full py-3 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest"
              >
                Mở bản đồ chi tiết
              </button>
            </div>
          </section>

          <section
            class="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm"
          >
            <h3
              class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"
            >
              <Clock :size="16" class="text-orange-500" /> Thông báo mới
            </h3>
            <div class="space-y-4">
              <div
                v-for="i in 3"
                :key="i"
                class="flex gap-3 pb-4 border-b border-slate-50 last:border-0"
              >
                <div class="w-1 h-8 bg-teal-500 rounded-full"></div>
                <div>
                  <p class="text-[11px] font-bold text-slate-700">
                    Drone #{{ i }}02 đã hạ cánh an toàn.
                  </p>
                  <p class="text-[9px] text-slate-400 font-bold uppercase mt-1">
                    10 Phút trước
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  LayoutDashboard,
  Plus,
  Activity,
  Battery,
  Wifi,
  ChevronRight,
  MapPin,
  Clock,
  Box,
  Navigation,
  ShieldCheck,
  AlertTriangle,
} from "lucide-vue-next";

// Import Chart.js components
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

// Đăng ký Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
);

// Dữ liệu Biểu đồ
const chartData = ref({
  labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
  datasets: [
    {
      label: "Giờ bay",
      data: [12, 19, 15, 25, 22, 30, 10],
      borderColor: "#14b8a6", // Teal 500
      backgroundColor: "rgba(20, 184, 166, 0.1)",
      fill: true,
      tension: 0.4, // Độ cong của đường
      pointRadius: 4,
      pointBackgroundColor: "#14b8a6",
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, // Ẩn chú thích vì đã có tiêu đề card
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: "#f1f5f9" },
      ticks: { font: { size: 10, weight: "bold" }, color: "#94a3b8" },
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 10, weight: "bold" }, color: "#94a3b8" },
    },
  },
});

// Mock Data khác
const stats = [
  {
    label: "Tổng UAV",
    value: "12",
    icon: Box,
    bgColor: "bg-slate-100",
    textColor: "text-slate-900",
  },
  {
    label: "Đang bay",
    value: "03",
    icon: Navigation,
    bgColor: "bg-teal-100",
    textColor: "text-teal-600",
  },
  {
    label: "Pin trung bình",
    value: "78%",
    icon: Battery,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    label: "Cảnh báo",
    value: "01",
    icon: AlertTriangle,
    bgColor: "bg-orange-100",
    textColor: "text-orange-600",
  },
];

const drones = [
  {
    id: 1,
    name: "DJI Mavic 3E",
    battery: 85,
    signal: 92,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Matrice 30T",
    battery: 42,
    signal: 88,
    image: "https://via.placeholder.com/100",
  },
];
</script>

<style scoped>
/* Không cần CSS nhiều vì đã có Tailwind xịn */
canvas {
  filter: drop-shadow(0 10px 15px rgba(20, 184, 166, 0.1));
}
</style>
