<template>
  <div class="min-h-screen bg-[#F8FAFC] font-sans relative selection:bg-blue-200">
    <div
      class="absolute inset-0 pointer-events-none z-0"
      style="
        background-image:
          linear-gradient(#e2e8f0 1px, transparent 1px),
          linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
        background-size: 60px 60px;
      "
    ></div>

    <div class="max-w-[1600px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 relative z-10">
      
      <DroneSidebar 
        :categories="categories" 
        :filters="filterData" 
        :active-category="selectedCategory"
        @select-category="handleCategoryChange"
      />

      <main class="flex-1 flex flex-col">
        <div v-if="isLoading" class="flex-1 flex justify-center items-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <UavCard
            v-for="drone in drones"
            :key="drone.id"
            :drone="drone"
            @details="onViewDetails"
          />
        </div>
        
        <div v-if="!isLoading && drones.length === 0" class="flex-1 flex flex-col justify-center items-center text-slate-500 py-10">
          <i class="ph ph-drone text-4xl mb-2 opacity-50"></i>
          <p>Không tìm thấy thiết bị nào trong danh mục này.</p>
        </div>
      </main>
    </div>

    <div v-if="pagination.totalPages > 1" class="bg-[#2C3A47] text-slate-300 py-4 flex justify-center items-center gap-2 text-sm relative z-10 w-full border-t border-slate-700">
      <button
        @click="prevPage"
        :disabled="pagination.currentPage === 1"
        class="cursor-pointer px-2 h-8 flex items-center justify-center hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg class="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
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
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import DroneSidebar from "@/layout/DroneSidebar.vue";
import UavCard from "@/components/UavCard.vue";
import api from "@/utils/apis/axios";

const router = useRouter();

// === STATE ===
const categories = ref([]);
const filterData = ref(["Flight Time", "Range", "Camera Resolution"]);
const drones = ref([]);
const isLoading = ref(false);

// BIẾN LƯU TRẠNG THÁI PHÂN LOẠI HIỆN TẠI
const selectedCategory = ref("all");

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  limit: 8, // Chỉnh lại 8 cho chẵn grid 4 cột
});

// === API CÁC DANH MỤC ===
const fetchCategories = async () => {
  try {
    const { data } = await api.get("/drones/categories");
    categories.value = [{ id: "all", name: "Tất cả Drone" }, ...data];
  } catch (error) {
    console.error("Lỗi fetch categories:", error);
  }
};

// === API DANH SÁCH DRONE ===
const fetchDrones = async () => {
  try {
    isLoading.value = true;
    
    // Chuẩn bị tham số truy vấn
    const params = {
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
    };

    // Nếu người dùng chọn 1 danh mục cụ thể, đẩy thêm vào Param
    // LƯU Ý: Đổi tên biến 'category' thành biến mà Backend của bạn yêu cầu (VD: category_id)
    if (selectedCategory.value !== "all") {
      params.category = selectedCategory.value; 
    }

    const { data } = await api.get("/drones", { params });

    drones.value = data.drones || [];
    pagination.value.totalPages = data.totalPages || 1;
  } catch (error) {
    console.error("Lỗi radar SkyLink:", error);
  } finally {
    isLoading.value = false;
  }
};

// === HÀM XỬ LÝ SỰ KIỆN TỪ SIDEBAR ===
const handleCategoryChange = (categoryId) => {
  // Tránh việc click lại vào chính category đang chọn
  if (selectedCategory.value === categoryId) return;

  selectedCategory.value = categoryId;
  pagination.value.currentPage = 1; // Reset về trang 1 khi lọc
  fetchDrones(); // Gọi lại API để lọc
};

// === LIFECYCLE ===
onMounted(() => {
  fetchCategories();
  fetchDrones();
});

// === PHÂN TRANG ===
const displayedPages = computed(() => {
  const current = pagination.value.currentPage;
  const total = pagination.value.totalPages;
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    if (!pages.includes(total)) pages.push(total);
  }
  return pages;
});

const changePage = (page) => {
  if (page === "..." || page === pagination.value.currentPage) return;
  pagination.value.currentPage = page;
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

watch(() => pagination.value.currentPage, fetchDrones);

// === NAVIGATION ===
const onViewDetails = (id) => {
  router.push(`/test2/${id}`);
};
</script>