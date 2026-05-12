<script setup>
import { ref } from "vue";
import CourseSidebar from "../layout/CourseSidebar.vue";
import { onMounted } from "vue";
import api from "@/utils/apis/axios";
import { compute } from "three/tsl";
const isSimulating = ref(false);
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
// 1. Quản lý trạng thái tiến độ
const progress = ref(70);
// const currentModule = ref("Mô-đun 02: Khí động học");
const courseStructure = ref([]); // Lưu chapters + lessons
const completedLessonIds = ref([]); // Lưu mảng ID đã hoàn thành: [1, 2, 3]
const activeLessonId = ref(null);
import ProductSimulation from "@/components/ProductSimulation.vue";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
const isLoading = ref(false);
const authStore = useAuthStore();
const authRequired = ref(false);
const hasAuthenticatedUser = computed(() =>
  Boolean(authStore.user && authStore.token),
);
const showLoginRequired = computed(
  () => authRequired.value || !hasAuthenticatedUser.value,
);
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
//  Fetch model3D
// Thêm vào sau computed currentLesson

const model3DUrl = computed(() => {
  // Thêm dấu ?. sau currentLesson.value
  const path = currentLesson.value?.model3DPath;

  if (!path) return "";

  // Nối domain backend nếu là đường dẫn tương đối
  return path.startsWith("http") ? path : `http://localhost:5000${path}`;
});
//  Fetch data
// Tìm Chapter hiện tại dựa trên activeLessonId
const currentChapter = computed(() => {
  if (!activeLessonId.value || courseStructure.value.length === 0) return null;

  // Tìm trong danh sách chapters xem thằng nào chứa cái lessonId đang active
  return courseStructure.value.find((chapter) =>
    chapter.lessons?.some((lesson) => lesson.id === activeLessonId.value),
  );
});
//  Download tài liệu
const videoEmbedUrl = computed(() => {
  const url = currentLesson.value?.videoUrl;
  if (!url) return "";

  // 1. Nếu đã là link embed chuẩn thì trả về luôn
  if (url.includes("/embed/")) return url;

  // 2. Regex thần thánh: Bắt được cả youtube.com/watch?v=... và youtu.be/...
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  // Nếu tìm thấy ID video (thường có 11 ký tự)
  if (match && match[2].length === 11) {
    const videoId = match[2];
    // Trả về link embed sạch sẽ, bỏ qua các tham số rác như ?si=...
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  }

  // 3. Nếu không phải link YouTube (ví dụ video cục bộ /uploads/...)
  // thì trả về link gốc kèm domain backend
  if (url.startsWith("/")) {
    return `http://localhost:5000${url}`;
  }

  return url;
});

// Thêm một computed để kiểm tra xem có phải video YouTube không
const isYoutube = computed(() => {
  const url = currentLesson.value?.videoUrl || "";
  return url.includes("youtube.com") || url.includes("youtu.be");
});
const downloadResource = (relativeUrl) => {
  if (!relativeUrl) return;

  // Nối Base URL của Backend vào
  const baseUrl = "http://localhost:5000";
  const fullUrl = relativeUrl.startsWith("http")
    ? relativeUrl
    : `${baseUrl}${relativeUrl}`;

  // Mở trong tab mới
  window.open(fullUrl, "_blank");
};

