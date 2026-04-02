<template>
  <aside
    :class="[
      'bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out z-30',
      isCollapsed ? 'w-20' : 'w-80',
    ]"
  >
    <div
      class="p-6 border-b border-slate-100 flex items-center justify-between overflow-hidden"
    >
      <h2
        v-show="!isCollapsed"
        class="text-lg font-black text-slate-800 uppercase tracking-tighter truncate"
      >
        Tài liệu khóa học
      </h2>
      <button
        @click="isCollapsed = !isCollapsed"
        class="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
      >
        <Menu class="w-5 h-5 cursor-pointer" />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto custom-scrollbar p-4">
      <div
        v-for="(section, idx) in courseData"
        :key="idx"
        class="cursor-pointer"
        style="margin-bottom: 12px"
      >
        <button
          v-show="!isCollapsed"
          @click="section.isOpen = !section.isOpen"
          style="cursor: pointer; margin-bottom: 12px"
          class="w-full flex items-center justify-between mb-4 px-2 text-[12px] font-black uppercase text-slate-900 tracking-widest"
        >
          {{ section.title }}
          <ChevronDown
            :class="[
              'w-3 h-3 transition-transform cursor-pointer',
              section.isOpen ? 'rotate-180' : '',
            ]"
          />
        </button>

        <div
          v-show="section.isOpen || isCollapsed"
          class="space-y-2 cursor-pointer"
        >
          <div
            v-for="lesson in section.lessons"
            :key="lesson.id"
            @click="$emit('select', lesson)"
            :class="[
              'cursor-pointer group flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all border-2 flex justify-center',
              activeId === lesson.id
                ? 'bg-teal-50 border-teal-200'
                : 'border-transparent hover:bg-slate-50',
            ]"
          >
            <div
              :class="[
                'shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                lesson.completed
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-400 group-hover:bg-white',
              ]"
            >
              <Check v-if="lesson.completed" class="w-4 h-4" />
              <Play v-else class="w-3 h-3 fill-current" />
            </div>

            <div v-show="!isCollapsed" class="flex-1 overflow-hidden">
              <h4
                class="text-sm font-bold text-slate-700 truncate leading-tight"
              >
                {{ lesson.title }}
              </h4>
              <span class="text-[10px] font-bold text-slate-400 uppercase"
                >{{ lesson.duration }}m</span
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { Menu, ChevronDown, Check, Play } from "lucide-vue-next";
defineProps(["courseData", "activeId"]);
defineEmits(["select"]);
const isCollapsed = ref(false);
</script>
