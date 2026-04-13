<script setup>
import { ref } from "vue";
import CourseSidebar from "../layout/CourseSidebar.vue";
import { onMounted } from "vue";
import api from "@/utils/apis/axios";
import { compute } from "three/tsl";
import { computed } from "vue";
// 1. Quản lý trạng thái tiến độ
const progress = ref(70);
// const currentModule = ref("Mô-đun 02: Khí động học");
const courseStructure = ref([]); // Lưu chapters + lessons
const completedLessonIds = ref([]); // Lưu mảng ID đã hoàn thành: [1, 2, 3]
const activeLessonId = ref(null);
const isLoading = ref(false);
// 2. Dữ liệu chương trình đào tạo (Sidebar)
// const curriculum = ref([
//   {
//     name: "Mô-đun 01: Cơ bản về lõi",
//     lessons: [
//       { title: "An toàn & Chuẩn bị", time: "04:15", status: "completed" },
//       { title: "Bản đồ bộ điều khiển", time: "08:20", status: "completed" },
//     ],
//   },
//   {
//     name: "Mô-đun 02: Khí động học",
//     lessons: [
//       { title: "Điều hướng cột nhiệt", time: "18:20", status: "active" },
//       { title: "Bù nhiễu loạn", time: "12:45", status: "locked" },
//       { title: "Kỹ thuật hạ cánh chính xác", time: "15:10", status: "locked" },
//     ],
//   },
//   {
//     name: "Mô-đun 03: Đo từ xa",
//     lessons: [
//       { title: "Cảm biến & Luồng dữ liệu", time: "22:00", status: "locked" },
//     ],
//   },
// ]);
//  Fetch data

// 3. Tài nguyên đính kèm
const resources = ref([
  { name: "THERMAL_PHYSICS_V2.PDF", type: "PDF", color: "bg-[#0b1f3f]" },
  { name: "MISSION_LOG_SHEET.XLSX", type: "XLSX", color: "bg-green-700" },
]);

// 4. Nội dung chi tiết bài học (Dễ dàng mở rộng/API hóa)
const lessonDetails = ref([
  {
    id: "01",
    title: "Tổng quan về Khí động học Drone",
    paragraphs: [
      "Tìm hiểu về các lực tác động lên thiết bị bay không người lái trong quá trình vận hành. Khí động học đóng vai trò then chốt trong việc tối ưu hóa hiệu suất bay và tiết kiệm năng lượng pin. Trong phần này, chúng ta sẽ phân tích sâu về các dòng khí bao quanh cánh quạt và thân máy.",
      "Cơ chế tạo lực nâng (lift) và lực cản (drag) được giải thích thông qua các mô hình mô phỏng thực tế. Việc hiểu rõ các thông số này giúp phi công điều khiển thiết bị ổn định hơn trong các điều kiện môi trường khắc nghiệt như gió mạnh hoặc nhiễu động không khí cục bộ.",
    ],
  },
  {
    id: "02",
    title: "Kỹ thuật Điều hướng Cột nhiệt (Thermals)",
    paragraphs: [
      "Cột nhiệt là những luồng không khí nóng bốc lên từ mặt đất, thường xuất hiện trên các bề mặt hấp thụ nhiệt tốt như đường nhựa, mái nhà tôn hoặc cánh đồng khô hạn. Phi công nâng cao có thể tận dụng các cột nhiệt này để duy trì độ cao mà không cần sử dụng nhiều năng lượng từ động cơ.",
      "Để xác định cột nhiệt, phi công cần quan sát các dấu hiệu thị giác như sự di chuyển của chim săn mồi, sự hình thành của mây tích (cumulus) hoặc sử dụng cảm biến áp suất (barometer) có độ nhạy cao. Bài học này sẽ hướng dẫn quy trình xoay vòng (circling) để 'bám' vào tâm của cột nhiệt hiệu quả nhất.",
    ],
    note: "Lưu ý: Luôn duy trì quan sát đường chân trời và các vật cản xung quanh khi đang tập trung tìm kiếm luồng khí bốc.",
  },
  {
    id: "03",
    title: "Quản lý Năng lượng và Tối ưu hóa Pin",
    paragraphs: [
      "Một trong những kỹ năng quan trọng nhất của phi công drone chuyên nghiệp là khả năng quản lý dung lượng pin còn lại. Việc sử dụng cột nhiệt kết hợp với chế độ bay lượn (gliding) có thể tăng thời gian hoạt động lên tới 25-30% so với bay thông thường.",
      "Chúng ta sẽ nghiên cứu biểu đồ tiêu thụ điện năng dựa trên vận tốc gió và trọng lượng tải trọng. Các bài tập thực hành sẽ giúp bạn rèn luyện phản xạ tính toán khoảng cách an toàn để quay về điểm xuất phát (RTH - Return to Home) dựa trên các biến số môi trường thay đổi liên tục.",
    ],
  },
]);

