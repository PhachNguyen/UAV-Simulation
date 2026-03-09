<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="mb-8">
        <h1
          class="text-3xl font-black text-slate-900 uppercase tracking-tighter italic"
        >
          Cấu hình <span class="text-teal-600">Hệ thống</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium">
          Quản lý tham số vận hành và bảo mật SkyLink.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-64 space-y-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all',
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-slate-500 hover:bg-white hover:shadow-sm',
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            {{ tab.name }}
          </button>
        </div>

        <div
          class="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div v-if="activeTab === 'connectivity'" class="p-8 space-y-8">
            <section class="space-y-4">
              <h3
                class="text-lg font-black text-slate-800 uppercase tracking-tight italic border-l-4 border-teal-500 pl-4"
              >
                Dịch vụ Bản đồ
              </h3>
              <div class="grid gap-4">
                <div>
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                    >Mapbox Access Token</label
                  >
                  <div class="flex gap-2">
                    <input
                      type="password"
                      value="pk.eyJ1IjoidGhlcGhhY2giLCJhIjoiY21taXpvN3VhMWIxbjJwcG90dzcwMzE3NCJ9..."
                      class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      class="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200"
                    >
                      SAO CHÉP
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section class="space-y-4">
              <h3
                class="text-lg font-black text-slate-800 uppercase tracking-tight italic border-l-4 border-teal-500 pl-4"
              >
                Giao thức Truyền dẫn
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase block mb-2"
                    >MAVLink Version</label
                  >
                  <select
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none"
                  >
                    <option>v2.0 (Recommended)</option>
                    <option>v1.0 (Legacy)</option>
                  </select>
                </div>
                <div>
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase block mb-2"
                    >Data Rate (Hz)</label
                  >
                  <input
                    type="number"
                    value="10"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold"
                  />
                </div>
              </div>
            </section>
          </div>

          <div v-if="activeTab === 'safety'" class="p-8 space-y-8">
            <section class="space-y-6">
              <h3
                class="text-lg font-black text-slate-800 uppercase tracking-tight italic border-l-4 border-orange-500 pl-4"
              >
                Ngưỡng Cảnh báo
              </h3>

              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-bold text-slate-800">
                      Cảnh báo Pin yếu (Low Battery)
                    </p>
                    <p class="text-xs text-slate-500">
                      Kích hoạt RTH (Return to Home) tự động.
                    </p>
                  </div>
                  <div class="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="40"
                      class="w-32 accent-teal-600"
                    />
                    <span class="text-sm font-black text-slate-900 w-8"
                      >25%</span
                    >
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-bold text-slate-800">
                      Giới hạn Độ cao (Altitude Ceiling)
                    </p>
                    <p class="text-xs text-slate-500">
                      Tuân thủ quy định bay hàng không dân dụng.
                    </p>
                  </div>
                  <div class="flex items-center gap-4">
                    <input
                      type="number"
                      value="120"
                      class="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-center font-bold"
                    />
                    <span class="text-xs font-bold text-slate-400 uppercase"
                      >Meters</span
                    >
                  </div>
                </div>
              </div>
            </section>

            <section
              class="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-4"
            >
              <AlertTriangle class="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p class="text-xs font-black text-orange-800 uppercase mb-1">
                  Cảnh báo An toàn
                </p>
                <p class="text-xs text-orange-700 leading-relaxed">
                  Mọi thay đổi trong phần này sẽ ảnh hưởng trực tiếp đến hệ
                  thống lái tự động. Hãy đảm bảo bạn đã nắm rõ quy trình vận
                  hành trước khi lưu cấu hình.
                </p>
              </div>
            </section>
          </div>

          <div
            class="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3"
          >
            <button
              class="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-800 transition-all"
            >
              HỦY BỎ
            </button>
            <button
              class="px-8 py-2.5 bg-teal-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:bg-teal-700 transition-all"
            >
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Settings,
  Wifi,
  ShieldAlert,
  Users,
  Bell,
  Globe,
  AlertTriangle,
  ShieldCheck,
} from "lucide-vue-next";

const activeTab = ref("connectivity");

const tabs = [
  { id: "connectivity", name: "Kết nối & API", icon: Wifi },
  { id: "safety", name: "An toàn bay", icon: ShieldCheck },
  { id: "notifications", name: "Thông báo", icon: Bell },
  { id: "accounts", name: "Nhân sự", icon: Users },
  { id: "general", name: "Cài đặt chung", icon: Globe },
];
</script>

<style scoped>
/* Tùy chỉnh input range */
input[type="range"] {
  -webkit-appearance: none;
  background: #e2e8f0;
  height: 4px;
  border-radius: 2px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #0d9488;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(13, 148, 136, 0.3);
}
</style>
