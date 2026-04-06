<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <CourseSidebar
      :is-collapsed="isSidebarCollapsed"
      :course-data="courseData"
      :active-id="activeLesson?.id"
      :completed-ids="completedLessons"
      @toggle="isSidebarCollapsed = !isSidebarCollapsed"
      @select="handleSelectLesson"
    />

    <main ref="mainContent" class="flex-1 bg-white overflow-y-auto">
      <div
        class="w-full transition-all duration-500 ease-in-out py-10 mx-auto"
        :class="isSidebarCollapsed ? 'max-w-none px-10' : 'max-w-5xl px-6'"
      >
        <CourseDetail
          v-if="activeLesson"
          :key="activeLesson.id"
          :lesson="activeLesson"
          :course-id="activeLesson.chapterId"
          :completed-lessons="completedLessons"
          @nav-lesson="handleLessonChange"
          @status-changed="handleProgressUpdate"
        />

        <div
          v-else
          class="flex flex-col items-center justify-center h-full text-slate-400"
        >
          <p>Đang tải bài học...</p>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import CourseSidebar from "@/layout/CourseSidebar.vue";
import CourseDetail from "@/components/CourseDetail.vue";
import api from "@/utils/apis/axios";

const isSidebarCollapsed = ref(false);
const courseData = ref([]); // Danh sách Chapters từ BE
const completedLessons = ref([]); // Danh sách ID bài học đã xong
const activeLesson = ref(null);
const mainContent = ref(null);

// Tối ưu: Tạo danh sách phẳng tất cả bài học để điều hướng Next/Prev dễ dàng
const allLessons = computed(() => {
  return courseData.value.flatMap((chapter) => chapter.lessons || []);
});

// Course.vue
const fetchData = async () => {
  try {
    // Gọi song song 2 API quan trọng nhất
    const [courseRes, progressRes] = await Promise.all([
      api.get("/courses"),
      api.get("/progress/overall"),
    ]);

    // 1. Xử lý Cấu trúc khóa học
    if (courseRes.data && courseRes.data.chapters) {
      courseData.value = courseRes.data.chapters.map((chapter) => ({
        ...chapter,
        isOpen: true, // Mặc định mở sidebar
        // Gán chapterId vào từng lesson để tránh lỗi undefined khi gọi API chi tiết
        lessons: (chapter.lessons || []).map((lesson) => ({
          ...lesson,
          chapterId: chapter.id,
        })),
      }));
    }

    // 2. Xử lý Tiến độ (Giải quyết lỗi mất trạng thái khi F5)
    if (progressRes.data && progressRes.data.completedLessons) {
      completedLessons.value = progressRes.data.completedLessons.map(Number);
    }

    // 3. Chọn bài học mặc định (Nếu chưa có bài nào đang active)
    if (allLessons.value.length > 0 && !activeLesson.value) {
      activeLesson.value = allLessons.value[0];
    }
  } catch (error) {
    console.error("Lỗi tải dữ liệu khóa học:", error);
  }
};

// Xử lý khi CourseDetail báo đã học xong (cuộn xuống cuối)
const handleProgressUpdate = (lessonId) => {
  const id = Number(lessonId);
  if (!completedLessons.value.includes(id)) {
    // Cập nhật local state để Sidebar mở khóa ngay lập tức không cần F5
    completedLessons.value = [...completedLessons.value, id];
    console.log("Đã cập nhật tiến độ local:", id);
  }
};

// Xử lý chuyển bài Next/Prev
const handleLessonChange = (direction) => {
  const currentIndex = allLessons.value.findIndex(
    (l) => l.id === activeLesson.value?.id,
  );

  if (direction === "next" && currentIndex < allLessons.value.length - 1) {
    activeLesson.value = allLessons.value[currentIndex + 1];
  } else if (direction === "prev" && currentIndex > 0) {
    activeLesson.value = allLessons.value[currentIndex - 1];
  }

  // Cuộn lên đầu trang sau khi đổi bài
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleSelectLesson = (lesson) => {
  activeLesson.value = lesson;
};

onMounted(fetchData);
</script>
