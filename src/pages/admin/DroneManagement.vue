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
        class="cursor-pointer flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-slate-900 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/20 active:scale-95"
      >
        <Plus :size="20" /> Thêm UAV mới
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
                    :src="drone.image"
                    class="w-full h-full object-cover"
                  />
                  <Box v-else class="text-slate-400" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">
                    {{ drone.name }}
                  </p>
                  <p class="text-[10px] text-slate-400 font-mono">
                    {{ drone.sn }}
                  </p>
                </div>
              </div>
            </td>
            <td class="p-4">
              <span
                :class="getStatusClass(drone.status)"
                class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
              >
                {{ drone.status }}
              </span>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden"
                >
                  <div
                    :class="drone.battery < 20 ? 'bg-red-500' : 'bg-teal-500'"
                    :style="{ width: drone.battery + '%' }"
                    class="h-full"
                  ></div>
                </div>
                <span class="text-xs font-bold text-slate-600"
                  >{{ drone.battery }}%</span
                >
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
                  class="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all"
                  title="Xóa"
                >
                  <Trash2 :size="18" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

// Dữ liệu mẫu
const drones = ref([
  {
    id: 1,
    name: "SkyLink Pro V1",
    sn: "SN-9920-X1",
    status: "Active",
    battery: 85,
    firmware: "v2.0.4",
    lastLocation: "Hà Nội, VN",
    image: null,
  },
  {
    id: 2,
    name: "Surveyor X",
    sn: "SN-1102-S2",
    status: "Maintenance",
    battery: 12,
    firmware: "v1.9.8",
    lastLocation: "Đà Nẵng, VN",
    image: null,
  },
  {
    id: 3,
    name: "AgriDrone T40",
    sn: "SN-4401-A5",
    status: "Active",
    battery: 100,
    firmware: "v3.1.0",
    lastLocation: "Cần Thơ, VN",
    image: null,
  },
  {
    id: 4,
    name: "NightHawk FPV",
    sn: "SN-8821-N9",
    status: "Offline",
    battery: 0,
    firmware: "v2.2.1",
    lastLocation: "HCM, VN",
    image: null,
  },
]);

const searchQuery = ref("");
const statusFilter = ref("All");

const quickStats = [
  {
    label: "Đang bay",
    value: "12",
    icon: CheckCircle2,
    color: "text-teal-500",
  },
  {
    label: "Cần sạc",
    value: "3",
    icon: BatteryCharging,
    color: "text-orange-500",
  },
  {
    label: "Bảo trì",
    value: "1",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  { label: "Lỗi hệ thống", value: "0", icon: XCircle, color: "text-red-500" },
];

const filteredDrones = computed(() => {
  return drones.value.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.sn.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus =
      statusFilter.value === "All" || d.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const getStatusClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-600";
    case "Maintenance":
      return "bg-amber-100 text-amber-600";
    case "Offline":
      return "bg-slate-100 text-slate-400";
    default:
      return "bg-slate-100 text-slate-600";
  }
};
</script>
