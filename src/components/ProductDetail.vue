<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500 selection:text-white"
  >
    <header
      class="fixed top-0 w-full z-50 bg-[#1D293D] backdrop-blur-md border-b border-gray-200 transition-all duration-300 shadow-sm"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <router-link
            to="/services"
            class="text-white hover:text-[#0B1F3F] transition"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </router-link>
          <span class="text-lg tracking-wider text-white">{{
            product.name
          }}</span>
        </div>
        <nav
          class="hidden md:flex items-center gap-8 text-sm font-medium text-white"
        >
          <a href="#overview" class="hover:text-gray-300 transition"
            >Tổng quan</a
          >
          <a href="#features" class="hover:text-gray-300 transition"
            >Công nghệ</a
          >
          <a href="#3d-model" class="hover:text-gray-300 transition"
            >Mô hình 3D</a
          >
          <a href="#specs" class="hover:text-gray-300 transition">Thông số</a>
        </nav>
        <button
          class="bg-[#0B1F3F] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#0B1F3F]/90 shadow-md shadow-[#0B1F3F]/20 transition"
        >
          Nhận báo giá
        </button>
      </div>
    </header>

    <ProductOverview
      :product="product"
      :modelValue="activeImageIndex"
      @update:modelValue="activeImageIndex = $event"
    />

    <section
      id="features"
      class="max-w-7xl mx-auto px-6 py-24 font-sans bg-white"
    >
      <div class="mb-16 md:mb-20">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#0B1F3F] font-bold tracking-widest uppercase text-[10px] mb-6"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B1F3F] opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-[#0B1F3F]"
            ></span>
          </span>
          Cấu trúc khí động học
        </div>
        <h2
          class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6"
        >
          Thiết Kế <span class="text-[#0B1F3F]">Đột Phá</span>
          <br class="hidden md:block" />
          & Bền Bỉ
        </h2>
        <p class="text-slate-500 text-lg max-w-2xl leading-relaxed">
          Khí tài SkyLink được tối ưu hóa cho các nhiệm vụ đặc biệt với vật liệu
          siêu bền và khả năng tùy biến module linh hoạt.
        </p>
      </div>

      <div class="grid grid-cols-12 gap-4 md:gap-6">
        <div
          class="col-span-12 lg:col-span-8 group relative bg-slate-50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-slate-100 hover:border-[#0B1F3F]/20 transition-all duration-500"
        >
          <div class="relative z-10 flex flex-col h-full">
            <div
              class="p-3 bg-white w-fit rounded-2xl shadow-sm mb-8 group-hover:bg-[#0B1F3F] group-hover:text-white transition-colors duration-500"
            >
              <Hexagon :size="28" stroke-width="1.5" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">
              Vỏ hợp kim Carbon nguyên khối
            </h3>
            <p class="text-slate-500 max-w-md leading-relaxed mb-8">
              Khung máy đúc nguyên khối từ sợi carbon siêu nhẹ kết hợp nhôm hàng
              không, giảm 30% trọng lượng nhưng vẫn giữ độ cứng cáp tuyệt đối.
            </p>
            <div class="mt-auto flex justify-center">
              <img
                :src="product?.images?.[2] || '/placeholder-drone.png'"
                class="w-full max-w-sm object-contain transform group-hover:scale-110 transition-transform duration-1000"
                alt="UAV Structure"
              />
            </div>
          </div>
          <div
            class="absolute inset-0 opacity-[0.03] pointer-events-none"
            :style="{
              backgroundImage: 'radial-gradient(#0B1F3F 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }"
          ></div>
        </div>

        <div
          class="col-span-12 lg:col-span-4 bg-[#0B1F3F] rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden group"
        >
          <div class="relative z-10">
            <div
              class="p-3 bg-white/10 backdrop-blur-md w-fit rounded-2xl border border-white/10 mb-8"
            >
              <Zap :size="28" stroke-width="1.5" class="text-blue-400" />
            </div>
            <h3 class="text-2xl font-bold mb-4 leading-tight">
              Động cơ điện từ <br />không chổi than kép
            </h3>
            <p class="text-slate-300/80 text-sm leading-relaxed">
              Cụm rô-to hiệu suất cao giúp triệt tiêu tiếng ồn cơ học và gia
              tăng lực nâng đáng kể cho các nhiệm vụ tải nặng.
            </p>
          </div>
          <div class="mt-12">
            <div class="text-5xl font-black opacity-20 tracking-tighter">
              POWER-X
            </div>
          </div>
          <Fan
            :size="200"
            class="absolute -bottom-10 -right-10 opacity-5 group-hover:rotate-90 transition-transform duration-1000"
          />
        </div>

        <div
          class="col-span-12 lg:col-span-7 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
        >
          <div class="flex-1">
            <div class="p-3 bg-slate-50 w-fit rounded-2xl mb-6">
              <LayoutGrid
                :size="28"
                stroke-width="1.5"
                class="text-[#0B1F3F]"
              />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-4">
              Module Đa Nhiệm
            </h3>
            <p class="text-slate-500 leading-relaxed">
              Kiến trúc Plug-and-Play cho phép thay đổi thiết bị (camera nhiệt,
              lồng thả hàng) chỉ trong vài giây thông qua khóa lẫy cơ học.
            </p>
          </div>
          <div
            class="w-full md:w-48 h-40 bg-slate-50 rounded-3xl flex flex-col items-center justify-center border border-dashed border-slate-300"
          >
            <span class="text-5xl font-black text-[#0B1F3F]"
              >15<span class="text-xl font-normal text-slate-400 ml-1"
                >kg</span
              ></span
            >
            <span
              class="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-2 text-center px-4"
              >Payload Max</span
            >
          </div>
        </div>

        <div
          class="col-span-12 lg:col-span-5 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white group relative overflow-hidden transition-all duration-500 hover:bg-black"
        >
          <div class="flex items-start justify-between relative z-10">
            <div>
              <div
                class="p-3 bg-blue-500/20 w-fit rounded-2xl mb-6 border border-blue-500/30"
              >
                <ShieldCheck
                  :size="28"
                  stroke-width="1.5"
                  class="text-blue-400"
                />
              </div>
              <h3 class="text-2xl font-bold mb-3">Chuẩn IP67</h3>
              <p class="text-slate-400 text-sm leading-relaxed max-w-[240px]">
                Chống bụi mịn, chịu mưa nặng hạt và hoạt động từ -20°C đến 50°C.
              </p>
            </div>
            <div class="text-right">
              <CloudRain :size="48" class="text-slate-800" />
            </div>
          </div>
          <div class="mt-8 flex gap-2">
            <div
              v-for="i in 3"
              :key="i"
              class="h-1 w-12 bg-blue-500/20 rounded-full overflow-hidden"
            >
              <div
                class="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]"
                :style="{ animationDelay: `${i * 0.5}s` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ProductSimulation />

    <ProductSpecs :specs="productSpecs" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import { uavList } from "@/data/uavData";
