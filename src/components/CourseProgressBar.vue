<template>
  <div
    class="px-6 py-4 border-b border-slate-100 bg-white rounded-t-[2rem]"
    style="padding: 32px"
  >
    <div
      class="flex justify-between items-end mb-2"
      style="margin-bottom: 12px"
    >
      <div>
        <h4
          class="text-[14px] font-black text-shadow-slate-300 uppercase tracking-widest"
        >
          Tiến độ khóa học
        </h4>
        <p class="text-xs font-bold text-teal-600 mt-1">
          {{ completed }}/{{ total }} bài học
        </p>
      </div>
      <span class="text-xl font-black text-teal-600">{{ percentage }}%</span>
    </div>
    <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div
        class="bg-teal-500 h-full transition-all duration-1000 ease-out"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  completed: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
});
</script>
