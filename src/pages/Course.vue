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
import { ref, onMounted, computed } from "vue";
import CourseSidebar from "@/layout/CourseSidebar.vue";
import CourseDetail from "@/components/CourseDetail.vue";
import api from "@/utils/apis/axios"; // Đảm bảo đường dẫn axios của bạn đúng

// --- STATE ---
const isSidebarCollapsed = ref(false);
const courseData = ref([]); // Khởi tạo mảng rỗng
const activeLesson = ref(null); // Ban đầu chưa có bài học nào được chọn
const mainContent = ref(null);
const isLoading = ref(false);

// --- LOGIC LẤY DỮ LIỆU TỪ BE ---
const fetchData = async () => {
  try {
    isLoading.value = true;
    // Gọi API lấy Chapter -> Lesson -> Section (đã populate ở BE)
    const { data } = await api.get("/courses");
    courseData.value = data;

    // Tự động chọn bài học đầu tiên của chương đầu tiên nếu có
    if (data.length > 0 && data[0].lessons?.length > 0) {
      handleSelectLesson(data[0].lessons[0]);
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu học tập:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleSelectLesson = (lesson) => {
  // Vì BE đã populate sẵn các sections vào trong lesson,
  // nên ta chỉ cần gán thẳng đối tượng lesson này vào activeLesson
  activeLesson.value = lesson;

  // Cuộn lên đầu trang
  if (mainContent.value) {
    mainContent.value.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(fetchData);
</script>
