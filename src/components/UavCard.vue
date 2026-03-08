<template>
  <div class="group">
    <div
      class="relative bg-slate-100 rounded-3xl aspect-square overflow-hidden mb-5"
    >
      <div
        v-if="uav.status"
        :class="uav.badgeColor"
        class="absolute top-4 left-4 text-white text-[10px] font-black px-3 py-1 rounded-full z-10 shadow-sm uppercase"
      >
        {{ uav.status }}
      </div>
      <img
        :src="uav.image"
        class="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />
      <div
        class="absolute inset-0 bg-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4"
      >
        <button
          @click="$emit('open-sim', uav)"
          class="w-full bg-white text-slate-900 py-3.5 rounded-2xl shadow-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-teal-600 hover:text-white"
        >
          Mô phỏng 3D
        </button>
      </div>
    </div>
    <div class="px-2">
      <h3 class="font-bold text-slate-800 mb-1 truncate text-lg">
        {{ uav.name }}
      </h3>
      <div class="flex items-center gap-3 mb-4">
        <span class="font-black text-teal-600 text-xl">${{ uav.price }}</span>
        <span
          v-if="uav.oldPrice"
          class="text-slate-400 line-through text-sm font-medium"
          >${{ uav.oldPrice }}</span
        >
      </div>
      <div class="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
        <div v-for="(val, label) in uav.stats" :key="label" class="text-center">
          <span class="block text-[10px] text-slate-400 font-bold uppercase">{{
            label
          }}</span>
          <span class="text-xs font-bold">{{ val }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["uav"]);
defineEmits(["open-sim"]);
</script>
