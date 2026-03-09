<template>
  <div class="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-900">
    <div
      class="w-80 bg-white h-full shadow-2xl z-20 flex flex-col border-r border-slate-200"
    >
      <div class="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2
          class="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-2"
        >
          <MapPin class="w-5 h-5 text-teal-600" /> Mission Editor
        </h2>
        <p
          class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1"
        >
          Thiết lập lộ trình bay
        </p>
      </div>

      <div class="flex-1 overflow-y-auto p-5 space-y-6">
        <div class="space-y-4">
          <div>
            <label
              class="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2"
              >Tên nhiệm vụ</label
            >
            <input
              type="text"
              v-model="missionName"
              class="w-full px-4 py-2 bg-slate-100 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label
                class="text-[10px] font-black text-slate-500 uppercase block mb-1"
                >Độ cao (m)</label
              >
              <input
                type="number"
                v-model="defaultAlt"
                class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono"
              />
            </div>
            <div>
              <label
                class="text-[10px] font-black text-slate-500 uppercase block mb-1"
                >Tốc độ (m/s)</label
              >
              <input
                type="number"
                v-model="defaultSpeed"
                class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono"
              />
            </div>
          </div>
        </div>

        <div class="h-[1px] bg-slate-100"></div>

        <div>
          <div class="flex justify-between items-center mb-4">
            <label
              class="text-[11px] font-black text-slate-500 uppercase tracking-widest"
              >Danh sách điểm ({{ waypoints.length }})</label
            >
            <button
              @click="clearWaypoints"
              class="text-[10px] font-bold text-red-500 hover:underline"
            >
              XÓA HẾT
            </button>
          </div>

          <div class="space-y-2">
            <div
              v-for="(wp, index) in waypoints"
              :key="index"
              class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-teal-300 transition-all"
            >
              <div
                class="w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-bold"
              >
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <div class="text-[10px] font-mono text-slate-500">
                  {{ wp.lat.toFixed(4) }}, {{ wp.lng.toFixed(4) }}
                </div>
                <div class="text-[11px] font-bold text-slate-700">
                  WP {{ index + 1 }} - Alt: {{ wp.alt }}m
                </div>
              </div>
              <button
                @click="removeWaypoint(index)"
                class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>

            <div
              v-if="waypoints.length === 0"
              class="py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl"
            >
              <Navigation class="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p class="text-[11px] font-bold text-slate-400 uppercase">
                Click lên bản đồ để thêm điểm
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
        <button
          class="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <UploadCloud class="w-4 h-4 text-teal-400" /> NẠP NHIỆM VỤ (UPLOAD)
        </button>
        <button
          class="w-full py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
        >
          <Play class="w-4 h-4" /> BẮT ĐẦU BAY
        </button>
      </div>
    </div>

    <div class="flex-1 relative">
      <div ref="mapContainer" class="w-full h-full bg-slate-800"></div>

      <div class="absolute top-6 left-6 z-10 flex gap-2">
        <div
          class="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-xl border border-slate-200 flex items-center gap-4"
        >
          <div class="flex items-center gap-2 border-r pr-4 border-slate-200">
            <Ruler class="w-4 h-4 text-teal-600" />
            <span class="text-xs font-bold text-slate-700"
              >Tổng quãng đường:
              <span class="text-teal-600">{{ totalDistance }}km</span></span
            >
          </div>
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4 text-teal-600" />
            <span class="text-xs font-bold text-slate-700"
              >Ước tính:
              <span class="text-teal-600">{{ estTime }} phút</span></span
            >
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-10 right-10 z-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white shadow-2xl"
      >
        <div
          class="text-[10px] font-black uppercase tracking-widest mb-3 text-teal-400"
        >
          Chế độ hiển thị
        </div>
        <div class="space-y-2">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked class="accent-teal-500" />
            <span class="text-xs font-medium">Lộ trình Waypoints</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked class="accent-red-500" />
            <span class="text-xs font-medium">Vùng cấm (NFZ)</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  MapPin,
  Navigation,
  Trash2,
  UploadCloud,
  Play,
  Ruler,
  Clock,
  Settings,
} from "lucide-vue-next";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapContainer = ref(null);
const waypoints = ref([]);
const missionName = ref("MISSION_ALPHA_001");
const defaultAlt = ref(100);
const defaultSpeed = ref(12);

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhlcGhhY2giLCJhIjoiY21taXpvN3VhMWIxbjJwcG90dzcwMzE3NCJ9.5ePRCzztZPDrdgVMgK4rng";

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    center: [105.8342, 21.0285],
    zoom: 15,
  });

  map.on("click", (e) => {
    const newWp = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      alt: defaultAlt.value,
    };
    waypoints.value.push(newWp);
    addMarker(e.lngLat, map);
    updateRoute(map);
  });
});

// Mock calculations
const totalDistance = computed(() => (waypoints.value.length * 1.2).toFixed(2));
const estTime = computed(() => (waypoints.value.length * 4).toFixed(0));

const addMarker = (lngLat, map) => {
  new mapboxgl.Marker({ color: "#0d9488" }).setLngLat(lngLat).addTo(map);
};

const updateRoute = (map) => {
  if (waypoints.value.length < 2) return;

  const coords = waypoints.value.map((wp) => [wp.lng, wp.lat]);
  const source = map.getSource("route");

  if (source) {
    source.setData({
      type: "Feature",
      geometry: { type: "LineString", coordinates: coords },
    });
  } else {
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: { type: "LineString", coordinates: coords },
      },
    });
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": "#2dd4bf",
        "line-width": 4,
        "line-dasharray": [2, 1],
      },
    });
  }
};

const removeWaypoint = (index) => {
  waypoints.value.splice(index, 1);
};

const clearWaypoints = () => {
  waypoints.value = [];
};
</script>

<style scoped>
/* Tùy chỉnh thanh cuộn cho Sidebar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
