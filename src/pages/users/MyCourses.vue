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

const fetchData = async () => {
  try {
    isLoading.value = true;
    // 1. Lấy cấu trúc bài học
    const resCourse = await api.get("/courses");
    chapters.value = resCourse.data.chapters;

    // 2. Lấy danh sách ID đã hoàn thành (Ví dụ: [1, 2])
    const resProgress = await api.get("/progress/1");
    completedLessonIds.value =
      resProgress.data.completedLessons?.map((id) => Number(id)) || [];

    // 3. Lấy phần trăm tổng quát
    const resOverall = await api.get("/progress/overall/1");
    overallProgress.value = resOverall.data;
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
  // 1. Kiểm tra an toàn: Nếu chưa có dữ liệu chapters hoặc chương đó không tồn tại
  if (
    !chapters.value ||
    chapters.value.length === 0 ||
    !chapters.value[chapterIdx]
  ) {
    return true; // Mặc định khóa nếu chưa có dữ liệu
  }

  // 2. Bài đầu tiên của chương 1 luôn mở
  if (chapterIdx === 0 && lessonIdx === 0) return false;

  let prevLesson;

  // 3. Nếu là bài tiếp theo trong cùng chương
  if (lessonIdx > 0) {
    const currentChapterLessons = chapters.value[chapterIdx].lessons;
    if (!currentChapterLessons || !currentChapterLessons[lessonIdx - 1])
      return true;

    prevLesson = currentChapterLessons[lessonIdx - 1];
  }
  // 4. Nếu là bài đầu tiên của chương sau
  else {
    const prevChapter = chapters.value[chapterIdx - 1];
    // Kiểm tra chương trước có tồn tại và có bài học không
    if (
      !prevChapter ||
      !prevChapter.lessons ||
      prevChapter.lessons.length === 0
    ) {
      return true;
    }
    prevLesson = prevChapter.lessons[prevChapter.lessons.length - 1];
  }

  // 5. Cuối cùng, kiểm tra xem bài trước đó đã xong chưa
  return !isCompleted(prevLesson.id);
};

onMounted(fetchData);
</script>
