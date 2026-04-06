<template>
  <!-- h-screen : Set height component bằng với height màn hình -->
  <div class="flex bg-slate-50 overflow-hidden font-sans">
    <CourseSidebar
      :is-collapsed="isSidebarCollapsed"
      :course-data="courseData"
      :active-id="activeLesson?.id"
      @toggle="isSidebarCollapsed = !isSidebarCollapsed"
      @select="handleSelectLesson"
    />

    <main ref="mainContent" class="h-full flex-1 bg-white flex justify-center">
      <div
        class="w-full h-full transition-all duration-500 ease-in-out py-10"
        :class="
          isSidebarCollapsed
            ? 'max-w-none px-4 md:px-20'
            : 'max-w-5xl px-6 md:px-12'
        "
      >
        <CourseDetail
          v-if="activeLesson"
          :key="activeLesson.id"
          :lesson="activeLesson"
          :course-id="activeLesson.chapterId"
          :completed-lessons="completedLessons"
          @nav-lesson="handleLessonChange"
          @status-changed="updateSidebarStatus"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CourseSidebar from "@/layout/CourseSidebar.vue";
import CourseDetail from "@/components/CourseDetail.vue";
import api from "@/utils/apis/axios";

const isSidebarCollapsed = ref(false);
const courseData = ref([]);
const completedLessons = ref([]);
const activeLesson = ref(null);
const mainContent = ref(null);
const isLoading = ref(false);

const fetchData = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get("/courses");

    // data = { chapters: [...], completedLessons: [...] }
    courseData.value = data.chapters;
    completedLessons.value = data.completedLessons || [];

    if (data.chapters.length > 0 && data.chapters[0].lessons?.length > 0) {
      handleSelectLesson(data.chapters[0].lessons[0]);
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Cập nhật danh sách bài đã học khi CourseDetail emit lên
 */
const handleProgressUpdate = (lessonId) => {
  if (!completedLessons.value.includes(lessonId)) {
    completedLessons.value.push(lessonId);
  }
};
const handleLessonChange = (direction) => {
  const currentIndex = allLessons.findIndex(
    (l) => l.id === currentLesson.value.id,
  );
  if (direction === "next" && currentIndex < allLessons.length - 1) {
    currentLesson.value = allLessons[currentIndex + 1];
  } else if (direction === "prev" && currentIndex > 0) {
    currentLesson.value = allLessons[currentIndex - 1];
  }
};
const handleSelectLesson = (lesson) => {
  // Đảm bảo lesson luôn có chapterId để tránh lỗi "undefined" ở Backend
  activeLesson.value = lesson;

  // Cuộn khung nội dung chính lên đầu khi chuyển bài
  if (mainContent.value) {
    mainContent.value.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(fetchData);
</script>
