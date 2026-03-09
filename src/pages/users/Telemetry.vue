<template>
  <div class="min-h-screen bg-[#05070a] text-slate-300 p-6 font-mono">
    <div
      class="max-w-[1440px] mx-auto mb-8 flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-6 gap-4"
    >
      <div class="flex items-center gap-4">
        <div class="p-3 bg-teal-500/10 border border-teal-500/20 rounded-2xl">
          <Activity class="w-8 h-8 text-teal-500 animate-pulse" />
        </div>
        <div>
          <h1
            class="text-2xl font-black text-white uppercase italic tracking-tighter"
          >
            Hệ thống <span class="text-teal-500">Telemetry</span>
          </h1>
          <div class="flex items-center gap-3 mt-1">
            <span
              class="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500"
            >
              <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              MAVLink 2.0 CONNECTED
            </span>
            <span class="text-[10px] text-slate-500">FREQ: 915MHz</span>
            <span class="text-[10px] text-slate-500">LATENCY: 12ms</span>
          </div>
        </div>
      </div>

      <div class="flex gap-2">
        <select
          class="bg-slate-900 border border-white/10 text-[11px] font-bold px-4 py-2 rounded-xl outline-none focus:border-teal-500"
        >
          <option>SKL-701 (Sentinel Alpha)</option>
          <option>SKL-705 (Storm Runner)</option>
        </select>
        <button
          class="bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all"
        >
          <Settings class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div
      class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div class="lg:col-span-2 grid grid-cols-2 gap-4">
        <div
          v-for="gauge in primaryGauges"
          :key="gauge.label"
          class="bg-slate-900/40 border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-teal-500/30 transition-all"
        >
          <p
            class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4"
          >
            {{ gauge.label }}
          </p>
          <div class="flex items-end gap-2">
            <span class="text-4xl font-black text-white italic leading-none">{{
              gauge.value
            }}</span>
            <span class="text-xs font-bold text-teal-600 pb-1">{{
              gauge.unit
            }}</span>
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 h-1 bg-teal-500/20 overflow-hidden"
          >
            <div class="h-full bg-teal-500 w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div
        class="bg-slate-900/40 border border-white/5 p-6 rounded-3xl space-y-6"
      >
        <h3
          class="text-[11px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-teal-500 pl-3"
        >
          GNSS / GPS Data
        </h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-xs">Sats Count</span>
            <span class="text-sm font-bold text-emerald-400">18 Locked</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs">HDOP / VDOP</span>
            <span class="text-sm font-bold text-white">0.8 / 1.1</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs">GPS Mode</span>
            <span
              class="text-[10px] bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded font-black"
              >RTK FIXED</span
            >
          </div>
        </div>
      </div>

      <div
        class="bg-slate-900/40 border border-white/5 p-6 rounded-3xl space-y-6"
      >
        <h3
          class="text-[11px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-orange-500 pl-3"
        >
          Power Bus
        </h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-[10px] mb-2 font-bold">
              <span>VOLTAGE</span>
              <span class="text-orange-400">24.8V</span>
            </div>
            <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-orange-500 w-3/4"></div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs">Current Draw</span>
            <span class="text-sm font-bold text-white">32.4A</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs">Consumed</span>
            <span class="text-sm font-bold text-white">1,240mAh</span>
          </div>
        </div>
      </div>

      <div
        class="lg:col-span-3 bg-slate-900/40 border border-white/5 p-6 rounded-3xl h-64 relative overflow-hidden"
      >
        <div class="flex justify-between items-center mb-6">
          <h3
            class="text-[11px] font-black text-slate-400 uppercase tracking-widest"
          >
            Vibration Analysis (IMU Axis)
          </h3>
          <div class="flex gap-4 text-[9px] font-bold">
            <span class="text-red-500">X-AXIS</span>
            <span class="text-emerald-500">Y-AXIS</span>
            <span class="text-blue-500">Z-AXIS</span>
          </div>
        </div>
        <div class="absolute inset-x-6 bottom-6 top-16 flex items-end gap-1">
          <div
            v-for="i in 40"
            :key="i"
            :style="{ height: Math.random() * 80 + 10 + '%' }"
            class="flex-1 bg-white/5 rounded-t-sm hover:bg-teal-500/40 transition-all"
          ></div>
        </div>
      </div>

      <div
        class="bg-slate-900/40 border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center"
      >
        <h3
          class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6"
        >
          Attitude Indicator
        </h3>
        <div
          class="w-32 h-32 rounded-full border-4 border-white/10 relative overflow-hidden flex flex-col"
        >
          <div class="bg-blue-500/20 flex-1"></div>
          <div class="h-[2px] bg-white z-10"></div>
          <div class="bg-orange-900/40 flex-1"></div>
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30"
          >
            <div class="w-8 h-[1px] bg-white"></div>
            <div class="w-4 h-[1px] bg-white"></div>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <p class="text-[9px] text-slate-500">ROLL</p>
            <p class="text-xs font-bold text-white">2.4°</p>
          </div>
          <div>
            <p class="text-[9px] text-slate-500">PITCH</p>
            <p class="text-xs font-bold text-white">-1.2°</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Activity, Settings } from "lucide-vue-next";

const primaryGauges = [
  { label: "Ground Speed", value: "42.5", unit: "KM/H" },
  { label: "Vertical Speed", value: "1.2", unit: "M/S" },
  { label: "Relative Altitude", value: "118", unit: "M" },
  { label: "Distance to Home", value: "840", unit: "M" },
];
</script>

<style scoped>
/* Tạo hiệu ứng mờ ảo (Glow) cho các con số */
.text-white {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}
.text-teal-500 {
  text-shadow: 0 0 15px rgba(20, 184, 166, 0.3);
}

/* Ẩn thanh cuộn */
::-webkit-scrollbar {
  display: none;
}
</style>
