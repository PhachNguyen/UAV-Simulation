<template>
  <div class="space-y-6">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Quản lý sản phẩm
        </h1>
        <p class="text-sm text-slate-500">
          Tổng cộng {{ drones.length }} thiết bị đang trong hệ thống
        </p>
      </div>
      <button
        @click="$router.push('/admin/drones/add')"
        class="cursor-pointer flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-teal-400 px-6 py-2.5 rounded-xl font-black transition-all shadow-xl shadow-slate-900/10 active:scale-95 border border-slate-800"
      >
        <Plus :size="20" class="text-white" />
        <span class="tracking-tight text-white">THÊM UAV MỚI</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <p
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
        >
          {{ stat.label }}
        </p>
        <div class="flex items-end justify-between mt-2">
          <h3 class="text-2xl font-black text-slate-900">{{ stat.value }}</h3>
          <component :is="stat.icon" :class="stat.color" :size="24" />
        </div>
      </div>
    </div>

    <div
      class="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-4 items-center"
    >
      <div class="relative flex-1 min-w-[200px]">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          :size="18"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm theo tên hoặc mã hiệu..."
          class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
        />
      </div>
      <select
        v-model="statusFilter"
        class="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 outline-none"
      >
        <option value="All">Tất cả trạng thái</option>
        <option value="Active">Đang hoạt động</option>
        <option value="Maintenance">Bảo trì</option>
        <option value="Offline">Ngoại tuyến</option>
      </select>
    </div>

    <div
      class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
    >
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50 border-b border-slate-100">
          <tr>
            <th class="p-4 text-[11px] font-black text-slate-400 uppercase">
              Thiết bị
            </th>
            <th class="p-4 text-[11px] font-black text-slate-400 uppercase">
              Trạng thái
            </th>
            <th class="p-4 text-[11px] font-black text-slate-400 uppercase">
              Pin
            </th>
            <th class="p-4 text-[11px] font-black text-slate-400 uppercase">
              Firmware
            </th>
            <th class="p-4 text-[11px] font-black text-slate-400 uppercase">
              Vị trí cuối
            </th>
            <th
              class="p-4 text-[11px] font-black text-slate-400 uppercase text-right"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr
            v-for="drone in filteredDrones"
            :key="drone.id"
            class="hover:bg-slate-50/50 transition-colors"
          >
            <td class="p-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center"
                >
                  <img
                    v-if="drone.image"
                    :src="`http://localhost:5000${drone.image}`"
                    class="w-full h-full object-cover"
                  />
                  <Box v-else class="text-slate-400" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">
                    {{ drone.name }}
                  </p>
                  <p class="text-[10px] text-slate-400 font-mono uppercase">
                    {{ drone.category || "N/A" }}
                  </p>
                </div>
              </div>
            </td>

            <td class="p-4">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-bold text-slate-600">
                  {{ drone.stats?.battery || "N/A" }}
                </span>
                <div class="w-12 bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div class="bg-teal-500 h-full w-[80%]"></div>
                </div>
              </div>
            </td>

            <td class="p-4 text-right">
              <div class="flex justify-end gap-2">
                <button
                  @click="$router.push(`/admin/drones/edit/${drone.id}`)"
                  class="p-2 hover:bg-teal-50 text-slate-400 hover:text-teal-600 rounded-lg transition-all"
                >
                  <Settings :size="18" />
                </button>
                <button
                  @click="handleDelete(drone.id)"
                  class="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all"
                >
                  <Trash2 :size="18" />
                </button>
              </div>
            </td>
            <td class="p-4 text-xs font-bold text-slate-500">
              {{ drone.firmware }}
            </td>
            <td class="p-4 text-xs text-slate-500">{{ drone.lastLocation }}</td>
            <td class="p-4 text-right">
              <div class="flex justify-end gap-2">
                <button
                  class="p-2 hover:bg-teal-50 text-slate-400 hover:text-teal-600 rounded-lg transition-all"
                  title="Cấu hình"
                >
                  <Settings :size="18" />
                </button>
                <button
                  class="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all"
                  title="Xem lịch sử bay"
                >
                  <History :size="18" />
                </button>
                <button
                  @click="handleDelete(drone.id)"
                  class="cursor-pointer p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all"
                  title="Xóa"
                >
                  <Trash2 :size="18" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-100 sm:px-6 rounded-b-2xl"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
          >
            Trước
          </button>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
          >
            Sau
          </button>
        </div>

        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-slate-500">
              Tổng:
              <!-- <span class="font-bold text-slate-900">{{ currentPage }}</span> /
              <span class="font-bold text-slate-900">{{ totalPages }}</span> -->
              <span class="text-slate-500 text-sm"
                >{{ totalItems }} thiết bị</span
              >
            </p>
          </div>

          <div>
            <nav
              class="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft :size="18" />
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                @click="changePage(page)"
                :class="[
                  currentPage === page
                    ? 'z-10 bg-slate-900 border-slate-900 text-white '
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-black transition-colors cursor-pointer',
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronRight :size="18" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/utils/apis/axios"; // Đường dẫn tới file axios.js của bạn
import { useToast } from "vue-toastification";
import {
  Plus,
  Search,
  Box,
  Settings,
  History,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BatteryCharging,
} from "lucide-vue-next";

