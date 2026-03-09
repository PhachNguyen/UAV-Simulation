<template>
  <div class="min-h-screen bg-slate-50">
    <div class="bg-slate-900 text-white py-10">
      <div class="max-w-[1440px] mx-auto px-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div class="space-y-2 text-center md:text-left">
            <h2
              class="text-teal-400 font-black tracking-widest text-sm uppercase italic"
            >
              SkyLink Fleet Registry
            </h2>
            <h1 class="text-4xl font-black uppercase tracking-tighter">
              Hệ thống <span class="text-slate-400">Thiết bị</span>
            </h1>
          </div>

          <div class="flex gap-8 border-l border-white/10 pl-8 hidden lg:flex">
            <div v-for="s in summaryStats" :key="s.label">
              <div class="text-[10px] text-slate-400 font-bold uppercase mb-1">
                {{ s.label }}
              </div>
              <div class="text-2xl font-black italic">{{ s.value }}</div>
            </div>
          </div>

          <button
            class="bg-teal-500 hover:bg-teal-400 text-slate-900 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-teal-500/20 active:scale-95"
          >
            + Đăng ký thiết bị
          </button>
        </div>
      </div>
    </div>

    <div
      class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div
        class="max-w-[1440px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4"
      >
        <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap',
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-xl'
                : 'text-slate-500 hover:bg-slate-100',
            ]"
          >
            {{ cat }} ({{ getCount(cat) }})
          </button>
        </div>

        <div class="relative flex-1 max-w-md">
          <Search
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm theo tên, ID hoặc Model..."
            class="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 transition-all outline-none"
          />
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 py-12">
      <div
        v-if="filteredUavs.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
      >
        <UavCard
          v-for="uav in filteredUavs"
          :key="uav.id"
          :uav="uav"
          @open-sim="handleOpenSimulation"
        />
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-32 opacity-30"
      >
        <div class="p-10 bg-slate-200 rounded-full mb-6">
          <Radio class="w-20 h-20" />
        </div>
        <h3 class="text-2xl font-black uppercase italic">
          Mất tín hiệu dữ liệu
        </h3>
        <p class="font-medium">
          Không tìm thấy drone phù hợp với bộ lọc hiện tại
        </p>
      </div>
    </div>

    <div
      class="max-w-[1440px] mx-auto px-6 pb-20 border-t border-slate-200 pt-10"
    >
      <div
        class="flex justify-between items-center text-slate-400 text-[11px] font-bold uppercase tracking-widest"
      >
        <span
          >Hiển thị {{ filteredUavs.length }} / {{ uavList.length }} thiết
          bị</span
        >
        <div class="flex gap-4">
          <button class="hover:text-teal-600">Trang trước</button>
          <div class="flex gap-2">
            <span class="text-slate-900">1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <button class="hover:text-teal-600">Trang tiếp</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search, Radio } from "lucide-vue-next";
import UavCard from "@/components/UavCard.vue";

const activeCategory = ref("Tất cả");
const searchQuery = ref("");

const categories = [
  "Tất cả",
  "Trinh sát",
  "Vận tải",
  "Quay phim",
  "Nông nghiệp",
];

const summaryStats = [
  { label: "Hoạt động", value: "18/24" },
  { label: "Tổng giờ bay", value: "1,240h" },
  { label: "Sức khỏe đội bay", value: "98%" },
];

const uavList = ref([
  // --- NHÓM TRINH SÁT ---
  {
    id: "SKL-001",
    name: "Sentinel-X Intelligence",
    price: "9,500",
    status: "Sẵn sàng",
    badgeColor: "bg-teal-500",
    category: "Trinh sát",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
    stats: { "Tầm xa": "25km", "Cảm biến": "Lidar 3D", Pin: "55p" },
  },
  {
    id: "SKL-002",
    name: "NightHawk Stealth",
    price: "12,200",
    status: "Đang bay",
    badgeColor: "bg-blue-600",
    category: "Trinh sát",
    image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8",
    stats: { "Tầm xa": "40km", "Cảm biến": "Thermal", Pin: "120p" },
  },
  // --- NHÓM VẬN TẢI ---
  {
    id: "SKL-003",
    name: "Atlas Carrier V2",
    price: "24,000",
    oldPrice: "28,500",
    status: "Bảo trì",
    badgeColor: "bg-amber-500",
    category: "Vận tải",
    image: "https://images.unsplash.com/photo-1563261057-0056627608e0",
    stats: {
      "Tải trọng": "50kg",
      "Động cơ": "Octo-Core",
      "Chống nước": "IP67",
    },
  },
  {
    id: "SKL-004",
    name: "SwiftDelivery Pod",
    price: "5,800",
    status: "Sẵn sàng",
    badgeColor: "bg-teal-500",
    category: "Vận tải",
    image: "https://images.unsplash.com/photo-1521671444658-96f302063065",
    stats: { "Tải trọng": "5kg", "Tốc độ": "110km/h", Pin: "30p" },
  },
  // --- NHÓM QUAY PHIM ---
  {
    id: "SKL-005",
    name: "CineMaster Pro 8K",
    price: "3,400",
    oldPrice: "4,100",
    status: "Sẵn sàng",
    badgeColor: "bg-teal-500",
    category: "Quay phim",
    image: "https://images.unsplash.com/photo-1473966968600-fa804b86d32a",
    stats: { Camera: "8K RAW", Gimbal: "3-Axis", "Trọng lượng": "1.2kg" },
  },
  {
    id: "SKL-006",
    name: "FPV Ghost Racer",
    price: "1,200",
    status: "Đang bay",
    badgeColor: "bg-blue-600",
    category: "Quay phim",
    image: "https://images.unsplash.com/photo-1533230393619-bcad81548223",
    stats: { "Tốc độ": "160km/h", Latancy: "20ms", "Góc nhìn": "150°" },
  },
  // --- NHÓM NÔNG NGHIỆP ---
  {
    id: "SKL-007",
    name: "AgriSpread X1",
    price: "15,500",
    status: "Sẵn sàng",
    badgeColor: "bg-teal-500",
    category: "Nông nghiệp",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758",
    stats: { "Bình chứa": "20L", Phun: "10ha/h", Rada: "Tránh vật cản" },
  },
  {
    id: "SKL-008",
    name: "BioSurvey Scan",
    price: "7,200",
    status: "Ngoại tuyến",
    badgeColor: "bg-slate-400",
    category: "Nông nghiệp",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    stats: { "Phân tích": "NDVI", "Độ chính xác": "2cm", RTK: "Hỗ trợ" },
  },
]);

const getCount = (cat) => {
  if (cat === "Tất cả") return uavList.value.length;
  return uavList.value.filter((u) => u.category === cat).length;
};

const filteredUavs = computed(() => {
  return uavList.value.filter((uav) => {
    const matchesCat =
      activeCategory.value === "Tất cả" ||
      uav.category === activeCategory.value;
    const matchesSearch =
      uav.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      uav.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCat && matchesSearch;
  });
});

const handleOpenSimulation = (uav) => {
  console.log(`Starting simulator for ${uav.id}...`);
};
</script>