// 1. API Fetch dữ liệu Aero-X
const fetchAllData = async () => {
  if (!hasAuthenticatedUser.value) {
    authRequired.value = true;
    courseStructure.value = [];
    completedLessonIds.value = [];
    activeLessonId.value = null;
    return;
  }

  isLoading.value = true;
  authRequired.value = false;

  try {
    const { data } = await api.get("/courses");

    // 1. Gán mảng bài học đã xong trước
    completedLessonIds.value = data.completedLessons;
    courseStructure.value = data.chapters;

    // 2. Sau đó mới gán activeLessonId
    if (data.lastAccessed) {
      activeLessonId.value = data.lastAccessed; // Sẽ nhảy về bài 8
    } else {
      activeLessonId.value = data.chapters[0]?.lessons[0]?.id;
    }
  } catch (error) {
    if ([401, 403].includes(error.response?.status)) {
      authRequired.value = true;
      courseStructure.value = [];
      completedLessonIds.value = [];
      activeLessonId.value = null;
      return;
    }

    console.error("Lỗi tải dữ liệu khóa học:", error);
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
// --- TRONG <script setup> CỦA TRANG CHA ---
// Hàm bổ trợ để tìm Chapter ID từ Lesson ID
const findChapterId = (lessonId) => {
  // Duyệt qua toàn bộ cấu trúc khóa học mà cậu đã fetch từ BE
  const chapter = courseStructure.value.find((ch) =>
    ch.lessons?.some((l) => l.id === lessonId),
  );

  // Trả về ID của chương đó, nếu không thấy thì trả về null
  return chapter ? chapter.id : null;
};

// Hàm xử lý khi nhấn "Bài giảng tiếp theo"
const handleNextLesson = async ({ currentId, nextId }) => {
  try {
    // 1. Tìm chapterId (giữ nguyên logic cũ của cậu)
    const chapterId = findChapterId(currentId);

    // 2. Luôn gọi API để lưu bài vừa học (Giúp nhảy lên 100% ở bài cuối)
    await api.post("/progress/update", { lessonId: currentId, chapterId });

    // 3. Cập nhật mảng local để Sidebar hiện tích xanh và nhảy %
    if (!completedLessonIds.value.includes(currentId)) {
      completedLessonIds.value.push(currentId);
    }

    // 4. CHỈ CHUYỂN BÀI NẾU CÓ BÀI MỚI
    // Nếu nextId trùng currentId (bài cuối), chúng ta không gán lại để tránh load lại trang
    if (nextId && nextId !== activeLessonId.value) {
      activeLessonId.value = nextId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (error) {
    console.error("Lỗi cập nhật SkyLink:", error);
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
      <section
        v-if="showLoginRequired"
        class="flex-1 min-h-[420px] flex items-center justify-center"
      >
        <div
          class="w-full max-w-xl rounded-lg border border-slate-200 bg-white px-6 py-10 text-center shadow-sm"
        >
          <div
            class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700"
          >
         <i class="ph ph-user-circle text-4xl text-slate-900"></i>
          </div>
          <h1 class="text-2xl font-bold text-slate-900">
            Bạn cần đăng nhập để xem
          </h1>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            Đăng nhập tài khoản học viên để mở nội dung bài giảng và lưu tiến
            độ học tập.
          </p>
          <router-link
            to="/login"
            class="mt-6 inline-flex items-center justify-center rounded-lg bg-[#13203A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Đăng nhập
          </router-link>
        </div>
      </section>

      <div
        class="flex-1 flex flex-col gap-8 min-w-0"
        v-else-if="currentLesson"
      >
        <div>
          <h2
            class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono"
          >
            Bài giảng //
            {{ currentChapter?.title || "Chương không xác định" }}
          </h2>
          <h1 class="text-3xl font-bold text-slate-900">
            {{ currentLesson.title }}
          </h1>
        </div>

        <div
          class="relative bg-slate-900 rounded-lg overflow-hidden aspect-[16/9] shadow-sm border border-slate-200"
        >
          <!-- Gán URL video -->
          <iframe
            v-if="isYoutube"
            :src="videoEmbedUrl"
            class="w-full h-full"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            allowfullscreen
          ></iframe>

          <!-- Trường hợp video cục bộ -->
          <video
            v-else-if="currentLesson.videoUrl"
            controls
            class="w-full h-full object-cover"
            :src="`http://localhost:5000${currentLesson.videoUrl}`"
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
              <!-- <div
                class="text-right text-xs text-white/80 font-mono drop-shadow-md"
              >
                <div>LAT: 45.5231 N</div>
                <div>LON: 122.6765 W</div>
              </div> -->
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
              v-html="currentLesson.description"
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
              Tài nguyên bài giảng
            </h3>
            <div class="space-y-3">
              <div
                v-for="res in currentLesson.resources"
                :key="res.name"
                class="flex items-center justify-between p-3 bg-white rounded-md border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group shadow-sm"
                @click="downloadResource(res.url)"
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
        v-if="!showLoginRequired && courseStructure.length"
        :structure="courseStructure"
        :active-lesson-id="activeLessonId"
        :completed-lessons="completedLessonIds"
        @select-lesson="handleSelect"
        @next-lesson="handleNextLesson"
      />
    </main>
    <section
      v-if="!showLoginRequired && currentLesson?.model3DPath"
      class="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl mt-4 max-w-[1400px] mx-auto w-full"
    >
      <div
        class="px-8 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-500/10 rounded-lg">
            <i class="ph ph-cube text-blue-400 text-xl"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-widest">
              Hệ thống Mô phỏng 3D
            </h3>
            <p
              class="text-[10px] text-slate-500 font-bold uppercase mt-0.5 font-mono"
            >
              [ TRẠNG THÁI: KIỂM TRA LINH KIỆN TƯƠNG TÁC ]
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span
            class="text-[9px] font-black text-teal-400 uppercase tracking-tighter"
            >Live Telemetry</span
          >
        </div>
      </div>

      <div class="relative h-[700px] bg-[#080808]">
        <Uav3DViewer
          :key="activeLessonId"
          :admin="false"
          :modelSrc="model3DUrl"
          :customHotspots="currentLesson.hotspots"
        />

        <div class="absolute bottom-6 left-6 pointer-events-none">
          <div
            class="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl text-white/60 text-[10px] font-bold uppercase tracking-widest space-y-1"
          >
            <div class="flex items-center gap-2">
              <i class="ph ph-mouse"></i> Chuột trái: Xoay mô hình
            </div>
            <div class="flex items-center gap-2">
              <i class="ph ph-magnifying-glass-plus"></i> Cuộn chuột: Phóng
              to/thu nhỏ
            </div>
            <div class="flex items-center gap-2">
              <i class="ph ph-cursor-click"></i> Click điểm: Xem chi tiết linh
              kiện
            </div>
          </div>
        </div>
      </div>
    </section>
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