const toast = useToast();
const drones = ref([]);
const totalPages = ref(1);
const currentPage = ref(1);
const itemsPerPage = ref(2); // Số lượng UAV trên mỗi trang
const totalItems = ref(0);
const loading = ref(true);
const searchQuery = ref("");
const statusFilter = ref("All");

// 1. Hàm lấy danh sách Drone từ Backend
const fetchDrones = async (page = 1) => {
  loading.value = true;
  try {
    const response = await api.get(`/drones`, {
      params: {
        page: page,
        limit: itemsPerPage.value,
      },
    });
    // Lưu dữ liệu từ cấu trúc mới của BE
    drones.value = response.data.drones;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.currentPage;
    totalItems.value = response.data.totalItems;
  } catch (error) {
    toast.error("Không thể tải danh sách");
  } finally {
    loading.value = false;
  }
};

// Hàm chuyển trang
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchDrones(page);
    // Cuộn lên đầu bảng cho mượt
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// 2. Hàm xóa Drone
const handleDelete = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa thiết bị này?")) return;

  try {
    await api.delete(`/drones/${id}`);
    toast.success("Đã xóa thiết bị thành công");
    // Cập nhật lại danh sách tại chỗ để không phải load lại trang
    drones.value = drones.value.filter((d) => d.id !== id);
  } catch (error) {
    toast.error("Lỗi khi xóa thiết bị");
  }
};

// 3. Tính toán thống kê nhanh từ dữ liệu thực tế
const quickStats = computed(() => [
  {
    label: "Tổng thiết bị",
    value: drones.value.length,
    icon: Box,
    color: "text-blue-500",
  },
  {
    label: "Đang hoạt động",
    value: drones.value.filter((d) => d.status === "active" || !d.status)
      .length, // Mặc định active
    icon: CheckCircle2,
    color: "text-teal-500",
  },
  {
    label: "Hệ thống 3D",
    value: drones.value.filter((d) => d.model3d).length,
    icon: Settings,
    color: "text-purple-500",
  },
  {
    label: "Lỗi/Ngoại tuyến",
    value: drones.value.filter((d) => d.status === "offline").length,
    icon: XCircle,
    color: "text-red-500",
  },
]);

// 4. Logic lọc và tìm kiếm
const filteredDrones = computed(() => {
  return drones.value.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (d.category &&
        d.category.toLowerCase().includes(searchQuery.value.toLowerCase()));

    // Vì DB của bạn dùng status dạng 'active', 'inactive' nên cần khớp logic ở đây
    const matchStatus =
      statusFilter.value === "All" ||
      d.status === statusFilter.value.toLowerCase();

    return matchSearch && matchStatus;
  });
});

// Chuyển đổi màu sắc trạng thái
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "ready":
      return "bg-emerald-100 text-emerald-600";
    case "maintenance":
      return "bg-amber-100 text-amber-600";
    case "offline":
      return "bg-slate-100 text-slate-400";
    default:
      return "bg-teal-100 text-teal-600";
  }
};

onMounted(() => {
  fetchDrones();
});
</script>
