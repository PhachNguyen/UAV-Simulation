<script setup>
import { computed } from "vue";

const props = defineProps({
  // Cấu trúc khóa học (Chapters -> Lessons) lấy từ BE
  structure: { type: Array, default: () => [] },
  // ID bài học đang mở
  activeLessonId: { type: [Number, String], default: null },
  // Mảng ID các bài đã hoàn thành (Ví dụ: [1, 2, 5])
  completedLessons: { type: Array, default: () => [] },
});

const emit = defineEmits(["select-lesson"]);

// 1. Tự động tính % tiến độ
const progress = computed(() => {
  const allLessons = props.structure.flatMap((ch) => ch.lessons || []);
  if (allLessons.length === 0) return 0;

  const completedCount = allLessons.filter((l) =>
    props.completedLessons.includes(l.id),
  ).length;
  return Math.round((completedCount / allLessons.length) * 100);
});

// 2. Tìm tên Chương hiện tại dựa trên bài đang học
const currentModule = computed(() => {
  const chapter = props.structure.find((ch) =>
    ch.lessons?.some((l) => l.id === props.activeLessonId),
  );
  return chapter ? chapter.title : "Chưa chọn bài";
});

// 3. Helper kiểm tra trạng thái bài học
const getLessonStatus = (lessonId) => {
  if (lessonId === props.activeLessonId) return "active";
  if (props.completedLessons.includes(lessonId)) return "completed";
  return "locked";
};

const handleLessonClick = (lessonId) => {
  emit("select-lesson", lessonId);
};
</script>

<template>
  <aside class="w-full lg:w-[400px] flex flex-col gap-6">
    <div
      class="bg-white rounded-lg p-5 border border-slate-200 flex items-center justify-between shadow-sm"
    >
      <div class="flex-1 mr-6">
        <div class="flex justify-between items-end mb-2">
          <span class="text-xs font-bold text-slate-700 uppercase"
            >Tiến độ khóa học</span
          >
          <span class="text-xs font-bold text-slate-900">{{ progress }}%</span>
        </div>
        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-[#0b1f3f] transition-all duration-700 ease-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
      <div class="text-right text-[10px]">
        <div class="text-slate-500 uppercase mb-1 font-semibold">
          Mô-đun hiện tại:
        </div>
        <div class="font-bold text-slate-800 line-clamp-1">
          {{ currentModule }}
        </div>
      </div>
    </div>

    <div
      class="bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden sticky top-6 shadow-md"
    >
      <div class="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
          Chương trình đào tạo SkyLink
        </h3>
      </div>

      <div class="overflow-y-auto max-h-[calc(100vh-300px)] sidebar-scroll">
        <div v-for="chapter in structure" :key="chapter.id">
          <div
            class="bg-slate-50 px-5 py-3 border-y border-slate-100 sticky top-0 z-10"
          >
            <h4
              class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
            >
              {{ chapter.title }}
            </h4>
          </div>

          <div class="divide-y divide-slate-50">
            <div
              v-for="lesson in chapter.lessons"
              :key="lesson.id"
              @click="handleLessonClick(lesson.id)"
              :class="[
                'p-4 pl-12 relative flex flex-col gap-1 transition-all group cursor-pointer',
                getLessonStatus(lesson.id) === 'active'
                  ? 'bg-blue-50 border-l-4 border-blue-900'
                  : 'hover:bg-slate-50',
              ]"
            >
              <i
                v-if="getLessonStatus(lesson.id) === 'completed'"
                class="ph-fill ph-check-circle text-teal-500 absolute left-5 top-1/2 -translate-y-1/2 text-xl"
              ></i>

              <i
                v-else-if="getLessonStatus(lesson.id) === 'active'"
                class="ph-fill ph-play-circle text-blue-900 absolute left-[17px] top-1/2 -translate-y-1/2 text-xl animate-pulse"
              ></i>

              <i
                v-else
                class="ph-fill ph-lock-key text-slate-300 absolute left-5 top-1/2 -translate-y-1/2 text-lg"
              ></i>

              <div
                :class="[
                  'text-sm font-semibold',
                  getLessonStatus(lesson.id) === 'active'
                    ? 'text-blue-900'
                    : 'text-slate-700',
                ]"
              >
                {{ lesson.title }}
              </div>
              <div class="text-[10px] text-slate-400 font-mono uppercase">
                {{ lesson.duration || "10:00" }}
                <span
                  v-if="getLessonStatus(lesson.id) === 'active'"
                  class="text-blue-600 font-bold"
                  >• Đang học</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 bg-slate-50 border-t border-slate-100">
        <button
          class="w-full bg-[#0b1f3f] hover:bg-slate-800 text-white text-xs font-bold uppercase py-4 rounded-xl transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2"
        >
          Bài giảng tiếp theo <i class="ph-bold ph-arrow-right"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