// 1. API Fetch dữ liệu Aero-X
const fetchAllData = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get("/courses");
    courseStructure.value = data.chapters;
    completedLessonIds.value = data.completedLessons;

    // Tự động chọn bài đầu tiên nếu mới vào trang
    if (!activeLessonId.value && data.chapters[0]?.lessons[0]) {
      activeLessonId.value = data.chapters[0].lessons[0].id;
    }
  } catch (error) {
    console.error("SkyLink Error:", error);
  } finally {
    isLoading.value = false;
  }
};
// 2. COMPUTED: Tìm bài học hiện tại từ cấu trúc BE
const currentLesson = computed(() => {
  for (const chapter of courseStructure.value) {
    const lesson = chapter.lessons.find((l) => l.id === activeLessonId.value);
    if (lesson) return lesson;
  }
  return null;
});
onMounted(fetchAllData);

const handleSelect = (id) => {
  activeLessonId.value = id;
  // Logic load nội dung bài học mới ở đây...
};
const nextLesson = () => {
  // Phẳng hóa danh sách bài học
  const allLessons = courseStructure.value.flatMap((ch) => ch.lessons);
  const currentIndex = allLessons.findIndex(
    (l) => l.id === activeLessonId.value,
  );

  if (currentIndex < allLessons.length - 1) {
    activeLessonId.value = allLessons[currentIndex + 1].id;
  } else {
    alert("Chúc mừng! Bạn đã hoàn thành khóa học.");
  }
};
</script>

