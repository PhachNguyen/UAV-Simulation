<template>
  <div class="h-[calc(100vh-64px)] bg-slate-950 flex flex-col overflow-hidden">
    <div
      class="bg-slate-900 border-b border-white/5 p-4 flex justify-between items-center"
    >
      <div class="flex items-center gap-6">
        <h2
          class="text-white font-black uppercase italic tracking-tighter flex items-center gap-2"
        >
          <Video class="w-5 h-5 text-red-500 animate-pulse" /> LIVE STREAM
          CENTER
        </h2>
        <div class="flex bg-black/40 rounded-lg p-1">
          <button
            v-for="grid in [1, 2, 4]"
            :key="grid"
            @click="gridSize = grid"
            :class="[
              'px-3 py-1 rounded text-[10px] font-black transition-all',
              gridSize === grid
                ? 'bg-teal-500 text-white'
                : 'text-slate-500 hover:text-white',
            ]"
          >
            GRID {{ grid }}
          </button>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div
          class="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full"
        >
          <div class="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <span class="text-[10px] font-black text-red-500 uppercase"
            >Đang ghi hình (REC)</span
          >
        </div>
        <button
          class="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
        >
          <Settings2 class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div
      :class="['flex-1 p-4 grid gap-4 transition-all duration-500', gridClass]"
    >
      <div
        v-for="stream in activeStreams.slice(0, gridSize)"
        :key="stream.id"
        class="relative bg-black rounded-2xl overflow-hidden border border-white/5 group shadow-2xl"
      >
        <div
          class="absolute inset-0 bg-slate-900 flex items-center justify-center"
        >
          <img
            :src="stream.placeholder"
            class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s] linear"
          />
          <div
            class="absolute inset-0 pointer-events-none bg-scanline opacity-10"
          ></div>
        </div>

        <div
          class="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none"
        >
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <div
                class="flex items-center gap-2 bg-black/40 backdrop-blur px-2 py-1 rounded border border-white/10 w-fit"
              >
                <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span
                  class="text-[10px] font-mono text-white font-bold uppercase"
                  >{{ stream.droneName }}</span
                >
              </div>
              <div
                class="text-[9px] font-mono text-teal-400 bg-black/20 w-fit px-1"
              >
                LAT: {{ stream.lat }} | LNG: {{ stream.lng }}
              </div>
            </div>
            <div class="text-right font-mono text-white text-[11px] space-y-1">
              <div class="bg-black/40 px-2 rounded">ALT: {{ stream.alt }}m</div>
              <div class="bg-black/40 px-2 rounded">
                SPD: {{ stream.speed }}m/s
              </div>
            </div>
          </div>

          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
          >
            <div
              class="w-20 h-20 border border-teal-500 rounded-full flex items-center justify-center"
            >
              <div class="w-full h-[1px] bg-teal-500"></div>
              <div class="h-full w-[1px] bg-teal-500 absolute"></div>
            </div>
          </div>

          <div class="flex justify-between items-end">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <Battery
                  :class="[
                    'w-4 h-4',
                    stream.battery < 20 ? 'text-red-500' : 'text-emerald-500',
                  ]"
                />
                <span class="text-xs font-black text-white italic"
                  >{{ stream.battery }}%</span
                >
              </div>
              <div
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
              >
                SIGNAL: <span class="text-white">{{ stream.signal }}ms</span>
              </div>
            </div>
            <div class="flex gap-2 pointer-events-auto">
              <button
                class="p-2 bg-black/60 text-white rounded hover:bg-teal-500 transition-colors"
              >
                <Maximize2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="h-32 bg-slate-900 border-t border-white/5 p-4 flex gap-4 overflow-x-auto"
    >
      <div
        v-for="drone in allDrones"
        :key="drone.id"
        class="min-w-[160px] bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col justify-between cursor-pointer hover:border-teal-500/50 transition-all"
      >
        <div class="flex justify-between items-start">
          <span
            class="text-[9px] font-black text-slate-500 uppercase tracking-tighter"
            >{{ drone.id }}</span
          >
          <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
        </div>
        <h4 class="text-[11px] font-bold text-white truncate uppercase italic">
          {{ drone.name }}
        </h4>
        <div
          class="text-[9px] font-bold text-teal-500 uppercase tracking-widest"
        >
          Connect Stream
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Video, Settings2, Maximize2, Battery } from "lucide-vue-next";

const gridSize = ref(4);

const gridClass = computed(() => {
  if (gridSize.value === 1) return "grid-cols-1";
  if (gridSize.value === 2) return "grid-cols-2";
  return "grid-cols-2 lg:grid-cols-2"; // 4 màn hình (2x2)
});

const activeStreams = [
  {
    id: 1,
    droneName: "SENTINEL-ALPHA",
    battery: 82,
    alt: 145,
    speed: 12.4,
    lat: "21.028",
    lng: "105.834",
    signal: 24,
    placeholder: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  },
  {
    id: 2,
    droneName: "STORM-RUNNER",
    battery: 14,
    alt: 88,
    speed: 22.1,
    lat: "21.031",
    lng: "105.845",
    signal: 45,
    placeholder: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    id: 3,
    droneName: "CINE-VUE 01",
    battery: 65,
    alt: 12,
    speed: 4.5,
    lat: "21.015",
    lng: "105.820",
    signal: 12,
    placeholder: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40",
  },
  {
    id: 4,
    droneName: "AGRI-SCAN X",
    battery: 98,
    alt: 35,
    speed: 8.0,
    lat: "21.050",
    lng: "105.810",
    signal: 32,
    placeholder: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
  },
];

const allDrones = [
  { id: "SKL-701", name: "Sentinel Alpha" },
  { id: "SKL-705", name: "Storm Runner" },
  { id: "SKL-902", name: "CineVue 01" },
  { id: "SKL-441", name: "AgriScan X" },
  { id: "SKL-112", name: "Hangar Beta" },
  { id: "SKL-003", name: "Repair Lab" },
];
</script>

<style scoped>
.bg-scanline {
  background:
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.06)
    );
  background-size:
    100% 4px,
    3px 100%;
}
</style>
