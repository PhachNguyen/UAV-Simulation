<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-[1440px] mx-auto mb-8 flex justify-between items-end">
      <div>
        <div
          class="flex items-center gap-2 text-blue-600 font-black tracking-widest uppercase text-[10px] mb-1"
        >
          <Radio class="w-3 h-3" /> Command & Control
        </div>
        <h1
          class="text-3xl font-black text-slate-900 uppercase tracking-tighter italic"
        >
          Trạm <span class="text-blue-600">Mặt đất</span> / GCS
        </h1>
      </div>

      <div
        class="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div class="px-4 border-r border-slate-100">
          <p class="text-[9px] font-black text-slate-400 uppercase">Uplink</p>
          <p class="text-sm font-bold text-emerald-500">1.2 Gbps</p>
        </div>
        <div class="px-4">
          <p class="text-[9px] font-black text-slate-400 uppercase">Downlink</p>
          <p class="text-sm font-bold text-blue-500">850 Mbps</p>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div
          v-for="station in stations"
          :key="station.id"
          class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div class="p-6 flex flex-col md:flex-row gap-6">
            <div
              class="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 min-w-[160px]"
            >
              <div class="relative">
                <div
                  :class="station.active ? 'bg-emerald-500' : 'bg-slate-300'"
                  class="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg"
                >
                  <TowerControl class="w-8 h-8" />
                </div>
                <div
                  v-if="station.active"
                  class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full animate-ping"
                ></div>
              </div>
              <p
                class="mt-4 font-black text-slate-900 uppercase tracking-tighter"
              >
                {{ station.id }}
              </p>
              <p class="text-[10px] font-bold text-slate-400 uppercase">
                {{ station.location }}
              </p>
            </div>

            <div class="flex-1 space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3
                    class="text-lg font-black text-slate-800 uppercase italic"
                  >
                    {{ station.name }}
                  </h3>
                  <div class="flex gap-2 mt-1">
                    <span
                      class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded uppercase"
                      >Antenna Array v4</span
                    >
                    <span
                      class="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase"
                      >Firmware 2.4.1</span
                    >
                  </div>
                </div>
                <button
                  class="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <Settings2 class="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div class="space-y-2">
                <div
                  class="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500"
                >
                  <span>Cường độ tín hiệu</span>
                  <span class="text-slate-900">{{ station.signal }}%</span>
                </div>
                <div
                  class="h-2 bg-slate-100 rounded-full overflow-hidden flex gap-0.5"
                >
                  <div
                    v-for="i in 20"
                    :key="i"
                    :class="
                      i <= station.signal / 5 ? 'bg-blue-500' : 'bg-slate-200'
                    "
                    class="flex-1 h-full rounded-sm"
                  ></div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4 pt-2">
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[8px] font-bold text-slate-400 uppercase">
                    Drone kết nối
                  </p>
                  <p class="text-sm font-black text-slate-800">
                    {{ station.connectedDrones }} Units
                  </p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[8px] font-bold text-slate-400 uppercase">
                    Nhiệt độ CPU
                  </p>
                  <p class="text-sm font-black text-slate-800">
                    {{ station.temp }}°C
                  </p>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p class="text-[8px] font-bold text-slate-400 uppercase">
                    Thời gian Up
                  </p>
                  <p class="text-sm font-black text-slate-800">
                    {{ station.uptime }}h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <h3
            class="font-black uppercase tracking-tight italic mb-6 flex items-center gap-2"
          >
            <Activity class="w-5 h-5 text-teal-400" /> Phân tích Network
          </h3>
          <div class="space-y-6">
            <div v-for="diag in diagnostics" :key="diag.label">
              <div
                class="flex justify-between text-[10px] font-bold uppercase mb-2 text-slate-400"
              >
                <span>{{ diag.label }}</span>
                <span class="text-white">{{ diag.value }}</span>
              </div>
              <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  :style="{ width: diag.percent + '%' }"
                  class="h-full bg-teal-500"
                ></div>
              </div>
            </div>
          </div>
          <button
            class="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Chạy kiểm tra hệ thống
          </button>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-slate-200">
          <h3
            class="font-black uppercase tracking-tight italic mb-4 text-slate-800"
          >
            Cảnh báo phần cứng
          </h3>
          <div class="space-y-3">
            <div
              class="flex gap-3 p-3 bg-red-50 rounded-xl border border-red-100"
            >
              <AlertCircle class="w-5 h-5 text-red-500 shrink-0" />
              <p class="text-[11px] font-bold text-red-700 leading-tight">
                Phát hiện nhiễu tần số cao tại Trạm GCS-02. Kiểm tra bộ lọc
                Antenna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Radio,
  TowerControl,
  Settings2,
  Activity,
  AlertCircle,
} from "lucide-vue-next";

const stations = [
  {
    id: "GCS-01",
    name: "Trạm Chỉ huy Trung tâm",
    location: "Hà Nội - HQ",
    signal: 92,
    connectedDrones: 4,
    temp: 42,
    uptime: 124,
    active: true,
  },
  {
    id: "GCS-02",
    name: "Trạm Viễn thông Di động",
    location: "Đà Nẵng - Hub",
    signal: 45,
    connectedDrones: 1,
    temp: 58,
    uptime: 12,
    active: true,
  },
  {
    id: "GCS-03",
    name: "Trạm Dự phòng 01",
    location: "TP.HCM - Node",
    signal: 0,
    connectedDrones: 0,
    temp: 24,
    uptime: 0,
    active: false,
  },
];

const diagnostics = [
  { label: "Băng thông sử dụng", value: "420 MB/s", percent: 42 },
  { label: "Độ trễ hệ thống (Latency)", value: "14ms", percent: 15 },
  { label: "Độ ổn định tín hiệu", value: "98.2%", percent: 98 },
];
</script>
