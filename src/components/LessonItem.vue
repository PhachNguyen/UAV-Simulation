<template>
  <div
    @click="$emit('select')"
    class="group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300"
    :class="[
      isLocked
        ? 'bg-slate-50/50 border-transparent opacity-60 cursor-not-allowed'
        : 'bg-white border-slate-100 hover:border-teal-200 hover:shadow-md cursor-pointer',
    ]"
  >
    <div class="flex items-center gap-4">
      <div
        class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors"
        :class="
          isCompleted
            ? 'bg-teal-500 border-teal-500'
            : 'border-slate-100 group-hover:border-teal-300'
        "
      >
        <Check v-if="isCompleted" class="w-4 h-4 text-white" />
        <Lock v-else-if="isLocked" class="w-3.5 h-3.5 text-slate-300" />
        <PlayCircle v-else class="w-4 h-4 text-teal-500" />
      </div>

      <div class="flex flex-col">
        <span
          class="text-sm font-bold"
          :class="isLocked ? 'text-slate-400' : 'text-slate-700'"
        >
          {{ lesson.title }}
        </span>
        <span
          class="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-0.5"
        >
          15 phút • Lý thuyết
        </span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        v-if="!isLocked && !isCompleted"
        class="bg-teal-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100"
      >
        Học ngay
      </button>
      <div v-if="isLocked" class="p-2 bg-slate-100 rounded-lg">
        <Lock class="w-3.5 h-3.5 text-slate-300" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Check, Lock, PlayCircle } from "lucide-vue-next";
defineProps(["lesson", "isLocked", "isCompleted"]);
defineEmits(["select"]);
</script>
