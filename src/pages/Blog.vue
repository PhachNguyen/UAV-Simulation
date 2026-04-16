<script setup>
import { ref, computed } from "vue";
import {
  Bell,
  Settings,
  Navigation,
  Cpu,
  Radar,
  Plane,
  History,
  Download,
  Compass,
  Share2,
  Globe,
  Box,
  ScanFace,
  Wifi,
  Zap,
  Video,
  Maximize2,
  ShieldCheck,
  Gauge,
  BatteryCharging,
  Radio,
  Thermometer,
  Ruler,
  Weight,
  CloudRain,
  Layers,
  Eye,
  Target,
  Award,
} from "lucide-vue-next";
import api from "@/utils/apis/axios";
import ProductOverview from "@/components/ProductOverview.vue";
import ProductDescription from "@/components/ProductDescription.vue";
import ProductSimulation from "@/components/ProductSimulation.vue";
import ProductSpecs from "@/components/ProductSpecs.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
// --- DATA CONSTANTS ---
// const NAVIGATION_LINKS = [
//   { name: "Thiết bị", active: true },
//   { name: "Viễn thám", active: false },
//   { name: "Điều khiển", active: false },
//   { name: "Lưu trữ", active: false },
// ];

// const SIDEBAR_MENU = [
//   { name: "Thông số chính", icon: Cpu, active: true },
//   { name: "Cảm biến", icon: Radar, active: false },
//   { name: "Hệ thống bay", icon: Navigation, active: false },
//   { name: "Nhật ký bay", icon: History, active: false },
// ];

// --- STATE MANAGEMENT ---
const route = useRoute();
const drone = ref(null);
const isLoading = ref(true);
const activeImage = ref("");
const isSimulating = ref(false);
const selectImage = (url) => {
  activeImage.value = url;
};

// 1. Hàm fetch dữ liệu từ BE
// Blog.vue

const fetchDroneDetail = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/drones/${route.params.id}`);

    // 1. Giải mã các trường JSON String (nếu có)
    const parsedSensors =
      typeof data.sensors === "string"
        ? JSON.parse(data.sensors)
        : data.sensors || [];
    const parsedThumbnails =
      typeof data.thumbnail === "string"
        ? JSON.parse(data.thumbnail)
        : data.thumbnail || [];
    let rawHotspots =
      typeof data.hotspots === "string"
        ? JSON.parse(data.hotspots)
        : data.hotspots || [];

    // 2. Chuyển đổi cấu trúc Hotspots (Sửa lỗi "position" từ seed.js sang "pos" cho 3D Viewer)
    const formattedHotspots = rawHotspots.map((spot) => {
      if (spot.position && typeof spot.position === "string") {
        const coords = spot.position.split(" ");
        return {
          ...spot,
          pos: {
            x: Number(coords[0]),
            y: Number(coords[1]),
            z: Number(coords[2]),
          },
        };
      }
      return spot;
    });

    // 3. Gán dữ liệu đã "sạch" vào biến drone
    drone.value = {
      ...data,
      sensors: parsedSensors,
      thumbnail: parsedThumbnails,
      hotspots: formattedHotspots,
    };

    // Gán ảnh mặc định ban đầu là ảnh chính
    activeImage.value = `http://localhost:5000${data.image}`;
  } catch (error) {
    console.error("Lỗi radar SkyLink:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchDroneDetail);

// / 2. MAPPING DỮ LIỆU: Biến đổi dữ liệu BE thành định dạng mà các Component con cần

// Gallery: Gộp ảnh chính và mảng thumbnail
const galleryData = computed(() => {
  if (!drone.value) return [];
  const images = [
    {
      id: "main",
      url: `http://localhost:5000${drone.value.image}`,
      title: "Ảnh chính",
    },
  ];

  if (drone.value.thumbnail && Array.isArray(drone.value.thumbnail)) {
    drone.value.thumbnail.forEach((img, index) => {
      images.push({
        id: index,
        url: `http://localhost:5000${img}`,
        title: `Góc nhìn ${index + 1}`,
      });
    });
  }
  return images;
});
// Highlights: Lấy từ mảng sensors hoặc thông tin đặc biệt
const highlightsData = computed(() => {
  if (!drone.value) return [];
  // Ví dụ: Lấy 3 cái đầu tiên trong hotspots hoặc sensors để làm highlights
  return (
    drone.value.hotspots?.slice(0, 3).map((h) => ({
      title: h.title,
      desc: h.desc,
      icon: ShieldCheck, // Cậu có thể tùy biến icon theo title
    })) || []
  );
});
// Specs: Đổ dữ liệu từ các trường flight_time, weight... vào
const detailedSpecs = computed(() => {
  if (!drone.value) return { flight: [], physical: [], transmission: [] };

  // Hàm bổ trợ để hiển thị giá trị hoặc N/A
  const displayVal = (val, unit) => {
    return val && val > 0 ? `${val} ${unit}` : "N/A (Đang cập nhật)";
  };

  return {
    flight: [
      {
        label: "Thời gian bay",
        value: displayVal(drone.value.range, "PHÚT"),
      },
      {
        label: "Vận tốc tối đa",
        value: displayVal(drone.value.max_speed, "KM/H"),
      },
      {
        label: "Phạm vi hoạt động",
        value: displayVal(drone.value.range, "KM"),
      },
      {
        label: "Hệ thống Camera",
        value: drone.value.camera || "N/A",
      },
    ],
    // physical: [
    //   {
    //     label: "Trọng lượng",
    //     value: drone.value.weight > 0 ? `${drone.value.weight} KG` : "N/A",
    //     icon: Weight,
    //   },
    //   {
    //     label: "Tỷ lệ mô hình",
    //     value: `Scale: ${drone.value.scale || "1:1"}`,
    //     icon: Ruler,
    //   },
    // ],
    transmission: [
      {
        label: "Cảm biến tích hợp",
        // Hiển thị danh sách sensors: ["ds", "đư", "fd"] -> "ds, đư, fd"
        value:
          drone.value.sensors?.length > 0
            ? drone.value.sensors.join(", ").toUpperCase()
            : "Chưa tích hợp cảm biến",
      },
    ],
  };
});
// const toggleSim = () => {
//   isSimulating.value = !isSimulating.value;
// };
</script>

<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
    <div
      class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"
    ></div>
  </div>

  <div
    v-else-if="drone"
    class="min-h-screen bg-white text-[#1a1a1a] font-sans antialiased selection:bg-[#0b1f3f] selection:text-white px-8 py-10 space-y-16"
  >
    <ProductOverview
      :gallery="galleryData"
      :description="drone.description"
      :activeImage="activeImage"
      @update:image="(url) => (activeImage = url)"
      :productName="drone.name"
    />

    <ProductDescription
      :description="drone.description"
      :productName="drone.name"
    />

    <ProductSpecs :specs="detailedSpecs" />

    <ProductSimulation
      :isSimulating="isSimulating"
      :modelUrl="`http://localhost:5000${drone.model3d}`"
      :hotspots="drone.hotspots"
      @toggle="isSimulating = !isSimulating"
      @update:activeSpotId="(id) => console.log('Hotspot được chọn:', id)"
    />
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.font-headline {
  font-family: "Inter", sans-serif;
  font-weight: 900;
}
.hud-grid {
  background-size: 40px 40px;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}
.animate-fade-in {
  animation: fadeIn 1.5s ease-out forwards;
}
</style>
