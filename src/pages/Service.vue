<template>
  <div
    class="min-h-screen bg-[#F8FAFC] font-sans relative selection:bg-blue-200"
  >
    <div
      class="absolute inset-0 pointer-events-none z-0"
      style="
        background-image:
          linear-gradient(#e2e8f0 1px, transparent 1px),
          linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
        background-size: 60px 60px;
      "
    ></div>

    <!-- <header
      class="bg-[#2C3A47] text-white h-16 flex items-center justify-between px-8 sticky top-0 z-50 shadow-md"
    >
      <div class="text-2xl font-bold tracking-tight">Drone Tech Catalog</div>

      <div class="flex items-center gap-10">
        <nav class="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" class="hover:text-blue-300 transition-colors">Home</a>
          <a href="#" class="text-white border-b-2 border-white pb-1"
            >Catalog</a
          >
          <a href="#" class="hover:text-blue-300 transition-colors"
            >Technology</a
          >
          <a href="#" class="hover:text-blue-300 transition-colors">About Us</a>
          <a href="#" class="hover:text-blue-300 transition-colors">Contact</a>
        </nav>

        <div class="relative">
          <input
            type="text"
            class="bg-slate-600/50 border border-slate-500 rounded-md py-1.5 px-4 pr-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 w-48 transition-all"
          />
          <svg
            class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </header> -->

    <div
      class="max-w-[1600px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 relative z-10"
    >
      <DroneSidebar :categories="categories" :filters="filterData" />
      <!--  Hiển thị danh mục và mô tả ngắn về danh mục đó -->

      <main class="flex-1 flex flex-col">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <UavCard
            v-for="drone in drones"
            :key="drone.id"
            :drone="drone"
            @details="onViewDetails"
          />
        </div>
      </main>
    </div>

    <div
      class="bg-[#2C3A47] text-slate-300 py-4 flex justify-center items-center gap-2 text-sm relative z-10 w-full mt-auto border-t border-slate-700"
    >
      <button
        @click="prevPage"
        :disabled="pagination.currentPage === 1"
        class="cursor-pointer px-2 h-8 flex items-center justify-center hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          class="w-3 h-3 rotate-180 cu"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        Trước
      </button>

      <div v-for="(page, index) in displayedPages" :key="index">
        <span v-if="page === '...'" class="px-2 text-slate-500">...</span>

        <button
          v-else
          @click="changePage(page)"
          :class="[
            'w-8 h-8 flex items-center justify-center rounded font-medium transition-all cursor-pointer',
            pagination.currentPage === page
              ? 'bg-[#4787A8] text-white shadow-lg shadow-blue-900/20'
              : 'hover:bg-slate-700 hover:text-white',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="nextPage"
        :disabled="pagination.currentPage === pagination.totalPages"
        class="cursor-pointer px-2 h-8 flex items-center justify-center hover:text-white transition-colors gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Sau
        <svg
          class="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import DroneSidebar from "@/layout/DroneSidebar.vue";
import UavCard from "@/components/UavCard.vue";
import api from "@/utils/apis/axios";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { compute } from "three/tsl";
// / Dữ liệu mẫu quản lý tại trang Cha
const router = useRouter();
const categories = ref([]);
const fetchCategories = async () => {
  try {
    const { data } = await api.get("/drones/categories");
    // Thêm một option "Tất cả" lên đầu nếu muốn
    categories.value = [{ id: "all", name: "Tất cả Drone" }, ...data];
  } catch (error) {
    console.error("Lỗi fetch categories:", error);
  }
};
onMounted(() => {
  fetchCategories();
});
const filterData = ref(["Flight Time", "Range", "Camera Resolution"]);
// Mock data mô phỏng theo nội dung trong hình ảnh
const baseSpecs = {
  flightTime: "45 min",
  weight: "1.5kg",
  range: "10km",
  speed: "80 km/h",
  camera: "8K Hasselblad",
  sensors: "LiDAR & Thermal",
};

const drones = ref([]);
const isLoading = ref(false);
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  limit: 2, // Hiển thị 8 drone mỗi trang
});
// 2. Hàm Fetch dữ liệu từ BE
const fetchDrones = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get("/drones", {
      params: {
        page: pagination.value.currentPage,
        limit: pagination.value.limit,
      },
    });

    // Gán dữ liệu vào ref
    drones.value = data.drones;
    pagination.value.totalPages = data.totalPages;
  } catch (error) {
    console.error("Lỗi radar SkyLink:", error);
  } finally {
    isLoading.value = false;
  }
};
// 3. Khởi chạy khi component được gắn vào DOM
onMounted(fetchDrones);
//  Phân trang đơn giản (có thể mở rộng thêm nút next/prev, số trang, v.v.)
// Hàm tính toán danh sách trang hiển thị (Logic "thông minh")
const displayedPages = computed(() => {
  const current = pagination.value.currentPage;
  const total = pagination.value.totalPages;
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    // Luôn hiện trang 1
    pages.push(1);

    if (current > 3) pages.push("...");

    // Các trang xung quanh trang hiện tại
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (current < total - 2) pages.push("...");

    // Luôn hiện trang cuối
    if (!pages.includes(total)) pages.push(total);
  }
  return pages;
});

// Hàm chuyển trang
const changePage = (page) => {
  if (page === "..." || page === pagination.value.currentPage) return;
  pagination.value.currentPage = page;
  // Sau khi đổi page, watch sẽ tự gọi fetchDrones() như bài trước mình làm
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    changePage(pagination.value.currentPage + 1);
  }
};

const prevPage = () => {
  if (pagination.value.currentPage > 1) {
    changePage(pagination.value.currentPage - 1);
  }
};

// Theo dõi sự thay đổi của trang để fetch lại
watch(() => pagination.value.currentPage, fetchDrones);
// Hàm xử lý khi nhấn vào nút chi tiết
const onViewDetails = (id) => {
  console.log("Xem chi tiết UAV có ID:", id);
  router.push(`/drone/${id}`);
};
</script>
