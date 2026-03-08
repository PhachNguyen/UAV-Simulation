<script setup>
import { computed } from "vue";
// Import các icon cần thiết từ Lucide
import {
  Battery,
  Zap,
  Wind,
  Maximize,
  Weight,
  Eye,
  Cpu,
  Activity,
} from "lucide-vue-next";

const props = defineProps({
  uav: {
    type: Object,
    required: true,
  },
});

// Cấu trúc dữ liệu nâng cao với Icon tương ứng
const advancedStats = computed(() => {
  return [
    {
      label: "Tầm xa tối đa",
      value: props.uav.stats.range || "15 KM",
      icon: Maximize,
      progress: 85,
    },
    {
      label: "Thời gian bay",
      value: props.uav.stats.battery || "46 Mins",
      icon: Battery,
      progress: 90,
    },
    {
      label: "Vận tốc tối đa",
      value: props.uav.stats.speed || "21 m/s",
      icon: Zap,
      progress: 75,
    },
    { label: "Kháng gió", value: "Level 5", icon: Wind, progress: 65 },
    { label: "Trọng lượng", value: "920g", icon: Weight, progress: 40 },
    { label: "Hệ thống nhìn", value: "Đa hướng", icon: Eye, progress: 95 },
  ];
});
</script>

<template>
  <div class="space-y-8 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Activity class="w-5 h-5 text-teal-500" />
        <h3
          class="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500"
        >
          Thông số vận hành thực
        </h3>
      </div>
      <span class="text-[10px] font-bold text-slate-300"
        >ID: #00{{ props.uav.id }}</span
      >
    </div>

    <div class="grid grid-cols-2 gap-5">
      <div
        v-for="stat in advancedStats"
        :key="stat.label"
        class="group bg-slate-50 p-5 rounded-[24px] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-100 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-3">
          <component
            :is="stat.icon"
            class="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors"
          />
          <span
            class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter"
          >
            {{ stat.label }}
          </span>
        </div>

        <div class="flex items-baseline gap-1">
          <span class="text-xl font-black text-slate-900 tracking-tight">{{
            stat.value
          }}</span>
        </div>

        <div
          class="relative w-full h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 h-full bg-teal-500 rounded-full transition-all duration-700 ease-out"
            :style="{ width: stat.progress + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden group"
    >
      <div class="relative z-10 flex items-start gap-4">
        <div class="p-3 bg-teal-500/20 rounded-2xl border border-teal-500/30">
          <Cpu class="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h4 class="text-sm font-bold mb-1 text-teal-400">
            Core i-UAV Neural Engine
          </h4>
          <p class="text-[10px] leading-relaxed text-slate-400 font-medium">
            Tích hợp bộ xử lý tránh vật cản APAS 5.0 và thuật toán ổn định hóa
            hình ảnh O3+ thời gian thực.
          </p>
        </div>
      </div>
      <div
        class="absolute -right-8 -top-8 w-32 h-32 bg-teal-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"
      ></div>
    </div>
  </div>
</template>
