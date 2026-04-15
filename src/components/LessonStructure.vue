<script setup>
import { ref } from "vue";
import {
  GripVertical,
  Plus,
  ChevronRight,
  BookOpen,
  FileText,
  X,
  Trash2,
} from "lucide-vue-next";

const props = defineProps({
  structure: {
    type: Array,
    required: true,
    default: () => [],
  },
  status: {
    type: String,
    default: "Nháp",
  },
  activeLessonId: { type: [Number, String], default: null },
});

const emit = defineEmits([
  "add-chapter",
  "add-lesson",
  "remove-item",
  "select-lesson",
]);

// Trạng thái lưu trữ các ID chương đang mở (mặc định mở chương đầu tiên)
// Kiểm tra nếu structure tồn tại và có phần tử thì mới lấy ID của chương đầu tiên
const expandedChapters = ref(
  new Set(
    props.structure && props.structure.length > 0
      ? [props.structure[0].id]
      : [],
  ),
);
// Hàm đóng/mở chương
const toggleChapter = (chapterId) => {
  if (expandedChapters.value.has(chapterId)) {
    expandedChapters.value.delete(chapterId);
  } else {
    expandedChapters.value.add(chapterId);
  }
};
</script>

<template>
  <aside class="lg:col-span-3 space-y-6">
    <div
      class="bg-white rounded-xl border border-[#dee2e6] p-6 shadow-sm space-y-6 sticky top-24 max-h-[85vh] overflow-y-auto"
    >
      <h3 class="text-sm font-black text-[#0b1f3f] uppercase tracking-[0.2em]">
        Cấu trúc Bài học
      </h3>

      <div class="space-y-4">
        <div
          v-for="(chapter, cIndex) in structure"
          :key="chapter.id"
          class="space-y-2"
        >
          <div
            @click="toggleChapter(chapter.id)"
            class="flex items-center gap-3 p-3 bg-slate-50 border border-[#dee2e6] rounded-lg group hover:border-[#0b1f3f] transition-all cursor-pointer select-none"
          >
            <GripVertical
              class="w-4 h-4 text-slate-300 group-hover:text-[#0b1f3f] cursor-grab"
              @click.stop
            />

            <ChevronRight
              class="w-4 h-4 text-[#0b1f3f] transition-transform duration-300"
              :class="{ 'rotate-90': expandedChapters.has(chapter.id) }"
            />

            <span
              class="text-[11px] font-black text-[#0b1f3f] uppercase truncate flex-1"
            >
              {{ chapter.title }}
            </span>
            <button
              @click.stop="emit('remove-item', { cIndex })"
              class="cursor-pointer opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
            >
              <Trash2 class="w-3 h-3 text-red-500" />
            </button>
            <span class="text-[9px] font-bold text-slate-400 font-mono">
              ({{ chapter.lessons?.length || 0 }})
            </span>
          </div>

          <div
            v-show="expandedChapters.has(chapter.id)"
            class="pl-6 space-y-2 border-l-2 border-slate-100 ml-5 overflow-hidden transition-all"
          >
            <div
              v-for="(lesson, lIndex) in chapter.lessons"
              :key="lesson.id"
              @click="emit('select-lesson', lesson.id)"
              class="p-3 border rounded-lg flex items-center gap-3 group transition-all cursor-pointer shadow-sm"
              :class="[
                activeLessonId === lesson.id
                  ? 'bg-[#0b1f3f] border-[#0b1f3f] ring-2 ring-[#0b1f3f]/10'
                  : 'bg-white border-[#dee2e6] hover:border-[#0b1f3f]',
              ]"
            >
              <FileText
                class="w-3.5 h-3.5"
                :class="
                  activeLessonId === lesson.id ? 'text-white' : 'text-slate-400'
                "
              />

              <span
                class="text-[11px] font-bold tracking-wide flex-1"
                :class="
                  activeLessonId === lesson.id ? 'text-white' : 'text-[#4a4a4a]'
                "
              >
                {{ lesson.title }}
              </span>

              <button
                @click.stop="emit('remove-item', { cIndex, lIndex })"
                class="p-1 transition-all"
                :class="
                  activeLessonId === lesson.id
                    ? 'text-white/50 hover:text-white'
                    : 'opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500'
                "
              >
                <X class="w-3 h-3" />
              </button>
            </div>

            <button
              @click.stop="emit('add-lesson', chapter.id)"
              class="w-full py-2 border border-dashed border-[#dee2e6] text-[#4a4a4a] text-[9px] font-black uppercase rounded-md hover:border-[#0b1f3f] hover:text-[#0b1f3f] transition-all flex items-center justify-center gap-2 bg-white"
            >
              <Plus class="w-3 h-3" /> Thêm Bài học
            </button>
          </div>
        </div>

        <!-- <button
          @click="emit('add-chapter')"
          class="w-full py-4 border-2 border-dashed border-[#dee2e6] text-slate-400 text-[10px] font-black uppercase rounded-lg hover:border-[#0b1f3f] hover:text-[#0b1f3f] transition-all flex items-center justify-center gap-2 mt-4 bg-slate-50/50"
        >
          <Plus class="w-4 h-4" /> Thêm Chương mới
        </button> -->
      </div>

      <div
        class="pt-6 border-t border-[#f1f3f5] flex justify-between items-center"
      >
        <span
          class="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest"
          >Trạng thái:</span
        >
        <span
          class="px-4 py-1.5 bg-slate-100 text-[#0b1f3f] text-[10px] font-black uppercase rounded-full border border-slate-200"
        >
          {{ status }}
        </span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
@reference "tailwindcss";

/* Hiệu ứng mượt cho v-show nếu muốn (tùy chọn) */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
