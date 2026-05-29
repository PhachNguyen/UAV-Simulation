<template>
  <div
    class="h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-800 flex flex-col p-4"
  >
    <!-- <header
      class="shrink-0 flex justify-center gap-8 py-3 text-sm font-medium text-slate-600 bg-white shadow-sm z-10"
    >
      <a href="#" class="hover:text-blue-600">Trang chủ</a>
      <a href="#" class="hover:text-blue-600">Danh mục UAV</a>
      <a href="#" class="hover:text-blue-600 text-blue-800 font-semibold"
        >Tài nguyên học tập</a
      >
      <a href="#" class="hover:text-blue-600">Hồ sơ</a>
    </header> -->

    <main
      class="flex-1 min-h-0 w-full max-w-[1600px] mx-auto px-4 py-4 flex flex-col"
    >
    <div class=" cursor-pointer shrink-0 mb-2">
    <button 
      @click="goBack"
      class=" cursor-pointer group flex items-center gap-1.5 text-slate-500 hover:text-[#1a2b4c] transition-colors duration-200"
    >
      <div class="p-1 group-hover:bg-slate-200 rounded-full transition-colors">
        <ChevronLeftIcon class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </div>
      
      <span class="text-sm font-medium">Quay lại danh sách</span>
    </button>
  </div>

  <!-- <div class="shrink-0 mb-4">
    <h1 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">UAV Unified Detail Dashboard</h1>
    <p class="text-slate-600 text-sm">All-in-one UAV technical detail dashboard for educational platforms.</p>
  </div> -->
      <!-- <div class="shrink-0 mb-4">
        <h1 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">
          UAV Unified Detail Dashboard
        </h1>
        <p class="text-slate-600 text-sm">
          All-in-one UAV technical detail dashboard for educational platforms.
        </p>
      </div> -->

      <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        <div class="lg:col-span-3 flex flex-col gap-4 min-h-0">
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col h-[45%]">
  <h2 class="text-[20px] font-bold mb-3 shrink-0">Thông tin Drone {{ drone.name }}</h2>
  <div class="bg-slate-100 rounded-xl overflow-hidden flex-1 min-h-0 flex items-center justify-center relative">
    
   <img 
  :src="gallery[selectedIndex]" 
  alt="Selected Drone" 
  class="object-cover w-full h-full transition-all duration-500"
  :key="selectedIndex" 
/>
    
    <div class="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
      {{ selectedIndex + 1 }} / {{ gallery.length }}
    </div>
  </div>
</div>

          <div
            class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex-1 flex flex-col min-h-0"
          >
            <div class="flex justify-between items-center mb-3 shrink-0">
              <h2 class="text-base font-bold">Thư viện ảnh</h2>
              <div class="flex gap-2">
                <button
                  class="p-1 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <ChevronLeftIcon class="w-4 h-4" />
                </button>
                <button
                  class="p-1 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <ChevronRightIcon class="w-4 h-4" />
                </button>
              </div>
            </div>

     <div class="flex-1 overflow-y-auto pr-1 custom-scrollbar w-full">
        <!-- Thumbnails -->
  <div class="grid grid-cols-3 gap-2">
    <div
      v-for="(img, index) in gallery"
      :key="index"
      @click="selectedIndex = index" 
      class="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200"
      :class="
        selectedIndex === index
          ? 'border-blue-800 shadow-md ring-2 ring-blue-800/20'
          : 'border-transparent hover:border-slate-300'
      "
    >
      <img
        :src="img"
        alt="Thumbnail"
        class="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
        :class="{ 'opacity-100': selectedIndex === index, 'opacity-70': selectedIndex !== index }"
      />
    </div>
  </div>
 
</div>
          </div>
  
        </div>
