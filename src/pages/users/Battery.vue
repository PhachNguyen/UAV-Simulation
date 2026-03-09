<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-[1440px] mx-auto mb-8 flex justify-between items-end">
      <div>
        <div
          class="flex items-center gap-2 text-orange-500 font-black tracking-widest uppercase text-[10px] mb-1"
        >
          <Zap class="w-3 h-3" /> Power Systems
        </div>
        <h1
          class="text-3xl font-black text-slate-900 uppercase tracking-tighter italic"
        >
          Quản lý nguồn <span class="text-orange-500">/ Battery Health</span>
        </h1>
      </div>

      <div class="flex gap-3">
        <button
          class="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all"
        >
          <RefreshCw class="w-3.5 h-3.5" /> LÀM MỚI DỮ LIỆU
        </button>
        <button
          class="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all"
        >
          <Download class="w-3.5 h-3.5" /> XUẤT BÁO CÁO
        </button>
      </div>
    </div>

    <div
      class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
    >
      <div
        v-for="s in batteryStats"
        :key="s.label"
        class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden"
      >
        <div class="relative z-10">
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
          >
            {{ s.label }}
          </p>
          <p class="text-3xl font-black text-slate-900">{{ s.value }}</p>
        </div>
        <component
          :is="s.icon"
          class="absolute -right-4 -bottom-4 w-24 h-24 text-slate-50"
        />
      </div>
    </div>

    <div
      class="max-w-[1440px] mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
    >
      <div
        class="p-6 border-b border-slate-100 flex justify-between items-center"
      >
        <h3
          class="font-black uppercase tracking-tight text-slate-800 flex items-center gap-2"
        >
          <Database class="w-5 h-5 text-teal-600" /> Danh sách Pack Pin hệ thống
        </h3>
        <div class="flex gap-2">
          <span
            class="flex items-center gap-1.5 text-[10px] font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full"
          >
            <div
              class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
            ></div>
            ỔN ĐỊNH
          </span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50">
              <th
                class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Mã Pin
              </th>
              <th
                class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Trạng thái
              </th>
              <th
                class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Dung lượng
              </th>
              <th
                class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Sức khỏe (SOH)
              </th>
              <th
                class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Chu kỳ
              </th>
              <th
                class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Nhiệt độ
              </th>
              <th
                class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Drone liên kết
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="bt in batteryList"
              :key="bt.id"
              class="hover:bg-slate-50 transition-colors group"
            >
              <td class="p-4">
                <div class="font-mono font-bold text-sm text-slate-900">
                  {{ bt.id }}
                </div>
                <div class="text-[10px] text-slate-400 font-medium">
                  LiPo 6S Intelligent
                </div>
              </td>
              <td class="p-4">
                <span
                  :class="getStatusClass(bt.status)"
                  class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter"
                >
                  {{ bt.status }}
                </span>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex-1 h-2 bg-slate-100 rounded-full max-w-[60px] overflow-hidden"
                  >
                    <div
                      :style="{ width: bt.capacity + '%' }"
                      :class="getCapColor(bt.capacity)"
                      class="h-full rounded-full transition-all"
                    ></div>
                  </div>
                  <span class="font-black text-sm">{{ bt.capacity }}%</span>
                </div>
              </td>
              <td class="p-4">
                <div
                  class="flex items-center gap-1 font-bold text-sm"
                  :class="bt.health < 80 ? 'text-red-500' : 'text-slate-700'"
                >
                  <Activity class="w-3.5 h-3.5" /> {{ bt.health }}%
                </div>
              </td>
              <td class="p-4 font-bold text-sm text-slate-600">
                {{ bt.cycles }} Lần
              </td>
              <td class="p-4">
                <div
                  class="flex items-center gap-1 text-sm font-bold"
                  :class="bt.temp > 45 ? 'text-orange-600' : 'text-slate-600'"
                >
                  <Thermometer class="w-3.5 h-3.5" /> {{ bt.temp }}°C
                </div>
              </td>
              <td class="p-4 font-bold text-xs text-teal-600 uppercase">
                {{ bt.drone }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Zap,
  Activity,
  Thermometer,
  Battery,
  RefreshCw,
  Download,
  Database,
  AlertCircle,
} from "lucide-vue-next";

const batteryStats = [
  { label: "Tổng số Pack", value: "48", icon: Battery, bg: "bg-slate-100" },
  { label: "Đang sạc", value: "12", icon: Zap, bg: "bg-orange-50" },
  { label: "Cần thay thế", value: "03", icon: AlertCircle, bg: "bg-red-50" },
  { label: "Hiệu suất TB", value: "94%", icon: Activity, bg: "bg-emerald-50" },
];

const batteryList = [
  {
    id: "BT-9901",
    status: "Đang bay",
    capacity: 42,
    health: 98,
    cycles: 12,
    temp: 48,
    drone: "SKL-001",
  },
  {
    id: "BT-9902",
    status: "Sẵn sàng",
    capacity: 100,
    health: 95,
    cycles: 45,
    temp: 28,
    drone: "SKL-002",
  },
  {
    id: "BT-8245",
    status: "Đang sạc",
    capacity: 15,
    health: 72,
    cycles: 184,
    temp: 35,
    drone: "--",
  },
  {
    id: "BT-7721",
    status: "Lỗi",
    capacity: 0,
    health: 45,
    cycles: 210,
    temp: 18,
    drone: "SKL-003",
  },
  {
    id: "BT-1022",
    status: "Sẵn sàng",
    capacity: 98,
    health: 99,
    cycles: 5,
    temp: 26,
    drone: "SKL-004",
  },
  {
    id: "BT-3341",
    status: "Đang bay",
    capacity: 65,
    health: 92,
    cycles: 88,
    temp: 52,
    drone: "SKL-006",
  },
];

const getStatusClass = (status) => {
  const base = "border ";
  if (status === "Đang bay")
    return base + "bg-blue-50 text-blue-600 border-blue-100";
  if (status === "Sẵn sàng")
    return base + "bg-emerald-50 text-emerald-600 border-emerald-100";
  if (status === "Đang sạc")
    return (
      base + "bg-orange-50 text-orange-600 border-orange-100 animate-pulse"
    );
  return base + "bg-red-50 text-red-600 border-red-100";
};

const getCapColor = (cap) => {
  if (cap > 50) return "bg-emerald-500";
  if (cap > 20) return "bg-orange-500";
  return "bg-red-500";
};
</script>
