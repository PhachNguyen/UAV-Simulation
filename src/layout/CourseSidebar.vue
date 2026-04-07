<script setup>
import { ref, computed } from "vue";
import {
  Menu,
  ChevronDown,
  Check,
  Play,
  Lock,
  LayoutList,
} from "lucide-vue-next";
import gsap from "gsap";

const props = defineProps({
  courseData: { type: Array, default: () => [] },
  activeId: [String, Number],
  completedIds: { type: Array, default: () => [] },
});

const emit = defineEmits(["select"]);
const isCollapsed = ref(false);

// Tối ưu: Chuyển sang Set để kiểm tra bài đã hoàn thành với tốc độ O(1)
const completedSet = computed(() => new Set(props.completedIds.map(Number)));

/**
 * Logic mở khóa bài học
 */
const getLessonStatus = (sIdx, lIdx) => {
  const currentSection = props.courseData?.[sIdx];
  if (!currentSection || !currentSection.lessons) {
    return { isCompleted: false, isUnlocked: false };
  }

  const lesson = currentSection.lessons[lIdx];
  if (!lesson) return { isCompleted: false, isUnlocked: false };

  const idNum = Number(lesson.id);
  const isCompleted = completedSet.value.has(idNum);

  // 1. Đã học xong thì luôn mở
  if (isCompleted) return { isCompleted, isUnlocked: true };

  // 2. Bài đầu tiên của toàn bộ khóa học luôn mở
  if (sIdx === 0 && lIdx === 0) return { isCompleted, isUnlocked: true };

  // 3. Kiểm tra bài trước đó
  let prevLesson = null;
  if (lIdx > 0) {
    prevLesson = currentSection.lessons[lIdx - 1];
  } else {
    const prevSection = props.courseData?.[sIdx - 1];
    if (prevSection?.lessons?.length > 0) {
      prevLesson = prevSection.lessons[prevSection.lessons.length - 1];
    }
  }

  const isUnlocked =
    !prevLesson || completedSet.value.has(Number(prevLesson.id));
  return { isCompleted, isUnlocked };
};

const isUnlocked = (sIdx, lIdx) => getLessonStatus(sIdx, lIdx).isUnlocked;

const handleSelect = (lesson, sIdx, lIdx) => {
  if (isUnlocked(sIdx, lIdx)) {
    emit("select", lesson);
  }
};
</script>
<template>
  <aside
    :class="[
      'bg-white  transition-all duration-300 overflow-y-auto border-r border-slate-200',
      isCollapsed ? 'w-20' : 'w-80',
    ]"
  >
    <!-- Title -->
    <div class="p-5 flex items-center justify-between overflow-auto">
      <h2 v-show="!isCollapsed" class="text-xs font-black uppercase">
        Nội dung bài giảng
      </h2>
      <button
        @click="isCollapsed = !isCollapsed"
        class="p-2 hover:bg-slate-100 rounded-xl"
      >
        <Menu class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-3 space-y-4">
      <div v-for="(section, sIdx) in courseData" :key="section.id">
        <button
          v-show="!isCollapsed"
          @click="section.isOpen = !section.isOpen"
          class="cursor-pointer w-full flex items-center justify-between px-3 py-2 mb-2 rounded-xl hover:bg-slate-50 transition-colors group"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="p-1.5 rounded-lg bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 text-slate-500 transition-colors"
            >
              <LayoutList class="w-3.5 h-3.5" />
            </div>

            <span
              class="text-[11px] font-black text-slate-600 uppercase tracking-wider group-hover:text-slate-900 transition-colors"
            >
              {{ section.title }}
            </span>
          </div>

          <ChevronDown
            :class="[
              'w-3.5 h-3.5 text-slate-400 transition-transform duration-300',
              section.isOpen ? 'rotate-180 text-teal-600' : '',
            ]"
          />
        </button>
        <!-- Truong hợp colláped -->
        <div v-show="section.isOpen || isCollapsed" class="space-y-1">
          <!-- <LayoutList class="w-3.5 h-3.5" /> -->
          <div
            v-for="(lesson, lIdx) in section.lessons"
            :key="lesson.id"
            @click="handleSelect(lesson, sIdx, lIdx)"
            :class="[
              'group flex items-center gap-3 p-3 rounded-2xl border-2 transition-all',
              activeId === lesson.id
                ? 'bg-teal-50 border-teal-200'
                : 'border-transparent hover:bg-slate-50',
              !isUnlocked(sIdx, lIdx)
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer',
            ]"
          >
            <div
              :class="[
                'w-8 h-8 rounded-xl flex items-center justify-center',
                completedSet.has(Number(lesson.id))
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-400',
              ]"
            >
              <Check
                v-if="completedSet.has(Number(lesson.id))"
                class="w-4 h-4"
              />
              <Lock v-else-if="!isUnlocked(sIdx, lIdx)" class="w-3 h-3" />
              <Play v-else class="w-3 h-3 fill-current" />
            </div>

            <div v-show="!isCollapsed" class="flex-1 min-w-0">
              <h4
                :class="[
                  'text-sm font-bold truncate',
                  activeId === lesson.id ? 'text-slate-900' : 'text-slate-600',
                ]"
              >
                {{ lesson.title }}
              </h4>
              <!-- Hastag -->
              <div class="flex flex-wrap gap-1 mt-1">
                <span
                  class="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounder-xl border border-slate-300"
                >
                  # Lý thuyết
                </span>

                <span
                  v-if="lesson.model3DPath"
                  class="px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-600 text-[8px] font-black uppercase rounder-xl border border-slate-300"
                >
                  # Mô phỏng 3D
                </span>

                <span
                  v-if="isUnlocked(sIdx, lIdx)"
                  class="px-1.5 py-0.5 text-[8px] font-bold text-slate-400 uppercase"
                >
                  {{ lesson.duration || gsap.utils.random(5, 50, 1) }}
                  phút
                </span>
                <span
                  v-else
                  class="px-1.5 py-0.5 text-[8px] font-bold text-rose-400 uppercase"
                >
                  Đang khóa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>
