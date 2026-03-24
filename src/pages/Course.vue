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
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CourseSidebar from "@/layout/CourseSidebar.vue";
import CourseDetail from "@/components/CourseDetail.vue";
import CourseWidgets from "@/components/CourseWidgets.vue";

// Import dữ liệu từ file data riêng
import {
  courseData as rawCourseData,
  lessonContentMap, // Nhập Map chứa nội dung chi tiết
  downloadFiles as rawDownloadFiles,
} from "@/data/uavCourseData";

// --- STATE ---
const isSidebarCollapsed = ref(false);
const courseData = ref(rawCourseData);
const downloadFiles = ref(rawDownloadFiles);
const mainContent = ref(null);

// Khởi tạo bài học đầu tiên (mặc định là bài 101 hoặc bài bạn muốn)
const activeLesson = ref(lessonContentMap[101]);

// --- LOGIC ---
const handleSelectLesson = (lesson) => {
  // 1. Tìm nội dung chi tiết dựa trên ID từ Map
  const detailedContent = lessonContentMap[lesson.id];

  if (detailedContent) {
    activeLesson.value = detailedContent;

    // 2. Tự động cuộn lên đầu trang khi đổi bài học
    if (mainContent.value) {
      mainContent.value.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
// onMounted(() => {
//   // Khi component được mount, ẩn scroll của cả trang
//   document.documentElement.style.overflow = "hidden";
//   // Nếu chắc chắn hơn, bạn có thể set cho cả body
//   document.body.style.overflow = "hidden";
// });

// onUnmounted(() => {
//   // QUAN TRỌNG: Khi rời khỏi trang, phải trả lại trạng thái cũ
//   document.documentElement.style.overflow = "auto";
//   document.body.style.overflow = "auto";
// });
</script>