<!--  Mô hình 3D -->
   <div class="lg:col-span-6 bg-[#ebf0f7] rounded-3xl p-4 shadow-inner relative flex flex-col border border-slate-200 min-h-0">
  <div class="flex justify-between items-center mb-4 shrink-0">
    <h2 class="text-lg font-bold text-slate-800">
      Mô hình cấu tạo
    </h2>
    <button
      v-if="isLoggedIn"
      class="flex items-center gap-2 px-3 py-1.5 bg-white text-xs font-medium rounded-full shadow-sm hover:bg-slate-50 transition-colors"
    >
      <RefreshCcwIcon class="w-3.5 h-3.5" /> Reset View
    </button>
  </div>

  <div
    class="flex-1 bg-gradient-to-b from-transparent to-slate-200/50 rounded-2xl relative min-h-0 overflow-hidden flex items-center justify-center"
  >
    <div v-if="!isLoggedIn" class="text-center p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 max-w-sm m-4 z-10">
      <div class="mx-auto w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <i class="ph ph-lock text-2xl text-slate-900"></i>
      </div>
      
      <h3 class="text-lg font-bold text-slate-900 mb-2">Yêu cầu đăng nhập</h3>
      <p class="text-slate-500 text-sm mb-6 leading-relaxed">
        Đăng nhập tài khoản để tương tác và xem chi tiết cấu tạo mô hình 3D của UAV này.
      </p>
      
      <button @click="goToLogin" class="bg-[#0F172B] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
        Đăng nhập ngay
      </button>
    </div>

    <Uav3DViewer 
      v-else 
      class="w-full h-full" 
      :modelSrc="`http://localhost:5000${drone.model3d}`" 
      :customHotspots="drone.hotspots" 
    />
  </div>
</div>

        <div class="lg:col-span-3 flex flex-col gap-4 min-h-0">
                  <!-- Note -->
<div
            class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <h2 class="text-lg font-bold mb-5">Thông tin cần thiết</h2>
           <div class="grid grid-cols-2 gap-y-6 gap-x-2">
  <div v-for="(spec, index) in technicalSpecs" :key="spec.name" class="flex gap-3 items-start">
    
    <div class="w-9 h-9 bg-[#1a2b4c] text-white rounded-lg shrink-0 flex items-center justify-center font-bold text-sm">
      {{ index + 1 }}
    </div>
    
    <div>
      <p class="text-xs font-semibold text-slate-900 leading-tight">
        {{ spec.name }}
      </p>
      <p class="text-xs text-slate-500 mt-1">{{ spec.value }}</p>
    </div>
    
  </div>
</div>
          </div>

          <div
            class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex-1 flex flex-col min-h-0"
          >
            <h2 class="text-base font-bold mb-2 shrink-0">Mô tả & Ứng dụng</h2>
          <div class="flex-1 overflow-y-auto pr-2 mb-4 custom-scrollbar">
         <div class="text-[14px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                {{ drone?.description || 'Đang cập nhật mô tả...' }}
              </div>
  <!-- <div class="text-[11px] lg:text-xs text-slate-600 leading-relaxed text-justify space-y-4">
    <p>
      Hệ thống UAV giáo dục này được phát triển như một nền tảng thí nghiệm di động toàn diện, phục vụ cho việc đào tạo chuyên sâu trong lĩnh vực hàng không không người lái. Thiết kế khung máy (airframe) sử dụng vật liệu composite siêu nhẹ nhưng đảm bảo độ bền cơ học cao, giúp tối ưu hóa hiệu suất khí động học và kéo dài thời gian hoạt động trong các môi trường khắc nghiệt.
    </p>

    <p>
      <strong class="text-slate-800">Cốt lõi công nghệ:</strong> Thiết bị được tích hợp bộ điều khiển bay (Flight Controller) thế hệ mới nhất, hỗ trợ xử lý tín hiệu từ hệ thống định vị GPS/GLONASS đa băng tần và cảm biến IMU 6 trục. Điều này cho phép học viên nghiên cứu sâu về các thuật toán cân bằng, bù trừ sai số và cơ chế ổn định vị trí trong điều kiện nhiễu động gió mạnh. Cụm camera 4K gắn trên Gimbal 3 trục không chỉ cung cấp hình ảnh trực quan mà còn là nguồn dữ liệu quan trọng cho các bài toán xử lý ảnh thời gian thực.
    </p>

    <p>
      <strong class="text-slate-800">Hệ sinh thái phần mềm:</strong> Điểm vượt trội của hệ thống là khả năng tương thích hoàn hảo với các nền tảng lập trình như Python (thông qua MAVLink) và môi trường giả lập 3D. Sinh viên có thể tự thiết lập các chuỗi lệnh điều khiển tự động (Autonomy), triển khai các kỹ thuật tránh vật cản bằng cảm biến siêu âm và phát triển lộ trình bay tối ưu (Path Planning) ngay trên giao diện Web Dashboard này.
    </p>

    <p>
      <strong class="text-slate-800">Ứng dụng đa ngành:</strong> Thiết bị đóng vai trò là cầu nối giữa lý thuyết và thực tiễn trong nhiều lĩnh vực:
      <ul class="list-disc ml-4 mt-1 space-y-1">
        <li><span class="font-medium text-slate-700">Trắc địa:</span> Thu thập dữ liệu đám mây điểm (Point Cloud) để dựng mô hình 3D địa hình.</li>
        <li><span class="font-medium text-slate-700">Nông nghiệp:</span> Phân tích chỉ số sức khỏe cây trồng qua dữ liệu hình ảnh đa phổ.</li>
        <li><span class="font-medium text-slate-700">Giám sát:</span> Kiểm tra an toàn hạ tầng và quan trắc biến đổi môi trường tại các khu vực khó tiếp cận.</li>
      </ul>
    </p>

    <p>
      Mọi dữ liệu đo đạc (Telemetry) bao gồm vận tốc, độ cao, điện áp pin và trạng thái kết nối đều được số hóa và truyền tải theo thời gian thực về máy chủ trung tâm. Điều này giúp giảng viên và sinh viên có cái nhìn trực quan, hỗ trợ tối đa cho việc phân tích hậu kiểm và tối ưu hóa các dự án nghiên cứu khoa học chuyên sâu về UAV.
    </p>
  </div> -->
