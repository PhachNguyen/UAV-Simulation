<template>
  <aside class="w-full lg:w-64 flex-shrink-0 flex flex-col gap-6">
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">
        Phân loại
      </h3>
      <ul class="space-y-1">
        <li v-for="cat in categories" :key="cat.id">
          <button
            @click="$emit('select-category', cat.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            :class="activeCategory === cat.id
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            {{ cat.name }}
          </button>
        </li>
      </ul>
    </div>

    </aside>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  activeCategory: {
    type: [String, Number], // Chứa ID của danh mục đang được chọn
    default: "all",
  },
  filters: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['select-category']);
</script>