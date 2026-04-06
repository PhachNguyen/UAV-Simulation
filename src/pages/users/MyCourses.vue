<template>
  <div
    class="max-w-5xl mx-auto pb-20"
    style="letter-spacing: 0.05em; margin-bottom: 1rem"
  >
    <section-header title="Khóa học của tôi" />
    <div
      class="text-2xl font-bold text-slate-800"
      style="letter-spacing: 0.05em; margin-bottom: 1rem"
    >
      Khóa học của tôi
    </div>
    <CourseProgressBar
      :completed="overallProgress.completedCount"
      :total="overallProgress.totalLessons"
      :percentage="overallProgress.percentage"
      style="margin-bottom: 2rem"
    />

    <div v-if="isLoading" class="flex flex-col items-center py-20">
      <Loader2 class="w-10 h-10 animate-spin text-teal-500 mb-4" />
      <p class="text-slate-400 font-bold uppercase text-xs tracking-widest">
        Đang tải giáo trình...
      </p>
    </div>

    <div v-else class="mt-10 space-y-8" style="margin-top: 30px">
      <div
        v-for="(chapter, cIdx) in chapters"
        :key="chapter.id"
        class="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm"
        style="margin: 12px"
      >
        <div
          class="p-6 border-b border-slate-50 bg-white flex items-center gap-5"
        >
          <div
            class="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg"
          >
            0{{ cIdx + 1 }}
          </div>
          <div>
            <h3 class="font-black text-slate-800 tracking-tight">
              {{ chapter.title }}
            </h3>
            <p class="text-[11px] text-slate-400 font-medium">
              {{ chapter.description }}
            </p>
          </div>
        </div>

        <div class="p-4 space-y-3 bg-slate-50/30">
          <LessonItem
            v-for="(lesson, lIdx) in chapter.lessons"
            :key="lesson.id"
            :lesson="lesson"
            :is-completed="isCompleted(lesson.id)"
            :is-locked="isLocked(cIdx, lIdx)"
            @select="handleLessonSelect(cIdx, lIdx, lesson.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import {
  Check,
  Database,
  Activity,
  Plane,
  Loader2,
  Lock,
  PlayCircle,
} from "lucide-vue-next";
import CourseProgressBar from "@/components/CourseProgressBar.vue";
import LessonItem from "@/components/LessonItem.vue";
import api from "@/utils/apis/axios";

const chapters = ref([]);
const completedLessonIds = ref([]);
const overallProgress = ref({
  completedCount: 0,
  totalLessons: 0,
  percentage: 0,
});
const isLoading = ref(true);

// MyCourses.vue - Phần Script setup đã refactor
const fetchData = async () => {
  try {
    isLoading.value = true;

    // 1. Lấy cấu trúc bài học và Tiến độ tổng quát cùng lúc
    const [resCourse, resOverall] = await Promise.all([
      api.get("/courses"),
      api.get("/progress/overall"),
    ]);

    // Gán dữ liệu chapters
    chapters.value = resCourse.data.chapters || [];

    // 2. Lấy danh sách ID đã hoàn thành
    // Lưu ý: Bạn nên lấy từ resOverall nếu Backend đã gom hết ID vào đó
    if (resOverall.data.completedLessons) {
      completedLessonIds.value = resOverall.data.completedLessons.map(Number);
    }

    // 3. Tính toán lại Overall Progress để tránh lỗi "5/0"
    const total = chapters.value.reduce(
      (acc, ch) => acc + (ch.lessons?.length || 0),
      0,
    );
    const completed = completedLessonIds.value.length;

    overallProgress.value = {
      completedCount: completed,
      totalLessons: total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  } catch (error) {
    console.error("Lỗi fetch data:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- LOGIC QUAN TRỌNG ---

// 1. Kiểm tra bài đã xong chưa
const isCompleted = (lessonId) =>
  completedLessonIds.value.includes(Number(lessonId));

// 2. Kiểm tra bài có bị khóa không
// MyCourses.vue

const isLocked = (chapterIdx, lessonIdx) => {
  const currentChapter = chapters.value[chapterIdx];
  const lesson = currentChapter?.lessons?.[lessonIdx];

  if (!lesson) return true;

  // MỚI: Nếu bài này đã nằm trong danh sách hoàn thành -> LUÔN MỞ
  if (isCompleted(lesson.id)) return false;

  // Bài đầu tiên của khóa học luôn mở
  if (chapterIdx === 0 && lessonIdx === 0) return false;

  let prevLesson;

  if (lessonIdx > 0) {
    // Bài trước trong cùng chương
    prevLesson = currentChapter.lessons[lessonIdx - 1];
  } else {
    // Bài cuối của chương trước
    const prevChapter = chapters.value[chapterIdx - 1];
    if (!prevChapter || !prevChapter.lessons?.length) return true;
    prevLesson = prevChapter.lessons[prevChapter.lessons.length - 1];
  }

  // Mở nếu bài trước đó đã xong
  return !isCompleted(prevLesson.id);
};

onMounted(fetchData);
</script>
