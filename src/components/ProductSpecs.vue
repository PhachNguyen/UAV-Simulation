<template>
  <section class="space-y-12">
    <h2
      class="text-2xl font-black text-[#0b1f3f] uppercase tracking-tight flex items-center gap-3"
    >
      <span class="w-2 h-8 bg-[#0b1f3f]"></span> Thông số kỹ thuật chi tiết
    </h2>

    <div class="grid lg:grid-cols-2 gap-6">
      <SpecTable
        title="Hiệu suất vận hành"
        :icon="Gauge"
        :data="specs.flight"
      />
      <SpecTable
        title="Hệ thống truyền tải"
        :icon="Radio"
        :data="specs.transmission"
      />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="item in specs.physical"
        :key="item.label"
        class="p-6 border border-[#dee2e6] rounded-2xl bg-white flex flex-col items-center text-center gap-3 hover:border-[#0b1f3f] transition-all group"
      >
        <component
          :is="item.icon"
          class="w-6 h-6 text-[#4a4a4a] group-hover:text-[#0b1f3f]"
        />
        <span
          class="text-[9px] font-bold uppercase text-[#4a4a4a] tracking-widest"
          >{{ item.label }}</span
        >
        <span class="text-sm font-black text-[#0b1f3f]">{{ item.value }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Gauge,
  Radio,
  Video,
  Radar,
  ShieldCheck,
  BatteryCharging,
} from "lucide-vue-next";
// Bạn có thể tách tiếp 1 component con SpecTable.vue cho phần bảng
defineProps(["specs"]);
</script>
