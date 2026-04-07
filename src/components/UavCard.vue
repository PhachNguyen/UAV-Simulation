<template>
  <div
    class="group bg-white border border-gray-300 rounded-xl p-5 transition-all duration-500 hover:shadow-2xl hover:border-blue-200 flex flex-col relative overflow-hidden"
  >
    <div
      v-if="product.status"
      :class="[
        product.badgeColor || 'bg-blue-500',
        'absolute top-4 left-4 z-10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm',
      ]"
    >
      {{ product.status || "Unknown Status" }}
    </div>

    <div
      class="relative w-full aspect-[4/3] mb-4 overflow-hidden bg-gray-50 rounded-xl flex items-center justify-center"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="w-10/12 h-10/12 object-contain transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    <div
      class="mb-1 text-[10px] font-bold text-blue-500 uppercase tracking-[0.15em]"
    >
      {{ product.category || "Unknown Category" }}
    </div>
    <h3 class="text-base font-black text-gray-800 mb-3 line-clamp-1">
      {{ product.name || "Unknown Product" }}
    </h3>

    <div class="grid grid-cols-3 gap-2 mb-5 border-y border-gray-50 py-3">
      <div class="text-center">
        <p class="text-[9px] text-gray-400 uppercase font-bold">Pin</p>
        <p class="text-[11px] font-black text-gray-700">
          {{ product.stats.battery || "N/A" }}
        </p>
      </div>
      <div class="text-center border-x border-gray-50">
        <p class="text-[9px] text-gray-400 uppercase font-bold">Tầm xa</p>
        <p class="text-[11px] font-black text-gray-700">
          {{ product.stats.range || "N/A" }}
        </p>
      </div>
      <div class="text-center">
        <p class="text-[9px] text-gray-400 uppercase font-bold">Tốc độ</p>
        <p class="text-[11px] font-black text-gray-700">
          {{ product.stats.speed || "N/A" }}
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-auto">
      <div class="">
        <!-- <span
          v-if="product.oldPrice"
          class="text-xs text-gray-400 line-through font-medium"
        >
          ${{ product.oldPrice || 0 }}
        </span> -->
        <!-- <span class="text-lg font-black text-gray-900"
          >${{ product.price || 0 }}</span
        > -->
        <span class="text-sm font-black text-gray-900">Khám phá</span>
      </div>
      <!--  Sự kiện Click ra Detail -->
      <button
        @click="$emit('view-detail', product)"
        class="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-950 cursor-pointer transition-colors duration-300 group/btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 group-hover/btn:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
defineEmits(["view-detail"]);
</script>
