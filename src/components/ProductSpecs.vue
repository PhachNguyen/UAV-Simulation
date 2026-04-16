<template>
  <section class="space-y-12">
    <h2
      class="text-2xl font-black text-[#0b1f3f] uppercase tracking-tight flex items-center gap-3"
    >
      <span class="w-2 h-8 bg-[#0b1f3f]"></span> Thông số kỹ thuật chi tiết
    </h2>

    <div class="grid lg:grid-cols-2 gap-8">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <Gauge class="w-5 h-5 text-[#0b1f3f]" />
          <h3
            class="text-[11px] font-black uppercase tracking-[0.2em] text-[#0b1f3f]"
          >
            Hiệu suất vận hành
          </h3>
        </div>
        <div
          class="border border-[#dee2e6] rounded-2xl overflow-hidden bg-white shadow-sm"
        >
          <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-[#dee2e6]">
              <tr
                v-for="item in specs.flight"
                :key="item.label"
                class="hover:bg-slate-50 transition-colors"
              >
                <td
                  class="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/2"
                >
                  {{ item.label }}
                </td>
                <td
                  class="px-6 py-4 text-xs font-black text-[#0b1f3f] uppercase"
                >
                  {{ item.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <Radio class="w-5 h-5 text-[#0b1f3f]" />
          <h3
            class="text-[11px] font-black uppercase tracking-[0.2em] text-[#0b1f3f]"
          >
            Hệ thống truyền tải
          </h3>
        </div>
        <div
          class="border border-[#dee2e6] rounded-2xl overflow-hidden bg-white shadow-sm"
        >
          <table class="w-full text-left border-collapse">
            <tbody class="divide-y divide-[#dee2e6]">
              <tr
                v-for="item in specs.transmission"
                :key="item.label"
                class="hover:bg-slate-50 transition-colors"
              >
                <td
                  class="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/2"
                >
                  {{ item.label }}
                </td>
                <td
                  class="px-6 py-4 text-xs font-black text-[#0b1f3f] uppercase"
                >
                  {{ item.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
        >
          {{ item.label }}
        </span>
        <span class="text-sm font-black text-[#0b1f3f]">{{ item.value }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Gauge, Radio, Weight, Ruler } from "lucide-vue-next";

// Nhận dữ liệu specs từ Blog.vue truyền xuống
defineProps({
  specs: {
    type: Object,
    default: () => ({
      flight: [],
      transmission: [],
      physical: [],
    }),
  },
});
</script>
