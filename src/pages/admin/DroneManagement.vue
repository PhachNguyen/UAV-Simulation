<template>
  <div class="space-y-8 min-h-screen bg-[#f8fafc] p-2 md:p-6 rounded-3xl">
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6"
    >
      <div>
        <h1
          class="text-3xl text-slate-900 uppercase tracking-tighter flex items-center gap-3"
        >
          Quản lý sản phẩm
        </h1>
        <p class="text-sm font-medium text-slate-500 mt-2">
          Theo dõi và cấu hình
          <span class="text-slate-900 font-bold">{{ totalItems }}</span> UAV
          phục vụ hệ thống bài giảng.
        </p>
      </div>
      <button
        @click="$router.push('/admin/drones/add')"
        class="group flex items-center gap-3 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3.5 rounded-xl transition-all shadow-xl shadow-slate-900/10 active:scale-95"
      >
        <Plus :size="20" class="group-hover:rotate-90 transition-transform" />
        <span class="tracking-widest text-[11px] uppercase">Thêm UAV mới</span>
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
      >
        <div
          class="absolute -right-4 -top-4 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
        >
          <component :is="stat.icon" :size="100" />
        </div>
        <p
          class="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-3"
        >
          {{ stat.label }}
        </p>
        <div class="flex items-center justify-between relative z-10">
          <h3 class="text-3xl text-slate-900 tracking-tighter">
            {{ stat.value }}
          </h3>
          <div :class="`p-2.5 rounded-xl bg-opacity-10 ${stat.bgColor}`">
            <component :is="stat.icon" :class="stat.color" :size="20" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-3 items-center"
    >
      <div class="relative flex-1 min-w-[280px]">
        <Search
          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          :size="18"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Truy vấn mã hiệu UAV, chủng loại..."
          class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-medium transition-all"
        />
      </div>
      <select
        v-model="statusFilter"
        class="bg-slate-50 border-none px-6 py-3 rounded-xl text-[12px] font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
      >
        <option value="All">Tất cả trạng thái</option>
        <option value="Active">Đang hoạt động</option>
        <option value="Maintenance">Bảo trì</option>
        <option value="Offline">Ngoại tuyến</option>
      </select>
    </div>

    <div
      class="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-100">
              <th
                class="p-5 text-[10px] text-slate-400 uppercase tracking-widest font-black"
              >
                Mô hình UAV
              </th>
              <th
                class="p-5 text-[10px] text-slate-400 uppercase tracking-widest font-black"
              >
                Phân loại
              </th>
              <th
                class="p-5 text-[10px] text-slate-400 uppercase tracking-widest font-black"
              >
                Tích hợp mô phỏng
              </th>
              <th
                class="p-5 text-[10px] text-slate-400 uppercase tracking-widest font-black"
              >
                Cảm biến thực hành
              </th>
              <th
                class="p-5 text-[10px] text-slate-400 uppercase tracking-widest font-black"
              >
                Khả năng bay
              </th>
              <th
                class="p-5 text-[10px] text-slate-400 uppercase tracking-widest font-black"
              >
                Phạm vi hoạt động
              </th>
              <th
                class="p-5 text-[10px] text-slate-400 uppercase tracking-widest font-black text-right"
              >
                Thiết lập
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr
              v-for="drone in filteredDrones"
              :key="drone.id"
              class="hover:bg-slate-50/80 transition-all group"
            >
              <td class="p-5">
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 bg-white rounded-xl overflow-hidden p-1.5 border border-slate-200 shadow-sm group-hover:border-blue-400 transition-colors shrink-0"
                  >
                    <img
                      v-if="drone.image"
                      :src="`http://localhost:5000${drone.image}`"
                      class="w-full h-full object-contain"
                    />
                    <Box v-else class="w-full h-full p-2 text-slate-300" />
                  </div>
                  <div>
                    <p class="text-sm font-black text-slate-900 tracking-tight">
                      {{ drone.name }}
                    </p>
                    <div
                      class="flex items-center gap-1 mt-1 text-[10px] text-slate-500 font-medium font-mono"
                    >
                      <Cpu :size="12" /> v{{ drone.firmware || "1.0.0" }}
                    </div>
                  </div>
                </div>
              </td>

              <td class="p-5">
                <div class="flex flex-col items-start gap-2">
                  <span
                    class="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"
                  >
                    {{ drone.category || "Standard UAV" }}
                  </span>
                  <span
                    :class="[
                      'text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 px-2 py-0.5 rounded-full',
                      getStatusClass(drone.status),
                    ]"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
                    ></span>
                    {{ drone.status || "Active" }}
                  </span>
                </div>
              </td>

              <td class="p-5">
                <div
                  v-if="drone.model3d"
                  class="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 w-fit"
                >
                  <Box :size="14" />
                  <span class="text-[10px] font-black uppercase tracking-widest"
                    >Có mô hình 3D</span
                  >
                </div>
                <div
                  v-else
                  class="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 w-fit"
                >
                  <XCircle :size="14" />
                  <span class="text-[10px] font-bold uppercase tracking-widest"
                    >Chưa nạp</span
                  >
                </div>
              </td>

              <td class="p-5">
                <div class="flex flex-wrap gap-1.5 max-w-[160px]">
                  <template v-if="drone.sensors && drone.sensors.length">
                    <span
                      v-for="sensor in drone.sensors.slice(0, 2)"
                      :key="sensor"
                      class="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded truncate max-w-[100px]"
                    >
                      {{ sensor }}
                    </span>
                    <span
                      v-if="drone.sensors.length > 2"
                      class="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded"
                    >
                      +{{ drone.sensors.length - 2 }}
                    </span>
                  </template>
                  <span v-else class="text-[10px] text-slate-400 italic"
                    >Không có dữ liệu</span
                  >
                </div>
              </td>

              <td class="p-5">
                <div
                  class="flex items-center gap-2 text-[11px] font-medium text-slate-600"
                  title="Thời gian bay"
                >
                  <Clock :size="14" class="text-slate-400" />
                  <span class="font-bold text-slate-800">{{
                    drone.flight_time || 0
                  }}</span>
                  phút
                </div>
              </td>

              <td class="p-5">
                <div
                  class="flex items-center gap-2 text-[11px] font-medium text-slate-600"
                  title="Phạm vi hoạt động"
                >
                  <Navigation :size="14" class="text-slate-400" />
                  <span class="font-bold text-slate-800">{{
                    drone.range || 0
                  }}</span>
                  km
                </div>
              </td>

              <td class="p-5 text-right">
                <div
                  class="flex justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    @click="$router.push(`/admin/drones/edit/${drone.id}`)"
                    class="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all"
                    title="Cấu hình hệ thống"
                  >
                    <Settings :size="18" />
                  </button>
                  <button
                    class="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-all"
                    title="Xem chi tiết bài giảng"
                  >
                    <BookOpen :size="18" />
                  </button>
                  <button
                    @click="handleDelete(drone.id)"
                    class="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                    title="Xóa thiết bị"
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
        class="bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4"
      >
        <p
          class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
        >
          Hiển thị trang {{ currentPage }} / {{ totalPages }}
        </p>
        <div class="flex gap-1.5">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft :size="18" />
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="[
              currentPage === page
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 border-blue-600'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200',
              'w-9 h-9 flex items-center justify-center rounded-lg border text-xs  transition-all cursor-pointer',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
  Search,
  Box,
  Settings,
  History,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  Navigation,
} from "lucide-vue-next";

