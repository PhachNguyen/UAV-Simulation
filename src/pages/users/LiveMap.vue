<template>
  <div
    class="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-900"
  >
    <div ref="mapContainer" class="absolute inset-0 z-0"></div>

    <div
      class="absolute top-6 left-6 right-6 z-10 flex justify-between pointer-events-none"
    >
      <div class="flex gap-4 pointer-events-auto">
        <div
          class="bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl text-white"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"
            ></div>
            <div>
              <p
                class="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400"
              >
                Hệ thống trực tuyến
              </p>
              <p class="text-xl font-black italic uppercase">
                04 <span class="text-slate-400 text-sm">Drone đang bay</span>
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 hidden md:flex items-center gap-6"
        >
          <div v-for="stat in quickStats" :key="stat.label" class="text-center">
            <p class="text-[9px] font-black text-slate-400 uppercase">
              {{ stat.label }}
            </p>
            <p class="text-sm font-black text-slate-900">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <div class="flex gap-2 pointer-events-auto">
        <button
          class="bg-white p-3 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 transition-all"
        >
          <Layers class="w-5 h-5 text-slate-600" />
        </button>
        <button
          class="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          Cảnh báo khẩn cấp (SOS)
        </button>
      </div>
    </div>

    <div class="absolute right-6 top-24 bottom-6 w-80 z-10 pointer-events-none">
      <div class="pointer-events-auto h-full flex flex-col gap-4">
        <div
          v-for="drone in activeDrones"
          :key="drone.id"
          class="bg-white/95 backdrop-blur shadow-xl rounded-2xl border border-slate-200 p-4 hover:border-teal-500 transition-all cursor-pointer group"
        >
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-teal-50"
              >
                <Plane
                  :class="
                    drone.status === 'Warning'
                      ? 'text-orange-500'
                      : 'text-teal-600'
                  "
                  class="w-4 h-4"
                />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-sm">
                  {{ drone.name }}
                </h3>
                <p class="text-[10px] font-mono text-slate-400 uppercase">
                  {{ drone.id }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <span
                :class="
                  drone.battery > 30 ? 'text-emerald-500' : 'text-red-500'
                "
                class="text-xs font-black italic"
              >
                {{ drone.battery }}%
              </span>
              <p class="text-[9px] font-bold text-slate-400 uppercase">Pin</p>
            </div>
          </div>

          <div
            class="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-3"
          >
            <div class="text-center">
              <p class="text-[8px] font-bold text-slate-400 uppercase italic">
                Alt
              </p>
              <p class="text-[11px] font-bold">{{ drone.alt }}m</p>
            </div>
            <div class="text-center border-x border-slate-100">
              <p class="text-[8px] font-bold text-slate-400 uppercase italic">
                Spd
              </p>
              <p class="text-[11px] font-bold">{{ drone.speed }}m/s</p>
            </div>
            <div class="text-center">
              <p class="text-[8px] font-bold text-slate-400 uppercase italic">
                Dist
              </p>
              <p class="text-[11px] font-bold">{{ drone.dist }}km</p>
            </div>
          </div>

          <button
            class="w-full py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest group-hover:bg-teal-600 transition-colors"
          >
            Xem Camera trực tiếp
          </button>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-6 left-6 z-10 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10"
    >
      <div class="flex items-center gap-4 text-[10px] font-mono text-white">
        <div class="flex items-center gap-2 text-teal-400">
          <Crosshair class="w-3 h-3" />
          <span>CENTER: 21.0285° N, 105.8342° E</span>
        </div>
        <div class="w-[1px] h-3 bg-white/20"></div>
        <div class="flex items-center gap-2">
          <Navigation class="w-3 h-3" />
          <span>GIMBAL: 45.2°</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Plane, Layers, Crosshair, Navigation } from "lucide-vue-next";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapContainer = ref(null);
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Thay bằng token của bạn

const quickStats = [
  { label: "Sức gió", value: "12 km/h" },
  { label: "Tầm nhìn", value: "15.0 km" },
  { label: "Nhiệt độ", value: "28°C" },
];

const activeDrones = ref([
  {
    id: "SKL-701",
    name: "Sentinel Alpha",
    battery: 84,
    alt: 120,
    speed: 15.4,
    dist: 2.1,
    status: "Normal",
  },
  {
    id: "SKL-705",
    name: "Swift Carrier",
    battery: 22,
    alt: 45,
    speed: 8.2,
    dist: 0.8,
    status: "Warning",
  },
  {
    id: "SKL-902",
    name: "CineVue Pro",
    battery: 65,
    alt: 18,
    speed: 4.5,
    dist: 1.2,
    status: "Normal",
  },
]);

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/satellite-streets-v12", // Map vệ tinh chuyên nghiệp
    center: [105.8342, 21.0285], // Hà Nội
    zoom: 14,
    pitch: 45, // Góc nghiêng 3D
  });

  // Giả lập các Marker Drone trên bản đồ
  activeDrones.value.forEach((drone) => {
    const el = document.createElement("div");
    el.className = "drone-marker";
    el.innerHTML = `<div class="p-1 bg-white rounded-full shadow-2xl border-2 border-teal-500 animate-bounce">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                    </div>`;

    new mapboxgl.Marker(el)
      .setLngLat([
        105.8342 + (Math.random() - 0.5) * 0.02,
        21.0285 + (Math.random() - 0.5) * 0.02,
      ])
      .addTo(map);
  });
});
</script>

<style scoped>
/* Hiệu ứng mượt cho sidebar */
.pointer-events-auto {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Tùy chỉnh Marker Drone */
:deep(.drone-marker) {
  cursor: pointer;
}
</style>