</div>
             <!-- <router-link
  to="/test"
  class="shrink-0 w-full py-2.5 border-2 border-[#1a2b4c] text-[#1a2b4c] bg-transparent rounded-xl text-sm font-bold shadow-sm hover:bg-[#1a2b4c] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 no-underline"
>
  <span>Xem Bài giảng</span>
  <ArrowRightIcon class="w-4 h-4" />
</router-link> -->
          </div>
        </div>
      </div>

      <div class="shrink-0 flex justify-end gap-6 mt-3 text-xs text-slate-500">
        <a href="#" class="hover:text-slate-800">Liên hệ Hỗ trợ</a>
        <a href="#" class="hover:text-slate-800">Tài liệu Kỹ thuật PDF</a>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/utils/apis/axios";
import { ChevronLeftIcon, ArrowLeftIcon, ChevronRightIcon, ArrowRightIcon, BoxIcon,
  BatteryIcon,
  CameraIcon,
  TargetIcon,
  ClockIcon,
  GaugeIcon,
  MapPinIcon,
  WeightIcon, } from 'lucide-vue-next';
import { useRouter, useRoute } from "vue-router"; // Thêm useRoute
import Uav3DViewer from "@/components/Uav3DViewer.vue";

const router = useRouter();
const route = useRoute(); // Khai báo route để lấy ID từ URL
const selectedIndex = ref(0);
const isLoading = ref(false); // Khai báo biến loading
const drone = ref({});
const gallery = ref([]); // Khởi tạo gallery rỗng để chờ API
const technicalSpecs = ref([]);
// THÊM ĐOẠN NÀY ĐỂ KIỂM TRA ĐĂNG NHẬP:
const checkAuth = () => {
  // Thay 'access_token' bằng key lưu token thực tế của bạn trong localStorage
  const token = localStorage.getItem("userToken"); 
  return !!token;
};
const isLoggedIn = ref(checkAuth());

const goToLogin = () => {
  router.push("/login"); // Chuyển hướng sang trang đăng nhập
};
const goBack = () => {
  router.push('/services');
};

const fetchDroneDetail = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/drones/${route.params.id}`); // Sử dụng route.params.id để lấy ID từ URL`);

    // Giải mã thumbnails và gán vào gallery
    const parsedThumbnails = typeof data.thumbnail === "string"
        ? JSON.parse(data.thumbnail)
        : data.thumbnail || [];
    
    // Map lại đường dẫn ảnh từ server (giả sử server chạy ở port 5000)
    gallery.value = parsedThumbnails.map(img => `http://localhost:5000${img}`);
    const specsFromBE = data.specifications || [];
    technicalSpecs.value = specsFromBE;
    // Xử lý Hotspots
    let rawHotspots = typeof data.hotspots === "string"
        ? JSON.parse(data.hotspots)
        : data.hotspots || [];

    const formattedHotspots = rawHotspots.map((spot) => {
      if (spot.position && typeof spot.position === "string") {
        const coords = spot.position.split(" ");
        return {
          ...spot,
          pos: { x: Number(coords[0]), y: Number(coords[1]), z: Number(coords[2]) },
        };
      }
      return spot;
    });

    drone.value = {
      ...data,
      thumbnail: parsedThumbnails,
      hotspots: formattedHotspots,
    };

  } catch (error) {
    console.error("Lỗi radar SkyLink:", error);
  } finally {
    isLoading.value = false;
  }
};

// ĐƯA ONMOUNTED RA NGOÀI HÀM
onMounted(() => {
  fetchDroneDetail();
});
</script>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