<template>
  <div
    class="text-slate-800 antialiased min-h-screen flex flex-col font-inter bg-slate-50"
  >
    <!-- <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div
        class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-8">
          <a
            href="#"
            class="text-xl font-bold tracking-tight text-slate-900 font-mono"
            >AERO_HUD</a
          >
          <nav
            class="hidden md:flex items-center h-full space-x-6 text-sm font-semibold text-slate-600 uppercase tracking-wide"
          >
            <a href="#" class="hover:text-slate-900 transition-colors"
              >Bảng điều khiển</a
            >
            <a href="#" class="hover:text-slate-900 transition-colors"
              >Giới thiệu</a
            >
            <a
              href="#"
              class="text-slate-900 border-b-2 border-blue-900 h-16 flex items-center"
              >Khóa học</a
            >
            <a href="#" class="hover:text-slate-900 transition-colors"
              >Mô phỏng</a
            >
          </nav>
        </div>
        <div class="flex items-center gap-5 text-slate-500">
          <button class="hover:text-slate-900 relative">
            <i class="ph-fill ph-bell text-xl"></i>
            <span
              class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"
            ></span>
          </button>
          <button class="hover:text-slate-900">
            <i class="ph-fill ph-gear text-xl"></i>
          </button>
          <button
            class="w-8 h-8 rounded-full overflow-hidden border border-slate-200 ml-2"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header> -->

    <main
      class="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8 flex flex-col lg:flex-row gap-8"
    >
      <div class="flex-1 flex flex-col gap-8 min-w-0" v-if="currentLesson">
        <div>
          <h2
            class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono"
          >
            Mục tiêu nhiệm vụ // {{ currentLesson.title }}
          </h2>
          <h1 class="text-3xl font-bold text-slate-900">
            Khóa học SkyLink Drone
          </h1>
        </div>

        <div
          class="relative bg-slate-900 rounded-lg overflow-hidden aspect-[16/9] shadow-sm border border-slate-200"
        >
          <iframe
            v-if="
              currentLesson.videoUrl &&
              currentLesson.videoUrl.includes('youtube')
            "
            :src="currentLesson.videoUrl.replace('watch?v=', 'embed/')"
            class="w-full h-full"
            frameborder="0"
            allowfullscreen
          ></iframe>

          <video
            v-else-if="currentLesson.videoUrl"
            controls
            class="w-full h-full object-cover"
            :src="currentLesson.videoUrl"
          ></video>

          <div v-else class="w-full h-full relative">
            <img
              src="../assets/img/DJI Flip_thumbail_2.webp"
              class="w-full h-full object-cover opacity-50"
            />
            <div
              class="absolute inset-0 flex items-center justify-center text-white/50 font-mono text-sm"
            >
              [ TÍN HIỆU VIDEO TRỐNG ]
            </div>
          </div>

          <div
            class="absolute inset-0 pointer-events-none flex flex-col justify-between p-4"
          >
            <div class="flex justify-between items-start">
              <div
                class="bg-slate-800/80 backdrop-blur border border-slate-600/50 rounded p-2 px-3 text-xs text-white font-mono flex items-center gap-2"
              >
                <i class="ph ph-target"></i> Tín hiệu: Ổn định
              </div>
              <div
                class="text-right text-xs text-white/80 font-mono drop-shadow-md"
              >
                <div>LAT: 45.5231 N</div>
                <div>LON: 122.6765 W</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3
              class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4"
            >
              Tóm tắt nhiệm vụ
            </h3>
            <div
              class="text-slate-600 text-sm leading-relaxed mb-6 prose max-w-none"
              v-html="currentLesson.content"
            ></div>
            <div
              class="flex items-center gap-4 text-xs font-semibold text-slate-700"
            >
              <div class="flex items-center gap-1.5">
                <i class="ph-fill ph-clock text-slate-400"></i>
                {{ currentLesson.duration || "15:00" }}
              </div>
              <div class="flex items-center gap-1.5">
                <i class="ph-fill ph-seal-check text-slate-400"></i> Level 4
                Cert
              </div>
            </div>
          </div>

          <div>
            <h3
              class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4"
            >
              Tài nguyên chiến thuật
            </h3>
            <div class="space-y-3">
              <div
                v-for="res in currentLesson.resources"
                :key="res.name"
                class="flex items-center justify-between p-3 bg-white rounded-md border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group shadow-sm"
                @click="window.open(res.url, '_blank')"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-[#0b1f3f] text-white rounded flex items-center justify-center text-[10px] font-bold uppercase"
                  >
                    {{ res.name.split(".").pop() }}
                  </div>
                  <span
                    class="text-sm font-bold text-slate-800 group-hover:text-blue-900 line-clamp-1"
                  >
                    {{ res.name }}
                  </span>
                </div>
                <i
                  class="ph ph-download-simple text-slate-400 group-hover:text-blue-600"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <section
          class="bg-white border border-slate-200 rounded-lg p-8 shadow-sm"
        >
          <h2
            class="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-8"
          >
            Nội dung chi tiết bài học
          </h2>
          <div class="space-y-12">
            <div
              v-for="(section, index) in currentLesson.sections"
              :key="section.id"
            >
              <h3
                class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"
              >
                <span
                  class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-mono text-slate-600"
                >
                  {{ index + 1 }}
                </span>
                {{ section.title }}
              </h3>
              <div
                class="text-slate-600 leading-relaxed prose max-w-none"
                v-html="section.content"
              ></div>
            </div>
          </div>
        </section>
      </div>

      <CourseSidebar
        :structure="courseStructure"
        :active-lesson-id="activeLessonId"
        :completed-lessons="completedLessonIds"
        @select-lesson="handleSelect"
        @next-lesson="nextLesson"
      />
    </main>

    <footer class="bg-white border-t border-slate-200 mt-auto">
      <div
        class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono"
      >
        <div class="flex items-center gap-6">
          <span class="text-slate-900">SPEC-01 // HUD_OS</span>
          <a href="#" class="hover:text-blue-900 transition-colors"
            >Giao thức đo từ xa</a
          >
          <a href="#" class="hover:text-blue-900 transition-colors"
            >Điều khoản bay</a
          >
          <a href="#" class="hover:text-blue-900 transition-colors"
            >Trạng thái hệ thống</a
          >
        </div>
        <div>© 2026 TRÍ TUỆ HÀNG KHÔNG</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");

.font-inter {
  font-family: "Inter", sans-serif;
}
.font-mono {
  font-family: "JetBrains Mono", monospace;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
* {
  scrollbar-width: thin;

  scrollbar-color: #cbd5e1 #f1f5f9;
}
</style>
