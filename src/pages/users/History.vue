<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-[1440px] mx-auto mb-8 flex justify-between items-center">
      <div>
        <h1
          class="text-3xl font-black text-slate-900 uppercase tracking-tighter italic"
        >
          Lịch sử <span class="text-teal-600">Chuyến bay</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium">
          Lưu trữ chi tiết 1,240 nhiệm vụ đã hoàn thành.
        </p>
      </div>

      <div class="flex gap-3">
        <div
          class="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-6 shadow-sm"
        >
          <div class="text-center">
            <p class="text-[9px] font-black text-slate-400 uppercase">
              Tổng quãng đường
            </p>
            <p class="text-sm font-black text-slate-900">4,280 KM</p>
          </div>
          <div class="w-[1px] h-8 bg-slate-100"></div>
          <div class="text-center">
            <p class="text-[9px] font-black text-slate-400 uppercase">
              Tổng giờ bay
            </p>
            <p class="text-sm font-black text-slate-900">856H 20M</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto mb-6 flex flex-wrap gap-4 items-center">
      <div class="relative flex-1 max-w-sm">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        />
        <input
          type="text"
          placeholder="Tìm ID nhiệm vụ hoặc Drone..."
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
        />
      </div>

      <select
        class="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 outline-none"
      >
        <option>Tất cả Drone</option>
        <option>Sentinel-X</option>
        <option>SkyMaster Pro</option>
      </select>

      <input
        type="date"
        class="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 outline-none"
      />

      <button
        class="ml-auto flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
      >
        <FileDown class="w-4 h-4" /> XUẤT FILE CSV
      </button>
    </div>

    <div
      class="max-w-[1440px] mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
    >
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-100">
            <th
              class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Nhiệm vụ
            </th>
            <th
              class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Thiết bị
            </th>
            <th
              class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Thời gian
            </th>
            <th
              class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Thời lượng
            </th>
            <th
              class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Quãng đường
            </th>
            <th
              class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Kết quả
            </th>
            <th
              class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center"
            >
              Chi tiết
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50 text-sm">
          <tr
            v-for="log in flightLogs"
            :key="log.id"
            class="hover:bg-slate-50/80 transition-all group"
          >
            <td class="p-4">
              <div class="font-bold text-slate-900">{{ log.missionName }}</div>
              <div class="text-[10px] font-mono text-slate-400 uppercase">
                {{ log.id }}
              </div>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"
                >
                  <Plane class="w-4 h-4 text-slate-500" />
                </div>
                <span class="font-bold text-slate-700 uppercase text-xs">{{
                  log.drone
                }}</span>
              </div>
            </td>
            <td class="p-4">
              <div class="font-medium text-slate-600">{{ log.date }}</div>
              <div class="text-[10px] text-slate-400 font-bold uppercase">
                {{ log.time }}
              </div>
            </td>
            <td class="p-4 font-mono font-bold text-slate-600">
              {{ log.duration }}
            </td>
            <td class="p-4 font-mono font-bold text-slate-600">
              {{ log.distance }} KM
            </td>
            <td class="p-4">
              <span
                :class="getStatusClass(log.status)"
                class="px-3 py-1 rounded-full text-[10px] font-black uppercase italic"
              >
                {{ log.status }}
              </span>
            </td>
            <td class="p-4 text-center">
              <button
                class="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="max-w-[1440px] mx-auto mt-6 flex justify-between items-center px-2"
    >
      <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
        Đang hiển thị 15 trên 1,240 bản ghi
      </p>
      <div class="flex gap-2">
        <button
          class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50"
        >
          Trước
        </button>
        <button
          class="px-4 py-2 bg-slate-900 border border-slate-900 rounded-lg text-xs font-bold text-white"
        >
          Sau
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Plane, ChevronRight, FileDown } from "lucide-vue-next";

const flightLogs = [
  {
    id: "LOG-5521",
    missionName: "Tuần tra Biên giới A1",
    drone: "Sentinel-X",
    date: "12 TH05, 2024",
    time: "08:30 AM",
    duration: "45m 12s",
    distance: "12.4",
    status: "Hoàn thành",
  },
  {
    id: "LOG-5520",
    missionName: "Kiểm tra điện gió",
    drone: "SkyMaster Pro",
    date: "11 TH05, 2024",
    time: "14:15 PM",
    duration: "28m 05s",
    distance: "5.2",
    status: "Hoàn thành",
  },
  {
    id: "LOG-5519",
    missionName: "Phun thuốc cánh đồng B",
    drone: "AgriSpread X1",
    date: "11 TH05, 2024",
    time: "06:45 AM",
    duration: "1h 05m",
    distance: "8.9",
    status: "Gián đoạn",
  },
  {
    id: "LOG-5518",
    missionName: "Quay phim sự kiện biển",
    drone: "CineVue 8K",
    date: "10 TH05, 2024",
    time: "16:20 PM",
    duration: "18m 45s",
    distance: "2.1",
    status: "Hoàn thành",
  },
  {
    id: "LOG-5517",
    missionName: "Vận chuyển y tế khẩn",
    drone: "Atlas Carrier",
    date: "09 TH05, 2024",
    time: "22:10 PM",
    duration: "12m 30s",
    distance: "15.0",
    status: "Hoàn thành",
  },
  {
    id: "LOG-5516",
    missionName: "Khảo sát rừng phòng hộ",
    drone: "Sentinel-X",
    date: "08 TH05, 2024",
    time: "09:00 AM",
    duration: "55m 00s",
    distance: "22.5",
    status: "Lỗi hệ thống",
  },
];

const getStatusClass = (status) => {
  if (status === "Hoàn thành") return "bg-emerald-50 text-emerald-600";
  if (status === "Gián đoạn") return "bg-amber-50 text-amber-600";
  return "bg-red-50 text-red-600";
};
</script>