import ProductSimulation from "./ProductSimulation.vue";
import ProductSpecs from "./ProductSpecs.vue";
import ProductOverview from "./ProductOverview.vue";

const route = useRoute();
import {
  Hexagon,
  Zap,
  LayoutGrid,
  ShieldCheck,
  Fan,
  CloudRain,
} from "lucide-vue-next";
// --- LOGIC XỬ LÝ ẢNH ---
const activeImageIndex = ref(0); // Quản lý index ảnh đang xem

// Tìm kiếm sản phẩm
const product = computed(() => {
  const idFromUrl = route.params.id;
  const result = uavList.find((item) => item.id === parseInt(idFromUrl));

  return (
    result || {
      name: "DJI Mavic 4 Pro",
      description:
        "Khí tài bay nhỏ gọn với sức mạnh ghi hình chuyên nghiệp, trang bị hệ thống cảm biến tránh vật cản toàn diện và đường truyền O4+ tối tân.",
      images: [
        "/img/Drone cam tu.png",
        "/img/UCAV-13_0.png",
        "/img/UAV-100AI.png",
      ],
    }
  );
});

// Giữ lại bộ dữ liệu Specs của bạn
const productSpecs = {
  "Thông tin Máy bay": {
    "Trọng lượng cất cánh": "Dưới 249 g (Bản tiêu chuẩn)",
    "Kích thước": "Gập: 136×62×165 mm | Mở: 233×280×79 mm",
    "Tốc độ tối đa": "12 m/s (Môi trường không gió)",
    "Thời gian bay tối đa": "31 phút",
    "Kháng gió tối đa": "10.7 m/s (Cấp 5)",
  },
  "Hệ thống Camera": {
    "Cảm biến hình ảnh": "1/1.3-inch CMOS",
    "Ống kính": "FOV 82.1°, khẩu độ f/1.7",
    "Độ phân giải video": "4K (3840×2160) @24/25/30/48/50/60/100fps",
    "Chế độ màu": "Normal, D-Log M (10-bit)",
  },
  "Truyền dữ liệu": {
    "Hệ thống truyền": "DJI O4",
    "Chất lượng xem trực tiếp": "1080p/60fps",
    "Khoảng cách tối đa": "13 km (FCC)",
  },
};
</script>

<style scoped>
/* Ẩn thanh cuộn ngang của Thumbnail */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Đảm bảo cuộn mượt */
html {
  scroll-behavior: smooth;
}
</style>
