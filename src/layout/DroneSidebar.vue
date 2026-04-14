<template>
  <aside class="w-full lg:w-64 flex-shrink-0 flex flex-col">
    <SidebarSection title="Phân loại" :items="categories" />

    <SidebarSection v-if="filters.length" title="Filters" :items="filters" />
  </aside>
</template>

<script setup>
import SidebarSection from "@/components/SidebarSection.vue";

// Nhận dữ liệu từ ProductPage truyền xuống
defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  filters: {
    type: Array,
    default: () => [],
  },
});
</script>
