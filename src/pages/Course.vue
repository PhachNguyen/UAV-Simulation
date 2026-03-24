<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden font-sans">
    <CourseSidebar
      :is-collapsed="isSidebarCollapsed"
      :course-data="courseData"
      :active-id="activeLesson?.id"
      @toggle="isSidebarCollapsed = !isSidebarCollapsed"
      @select="handleSelectLesson"
    />

    <main
      ref="mainContent"
      class="flex-1 overflow-y-auto custom-scrollbar bg-white flex justify-start pt-[10px] pl-[12px] scroll-smooth"
    >
      <div
        class="w-full transition-all duration-500 ease-in-out px-6 md:px-12 py-10"
        :class="isSidebarCollapsed ? 'max-w-6xl' : 'max-w-4xl'"
      >
        <CourseDetail
          v-if="activeLesson"
          :key="activeLesson.id"
          :lesson="activeLesson"
        />
      </div>
    </main>

    <!-- <CourseWidgets :downloads="downloadFiles" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
</script>
