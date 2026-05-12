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

    <main ref="mainContent" class="flex-1 bg-white overflow-y-auto relative">
      
      <div v-if="isGuest" class="bg-indigo-50 border-b border-indigo-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <p class="text-sm font-bold text-indigo-900">Chế độ xem trước (Bài học mẫu)</p>
            <p class="text-xs text-indigo-700">Bạn đang xem với tư cách khách. Tiến độ học sẽ không được lưu lại.</p>
          </div>
        </div>
        <button @click="router.push('/login')" class="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          Đăng nhập ngay
        </button>
      </div>

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
          :is-guest="isGuest" 
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
import { useRouter } from "vue-router";
import CourseSidebar from "@/layout/CourseSidebar.vue";
import CourseDetail from "@/components/CourseDetail.vue";
import api from "@/utils/apis/axios";

const router = useRouter();
const isSidebarCollapsed = ref(false);
const courseData = ref([]); 
const completedLessons = ref([]); 
const activeLesson = ref(null);
const mainContent = ref(null);

// Trạng thái kiểm tra xem có phải khách không
const isGuest = ref(false);

// Tối ưu: Tạo danh sách phẳng tất cả bài học để điều hướng Next/Prev dễ dàng
const allLessons = computed(() => {
  return courseData.value.flatMap((chapter) => chapter.lessons || []);
});

// KIỂM TRA ĐĂNG NHẬP
const checkAuth = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

// DỮ LIỆU BÀI HỌC MẪU (MOCK DATA)
const sampleCourseData = [
  {
    id: "sample-chapter-1",
    title: "Chương 1: Tổng quan về UAV (Học thử)",
    isOpen: true,
    lessons: [
      {
        id: "sample-lesson-1",
        chapterId: "sample-chapter-1",
        title: "1. Lịch sử và Phân loại thiết bị bay",
        content: `
          <h2>Chào mừng bạn đến với khóa học UAV</h2>
          <p>Đây là bài học mẫu dành cho khách tham quan. Thiết bị bay không người lái (UAV) hay Drone đã trải qua quá trình phát triển dài từ mục đích quân sự sang các ứng dụng dân sự đa dạng.</p>
          <br/>
          <p><strong>Nội dung chính:</strong></p>
          <ul>
            <li>Khái niệm cơ bản về UAV.</li>
            <li>Phân biệt UAV cánh bằng và Rotary-wing (Quadcopter).</li>
            <li>Ứng dụng trong bản đồ, nông nghiệp và quay phim.</li>
          </ul>
        `,
        video_url: "", // Bạn có thể thêm link video Youtube vào đây nếu có
      },
      {
        id: "sample-lesson-2",
        chapterId: "sample-chapter-1",
        title: "2. Nguyên lý khí động học cơ bản",
        content: `
          <h2>Khí động học trên Quadcopter</h2>
          <p>Dù là học thử, bạn vẫn có thể chuyển bài để trải nghiệm cảm giác điều hướng của website.</p>
          <p>Để một chiếc Quadcopter bay lên, tổng lực nâng (Thrust) tạo ra từ 4 cánh quạt phải lớn hơn trọng lực (Gravity) của máy bay.</p>
        `,
      }
    ]
  }
];

const fetchData = async () => {
  isGuest.value = !checkAuth();

  // NẾU LÀ KHÁCH CHƯA ĐĂNG NHẬP -> DÙNG DỮ LIỆU MẪU
  if (isGuest.value) {
    courseData.value = sampleCourseData;
    completedLessons.value = []; // Khách chưa học bài nào
    if (allLessons.value.length > 0) {
      activeLesson.value = allLessons.value[0];
    }
    return; // Dừng hàm tại đây, không gọi API
  }

  // NẾU ĐÃ ĐĂNG NHẬP -> GỌI API BÌNH THƯỜNG
  try {
    const [courseRes, progressRes] = await Promise.all([
      api.get("/courses"),
      api.get("/progress/overall"),
    ]);

    if (courseRes.data && courseRes.data.chapters) {
      courseData.value = courseRes.data.chapters.map((chapter) => ({
        ...chapter,
        isOpen: true,
        lessons: (chapter.lessons || []).map((lesson) => ({
          ...lesson,
          chapterId: chapter.id,
        })),
      }));
    }

    if (progressRes.data && progressRes.data.completedLessons) {
      completedLessons.value = progressRes.data.completedLessons.map(Number);
    }

    if (allLessons.value.length > 0 && !activeLesson.value) {
      activeLesson.value = allLessons.value[0];
    }
  } catch (error) {
    console.error("Lỗi tải dữ liệu khóa học:", error);
  }
};

// Xử lý khi bấm nút "Hoàn thành bài học"
const handleProgressUpdate = (lessonId) => {
  const id = lessonId;
  
  if (!completedLessons.value.includes(id)) {
    // Lưu tạm vào bộ nhớ để giao diện Sidebar cập nhật dấu tick xanh
    completedLessons.value = [...completedLessons.value, id];
    console.log("Đã cập nhật tiến độ local:", id);
    
    if (isGuest.value) {
      console.log("Khách đã hoàn thành bài mẫu. Không gọi API lưu database.");
    }
  }
};

const handleLessonChange = (direction) => {
  const currentIndex = allLessons.value.findIndex(
    (l) => l.id === activeLesson.value?.id,
  );

  if (direction === "next" && currentIndex < allLessons.value.length - 1) {
    activeLesson.value = allLessons.value[currentIndex + 1];
  } else if (direction === "prev" && currentIndex > 0) {
    activeLesson.value = allLessons.value[currentIndex - 1];
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleSelectLesson = (lesson) => {
  activeLesson.value = lesson;
};

onMounted(fetchData);
</script>