const toast = useToast();
const drones = ref([]);
const totalPages = ref(1);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const searchQuery = ref("");
const statusFilter = ref("All");

// Hàm fetch danh sách
const fetchDrones = async (page = 1) => {
  loading.value = true;
  try {
    const response = await api.get(`/drones`, {
      params: { page, limit: itemsPerPage.value },
    });
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
    drones.value = drones.value.filter((d) => d.id !== id);
    totalItems.value--;
  } catch (error) {
    toast.error("Lỗi radar khi xóa thiết bị");
  }
};

// Cấu hình Quick Stats để tự động lấy dữ liệu và hiển thị đẹp
const quickStats = computed(() => [
  {
    label: "Mạng lưới UAV",
    value: totalItems.value,
    icon: Box,
    color: "text-blue-600",
    bgColor: "bg-white",
  },
  {
    label: "Sẵn sàng hoạt động",
    value: drones.value.filter((d) => d.status === "active" || !d.status)
      .length,
    icon: CheckCircle2,
    color: "text-emerald-500",
    bgColor: "bg-white",
  },
  // {
  //   label: "Bảo trì định kỳ",
  //   value: drones.value.filter((d) => d.status === "maintenance").length,
  //   icon: AlertTriangle,
  //   color: "text-amber-500",
  //   bgColor: "bg-white",
  // },
  // {
  //   label: "Mất kết nối",
  //   value: drones.value.filter((d) => d.status === "offline").length,
  //   icon: XCircle,
  //   color: "text-rose-500",
  //   bgColor: "bg-white",
  // },
]);

// Lọc tìm kiếm
const filteredDrones = computed(() => {
  return drones.value.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (d.category &&
        d.category.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchStatus =
      statusFilter.value === "All" ||
      (d.status || "active") === statusFilter.value.toLowerCase();
    return matchSearch && matchStatus;
  });
});

// Class Badge cho trạng thái
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "ready":
      return "bg-emerald-50 text-emerald-600";
    case "maintenance":
      return "bg-amber-50 text-amber-600";
    case "offline":
      return "bg-rose-50 text-rose-600";
    default:
      return "bg-emerald-50 text-emerald-600"; // Default là Active
  }
};

onMounted(() => {
  fetchDrones();
});
</script>
