<template>
  <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
    <div class="lg:col-span-7 space-y-4">
      <div
        class="bg-[#f8f9fa] rounded-2xl border border-[#dee2e6] overflow-hidden relative group"
      >
        <img
          :src="activeImage"
          alt="Main"
          class="w-full aspect-video object-contain p-12 transition-all duration-700"
        />
      </div>
      <div class="grid grid-cols-4 gap-4">
        <button
          v-for="img in gallery"
          :key="img.id"
          @click="$emit('update:image', img.url)"
          :class="[
            activeImage === img.url
              ? 'border-[#0b1f3f] shadow-md'
              : 'border-[#dee2e6] opacity-60 hover:opacity-100',
            'bg-[#f8f9fa] border-2 rounded-xl overflow-hidden aspect-video p-2 transition-all',
          ]"
        >
          <img :src="img.url" class="w-full h-full object-contain" />
        </button>
      </div>
    </div>

    <div class="lg:col-span-5 space-y-8">
      <div class="space-y-4">
        <p
          class="text-[#0b1f3f] font-bold text-[10px] tracking-[0.3em] uppercase opacity-60"
        >
          High-End Surveillance
        </p>
        <h1
          class="text-6xl font-black text-[#0b1f3f] leading-none tracking-tighter"
        >
          {{ productName }}
        </h1>
      </div>
      <p class="text-[#4a4a4a] leading-relaxed text-sm font-medium">
        {{ description }}
      </p>
      <div class="flex flex-col gap-3">
        <button
          class="w-full py-4 bg-[#0b1f3f] text-white font-bold rounded flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase hover:shadow-2xl transition-all"
        >
          <Download class="w-4 h-4" /> Tải mô phỏng
        </button>
        <button
          class="w-full py-4 border-2 border-[#0b1f3f] text-[#0b1f3f] font-bold rounded flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase hover:bg-slate-50 transition-all"
        >
          <Compass class="w-4 h-4" /> Khám phá công nghệ
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Download, Compass } from "lucide-vue-next";
defineProps(["gallery", "activeImage", "productName", "description"]);
defineEmits(["update:image"]);
</script>
