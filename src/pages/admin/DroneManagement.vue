<template>
  <div class="min-h-screen bg-[#f8fafc] p-4 md:p-8">
    <div class="mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Thư viện Drone</h1>
          <p class="text-sm text-slate-500 mt-1">
            Quản lý và theo dõi thông số kỹ thuật của đội bay.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="cursor-pointer bg-slate-200/50 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Tất cả danh mục
          </button>
          <div class="relative">
            <button
              @click="showCategoryMenu = !showCategoryMenu"
              class="cursor-pointer bg-slate-200/50 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Filter :size="16" />
              <span v-if="selectedCategory === 'All'">Bộ lọc</span>
              <span v-else class="text-slate-700">{{ selectedCategory }}</span>

              <span
                v-if="selectedCategory !== 'All'"
                class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"
              ></span>
            </button>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="showCategoryMenu"
                class="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-50 py-2"
              >
                <div
                  class="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                >
                  Danh mục Drone
                </div>

                <button
                  v-for="cat in categories"
                  :key="cat.value"
                  @click="applyCategoryFilter(cat.value)"
                  :class="[
                    'w-full text-left px-4 py-2 text-sm transition-colors',
                    selectedCategory === cat.value
                      ? 'bg-blue-50 text-slate-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50',
                  ]"
                >
                  {{ cat.label }}
                </button>
              </div>
            </transition>
          </div>
          <button
            @click="$router.push('/admin/drones/add')"
            class="cursor-pointer bg-[#5b6275] hover:bg-[#4a5061] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus :size="18" />
            Thêm thiết bị mới
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center"
      >
        <div>
          <p class="text-[13px] font-medium text-slate-500 mb-1">
            {{ stat.label }}
          </p>
          <h3 class="text-3xl font-bold text-slate-800">
            {{ stat.value < 10 ? "0" + stat.value : stat.value }}
          </h3>
        </div>
        <div
          :class="`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bgIconColor}`"
        >
          <component :is="stat.icon" :class="stat.iconColor" :size="24" />
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th
                class="py-4 px-6 text-[11px] text-slate-500 uppercase tracking-wider font-semibold w-1/3"
              >
                Thiết bị
              </th>
              <th
                class="py-4 px-6 text-[11px] text-slate-500 uppercase tracking-wider font-semibold"
              >
                Danh mục
              </th>
              <th
                class="py-4 px-6 text-[11px] text-slate-500 uppercase tracking-wider font-semibold"
              >
                Mô hình
              </th>
              <th
                class="py-4 px-6 text-[11px] text-slate-500 uppercase tracking-wider font-semibold"
              >
                Trạng thái
              </th>
              <th
                class="py-4 px-6 text-[11px] text-slate-500 uppercase tracking-wider font-semibold text-right"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="drone in filteredDrones"
              :key="drone.id"
              class="hover:bg-slate-50/50 transition-colors group cursor-pointer"
              @click="$router.push(`/admin/drones/edit/${drone.id}`)"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-slate-200"
                  >
                    <img
                      v-if="drone.image"
                      :src="`http://localhost:5000${drone.image}`"
                      class="w-full h-full object-cover"
                    />
                    <Box v-else class="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <p class="text-[15px] font-semibold text-slate-800">
                      {{ drone.name }}
                    </p>
                    <p class="text-[13px] text-slate-500 mt-0.5">
                      ID:
                      {{
                        drone.drone_id ||
                        `SG-2023-${String(drone.id).padStart(3, "0")}`
                      }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="py-4 px-6">
                <span class="text-[14px] text-slate-700 font-medium">
                  {{ drone.category || "Photography" }}
                </span>
              </td>

              <!-- Mô hình -->
              <td class="py-4 px-6">
                <div
                  v-if="drone.model3d"
                  class="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 w-fit"
                >
                  <Box :size="14" />
                  <span class="text-[11px] font-bold uppercase tracking-tight"
                    >Có mô hình</span
                  >
                </div>
                <div
                  v-else
                  class="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 w-fit"
                >
                  <XCircle :size="14" />
                  <span class="text-[11px] font-medium uppercase tracking-tight"
                    >Chưa có</span
                  >
                </div>
              </td>

              <td class="py-4 px-6">
                <div
                  :class="[
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium',
                    getStatusStyle(drone.status),
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {{ getStatusText(drone.status) }}
                </div>
              </td>

              <td class="py-4 px-6 text-right">
                <div
                  class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    @click="$router.push(`/admin/drones/edit/${drone.id}`)"
                    class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Settings :size="18" />
                  </button>
                  <button
                    @click="handleDelete(drone.id)"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 :size="18" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="bg-white px-6 py-5 flex items-center justify-between border-t border-slate-100"
      >
        <p class="text-[13px] text-slate-500">
          Hiển thị {{ paginationStart }}-{{ paginationEnd }} của
          {{ totalItems }} thiết bị
        </p>

        <div class="flex items-center gap-1">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="cursor-pointer w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft :size="18" />
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="[
              currentPage === page
                ? 'bg-[#5b6275] text-white'
                : 'text-slate-600 hover:bg-slate-100',
              'w-8 h-8 flex items-center justify-center rounded text-[13px] font-medium transition-colors cursor-pointer',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="cursor-pointer w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/utils/apis/axios";
import { useToast } from "vue-toastification";
import {
  Plus,
  Filter,
  Box,
  Settings,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Battery,
  Rocket,
  Wrench,
  Layers,
  XCircle,
  AlertCircle,
} from "lucide-vue-next";

const toast = useToast();
const drones = ref([]);
const totalPages = ref(1);
const currentPage = ref(1);
const itemsPerPage = ref(4);
const totalItems = ref(0);
const loading = ref(true);

// Biến cho tìm kiếm và bộ lọc client-side
const searchQuery = ref("");
const statusFilter = ref("All");

// Biến cho bộ lọc danh mục (Server-side)
const showCategoryMenu = ref(false);
const selectedCategory = ref("All");
const categories = ref([]);
const fetchCategories = async () => {
  try {
    const { data } = await api.get("/drones/categories");

    // Map dữ liệu từ BE thành cấu trúc { label, value } mà HTML đang cần
    const formattedCategories = data.map((cat) => ({
      label: cat.name, // Tên hiển thị trên giao diện
      value: cat.name, // Giá trị (ID) gửi xuống BE khi lọc
    }));

    // Gộp "Tất cả" lên đầu (Lưu ý value là "All" viết hoa chữ A)
    categories.value = [
      { label: "Tất cả Drone", value: "All" },
      ...formattedCategories,
    ];
  } catch (error) {
    console.error("Lỗi fetch categories:", error);
  }
};
// Hàm gọi API lấy dữ liệu từ Backend
const fetchDrones = async (page = 1) => {
  loading.value = true;
  try {
    // Khởi tạo params gửi xuống BE
    const params = {
      page,
      limit: itemsPerPage.value,
    };

    // Nếu có chọn danh mục khác "All", đính kèm vào params
    if (selectedCategory.value !== "All") {
      params.category = selectedCategory.value;
    }

    const response = await api.get(`/drones`, { params });

    drones.value = response.data.drones;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.currentPage;
    totalItems.value = response.data.totalItems;
  } catch (error) {
    toast.error("Không thể tải danh sách thiết bị");
  } finally {
    loading.value = false;
  }
};

// Hàm xử lý khi chọn danh mục từ Dropdown
const applyCategoryFilter = (category) => {
  selectedCategory.value = category;
  showCategoryMenu.value = false; // Đóng menu sau khi chọn
  currentPage.value = 1; // Reset về trang 1 khi áp dụng bộ lọc mới
  fetchDrones(1); // Gọi lại API
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchDrones(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleDelete = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa UAV này khỏi hệ thống?")) return;
  try {
    await api.delete(`/drones/${id}`);
    toast.success("Đã xóa thiết bị thành công");
    fetchDrones(currentPage.value);
  } catch (error) {
    toast.error("Lỗi khi xóa thiết bị");
  }
};

// Computed properties cho phân trang
const paginationStart = computed(() => {
  if (totalItems.value === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value);
});

// Thống kê nhanh
const quickStats = computed(() => [
  {
    label: "Tổng số drone",
    value: totalItems.value,
    icon: Box,
    iconColor: "text-indigo-500",
    bgIconColor: "bg-indigo-50",
  },
  {
    label: "Danh mục đang hoạt động",
    value: drones.value.filter((d) => d.status === "active" || !d.status)
      .length,
    icon: Rocket,
    iconColor: "text-emerald-500",
    bgIconColor: "bg-emerald-50",
  },
  {
    label: "Tổng số mô hình 3D",
    value: drones.value.filter((d) => d.model3d).length,
    icon: Layers,
    iconColor: "text-slate-500",
    bgIconColor: "bg-slate-100",
  },
  {
    label: "Ngừng hoạt động", // Đã sửa tên label cho có ý nghĩa hơn
    value: drones.value.filter(
      (d) => (d.status || "").toLowerCase() === "offline",
    ).length,
    icon: AlertCircle,
    iconColor: "text-rose-500",
    bgIconColor: "bg-rose-50",
  },
]);

// Bộ lọc Frontend cho Search Text và Status
const filteredDrones = computed(() => {
  return drones.value.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (d.drone_id &&
        d.drone_id.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const matchStatus =
      statusFilter.value === "All" ||
      (d.status || "active").toLowerCase() === statusFilter.value.toLowerCase();

    return matchSearch && matchStatus;
  });
});

// Helpers cho UI
const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "online":
      return "bg-cyan-50 text-cyan-600";
    case "maintenance":
      return "bg-slate-100 text-slate-600";
    case "offline":
      return "bg-slate-200 text-slate-500";
    default:
      return "bg-cyan-50 text-cyan-600";
  }
};

const getStatusText = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "online":
      return "Online";
    case "maintenance":
      return "Bảo trì";
    case "offline":
      return "Offline";
    default:
      return "Online";
  }
};

onMounted(() => {
  fetchDrones();
  fetchCategories();
});
</script>
