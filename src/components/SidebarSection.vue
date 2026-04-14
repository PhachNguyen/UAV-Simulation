<template>
  <div
    class="bg-[#0B1F3F] rounded-lg shadow-sm overflow-hidden text-white mb-6"
  >
    <h3
      class="font-bold text-lg px-5 py-4 tracking-wide uppercase border-b border-white/10"
    >
      {{ title }}
    </h3>

    <ul class="flex flex-col text-sm text-slate-200">
      <li v-for="(item, index) in items" :key="index">
        <a
          href="#"
          class="block px-5 py-2.5 hover:bg-slate-600/50 transition-colors"
          :class="{ 'mb-2': index === items.length - 1 }"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>
