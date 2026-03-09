<template>
  <div class="min-h-screen bg-slate-50">
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-[1440px] mx-auto px-6 py-8">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <h1
              class="text-3xl font-black text-slate-900 uppercase tracking-tighter italic"
            >
              Dữ liệu <span class="text-teal-600">Thu thập</span>
            </h1>
            <p class="text-slate-500 text-sm font-medium mt-1">
              Kho lưu trữ hình ảnh, video và dữ liệu cảm biến từ các nhiệm vụ.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-right mr-4 hidden sm:block">
              <p
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Dung lượng đã dùng
              </p>
              <p class="text-sm font-bold text-slate-900">128.4 GB / 1 TB</p>
              <div
                class="w-32 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden"
              >
                <div class="w-1/3 h-full bg-teal-500"></div>
              </div>
            </div>
            <button
              class="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all"
            >
              <Settings class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 mt-8">
      <div
        class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <button
            v-for="type in ['Tất cả', 'Hình ảnh', 'Video', 'Lidar']"
            :key="type"
            @click="activeType = type"
            :class="[
              'px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all',
              activeType === type
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-slate-500 hover:bg-slate-50',
            ]"
          >
            {{ type }}
          </button>
        </div>

        <div class="flex gap-3 flex-1 max-w-md">
          <div class="relative flex-1">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            />
            <input
              type="text"
              placeholder="Tìm theo tên nhiệm vụ..."
              class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <button
            class="bg-teal-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-teal-700 transition-all flex items-center gap-2"
          >
            <Filter class="w-4 h-4" /> Lọc
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 py-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="item in dataItems"
          :key="item.id"
          class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
        >
          <div class="relative aspect-video overflow-hidden bg-slate-200">
            <img
              :src="item.thumbnail"
              class="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
            >
              <button
                class="p-3 bg-white text-slate-900 rounded-full hover:bg-teal-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
              >
                <Eye class="w-5 h-5" />
              </button>
              <button
                class="p-3 bg-white text-slate-900 rounded-full hover:bg-teal-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
              >
                <Download class="w-5 h-5" />
              </button>
            </div>
            <div
              class="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-black text-white uppercase tracking-widest"
            >
              {{ item.format }}
            </div>
          </div>

          <div class="p-5">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-bold text-slate-900 text-sm truncate w-40">
                  {{ item.title }}
                </h3>
                <p class="text-[10px] font-bold text-teal-600 uppercase">
                  {{ item.mission }}
                </p>
              </div>
              <span class="text-[10px] font-mono font-bold text-slate-400">{{
                item.size
              }}</span>
            </div>

            <div
              class="flex items-center justify-between mt-4 pt-4 border-t border-slate-50"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"
                >
                  <Plane class="w-3 h-3 text-slate-500" />
                </div>
                <span class="text-[11px] font-bold text-slate-600">{{
                  item.drone
                }}</span>
              </div>
              <span
                class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter"
                >{{ item.date }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Search,
  Filter,
  Eye,
  Download,
  Settings,
  Plane,
} from "lucide-vue-next";

const activeType = ref("Tất cả");

const dataItems = [
  {
    id: 1,
    title: "Khảo sát địa hình Đồi Chè",
    mission: "Nhiệm vụ Nông Nghiệp #04",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    format: "RAW + GeoTIFF",
    size: "1.2 GB",
    drone: "AgriSpread X1",
    date: "12 TH05, 2024",
  },
  {
    id: 2,
    title: "Kiểm tra kết cấu Cầu Rồng",
    mission: "Giám sát Công trình #12",
    thumbnail: "https://images.unsplash.com/photo-1545138697-45eb2968b249",
    format: "4K Video",
    size: "4.5 GB",
    drone: "SkyMaster Pro",
    date: "10 TH05, 2024",
  },
  {
    id: 3,
    title: "Bản đồ nhiệt KCN cao",
    mission: "An ninh Nhiệt #02",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758",
    format: "Thermal Data",
    size: "850 MB",
    drone: "Sentinel-X",
    date: "08 TH05, 2024",
  },
  {
    id: 4,
    title: "Quét Lidar Rừng Quốc Gia",
    mission: "Bảo tồn Tài nguyên #09",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    format: "Point Cloud",
    size: "12.4 GB",
    drone: "NightHawk Stealth",
    date: "05 TH05, 2024",
  },
];
</script>
