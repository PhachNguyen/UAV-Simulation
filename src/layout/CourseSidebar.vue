<script setup>
import { ref, computed } from "vue";
import { Menu, ChevronDown, Check, Play, Lock } from "lucide-vue-next";

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
      'bg-white border-r transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-80',
    ]"
  >
    <div class="p-5 border-b flex items-center justify-between">
      <h2 v-show="!isCollapsed" class="text-xs font-black uppercase">
        Nội dung khóa học
      </h2>
      <button
        @click="isCollapsed = !isCollapsed"
        class="p-2 hover:bg-slate-100 rounded-xl"
      >
        <Menu class="w-5 h-5" />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-3 space-y-4">
      <div v-for="(section, sIdx) in courseData" :key="section.id">
        <button
          v-show="!isCollapsed"
          @click="section.isOpen = !section.isOpen"
          class="w-full flex justify-between px-2 mb-2"
        >
          <span class="text-[10px] font-bold text-slate-400 uppercase">{{
            section.title
          }}</span>
          <ChevronDown
            :class="[
              'w-3 h-3 transition-transform',
              section.isOpen ? 'rotate-180' : '',
            ]"
          />
        </button>

        <div v-show="section.isOpen || isCollapsed" class="space-y-1">
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
              <p class="text-[9px] text-slate-400 uppercase">
                {{
                  isUnlocked(sIdx, lIdx)
                    ? (lesson.duration || 0) + " phút"
                    : "Đang khóa"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>
