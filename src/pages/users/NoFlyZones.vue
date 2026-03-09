<template>
  <div
    class="flex flex-col h-[calc(100vh-64px)] bg-slate-50 overflow-hidden font-sans"
  >
    <div
      class="bg-white border-b border-slate-200 p-3 flex gap-4 z-20 shadow-sm"
    >
      <div class="flex-1 grid grid-cols-4 gap-3">
        <select
          v-model="selectedProvince"
          @change="handleProvinceChange"
          class="select-custom"
        >
          <option value="">Tỉnh/Thành phố</option>
          <option v-for="p in provinces" :key="p.code" :value="p.code">
            {{ p.name }}
          </option>
        </select>

        <select
          v-model="selectedDistrict"
          @change="handleDistrictChange"
          :disabled="!selectedProvince"
          class="select-custom"
        >
          <option value="">Quận/Huyện</option>
          <option v-for="d in districts" :key="d.code" :value="d.code">
            {{ d.name }}
          </option>
        </select>

        <select
          v-model="selectedWard"
          @change="handleWardChange"
          :disabled="!selectedDistrict"
          class="select-custom"
        >
          <option value="">Phường/Xã</option>
          <option v-for="w in wards" :key="w.code" :value="w.code">
            {{ w.name }}
          </option>
        </select>

        <div class="relative">
          <Search class="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm địa chỉ..."
            class="input-custom"
          />
        </div>
      </div>
      <!-- <button
        class="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
      >
        English
      </button> -->
    </div>

    <div class="flex-1 relative z-10">
      <div ref="mapContainer" class="w-full h-full bg-slate-200"></div>

      <div
        class="absolute bottom-10 left-6 z-30 bg-white/95 p-4 rounded-2xl shadow-2xl border border-slate-200 min-w-[220px]"
      >
        <div class="space-y-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="showNFZ"
              @change="updateVisibility"
              class="w-4 h-4 accent-red-600"
            />
            <div
              class="w-6 h-4 bg-red-600/60 rounded border border-red-700"
            ></div>
            <span
              class="text-xs font-black text-slate-700 uppercase tracking-tighter"
              >Vùng cấm bay</span
            >
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="showRestricted"
              @change="updateVisibility"
              class="w-4 h-4 accent-orange-500"
            />
            <div
              class="w-6 h-4 bg-orange-500/60 rounded border border-orange-600"
            ></div>
            <span
              class="text-xs font-black text-slate-700 uppercase tracking-tighter"
              >Vùng hạn chế bay</span
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Search } from "lucide-vue-next";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import osmtogeojson from "osmtogeojson"; // Cần cài đặt: npm install osmtogeojson

const mapContainer = ref(null);
let map = null;

const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);
const selectedProvince = ref("");
const selectedDistrict = ref("");
const selectedWard = ref("");
const showNFZ = ref(true);
const showRestricted = ref(true);

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGhlcGhhY2giLCJhIjoiY21taXpvN3VhMWIxbjJwcG90dzcwMzE3NCJ9.5ePRCzztZPDrdgVMgK4rng";

onMounted(async () => {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/satellite-streets-v12", // Hiện nhãn địa danh
    center: [108.2772, 14.0583],
    zoom: 5.5,
  });

  map.addControl(new mapboxgl.NavigationControl(), "top-right");

  map.on("load", () => {
    fetchThirdPartyNFZ(); // Tự động lấy vùng cấm khi bản đồ sẵn sàng
  });

  const res = await axios.get("https://provinces.open-api.vn/api/p/");
  provinces.value = res.data;
});

// --- TÍCH HỢP BÊN THỨ 3 (OVERPASS API) ---
const fetchThirdPartyNFZ = async () => {
  const query = `[out:json][timeout:25];(way["aeroway"="aerodrome"](8.1,102.1,23.4,109.5);way["landuse"="military"](8.1,102.1,23.4,109.5););out body;>;out skel qt;`;
  try {
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
    );
    const geojson = osmtogeojson(response.data);

    map.addSource("third-party-zones", { type: "geojson", data: geojson });

    // Vẽ vùng cấm đỏ
    map.addLayer({
      id: "prohibited-layer",
      type: "fill",
      source: "third-party-zones",
      paint: {
        "fill-color": "#ef4444",
        "fill-opacity": 0.5,
        "fill-outline-color": "#b91c1c",
      },
      filter: [
        "all",
        ["any", ["==", "aeroway", "aerodrome"], ["==", "landuse", "military"]],
      ],
    });
  } catch (err) {
    console.error("Lỗi nạp vùng cấm:", err);
  }
};

const updateVisibility = () => {
  if (map.getLayer("prohibited-layer")) {
    map.setLayoutProperty(
      "prohibited-layer",
      "visibility",
      showNFZ.value ? "visible" : "none",
    );
  }
};

// --- LOGIC BAY (FLYTO) CHÍNH XÁC TUYỆT ĐỐI ---
const fetchCoordsAndFly = async (query, zoom) => {
  const vnBbox = "102.14,8.18,109.46,23.39"; // Giới hạn Việt Nam
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&country=VN&bbox=${vnBbox}&limit=1`;
  const res = await axios.get(url);
  if (res.data.features.length > 0) {
    map.flyTo({
      center: res.data.features[0].center,
      zoom,
      essential: true,
      duration: 2500,
    });
  }
};

const handleProvinceChange = async () => {
  const p = provinces.value.find((x) => x.code == selectedProvince.value);
  const res = await axios.get(
    `https://provinces.open-api.vn/api/p/${p.code}?depth=2`,
  );
  districts.value = res.data.districts;
  fetchCoordsAndFly(`${p.name}, Việt Nam`, 10);
};

const handleDistrictChange = async () => {
  const p = provinces.value.find((x) => x.code == selectedProvince.value);
  const d = districts.value.find((x) => x.code == selectedDistrict.value);
  const res = await axios.get(
    `https://provinces.open-api.vn/api/d/${d.code}?depth=2`,
  );
  wards.value = res.data.wards;
  fetchCoordsAndFly(`${d.name}, ${p.name}, Việt Nam`, 13);
};

const handleWardChange = () => {
  const p = provinces.value.find((x) => x.code == selectedProvince.value);
  const d = districts.value.find((x) => x.code == selectedDistrict.value);
  const w = wards.value.find((x) => x.code == selectedWard.value);
  fetchCoordsAndFly(`${w.name}, ${d.name}, ${p.name}, Việt Nam`, 16);
};
</script>

<style scoped>
@reference "../../assets/main.css";
.select-custom {
  @apply bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all disabled:opacity-50;
}
.input-custom {
  @apply w-full pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm py-2 outline-none focus:ring-2 focus:ring-teal-500;
}
</style>
