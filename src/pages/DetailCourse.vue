<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import api from "@/utils/apis/axios";
import Swal from "sweetalert2";
// Import components
import CourseSidebar from "../layout/CourseSidebar.vue";
import Uav3DViewer from "@/components/Uav3DViewer.vue";

// ==========================================
// 1. STATE & STORES
// ==========================================
const authStore = useAuthStore();
const isLoading = ref(false);
const authRequired = ref(false);

const courseStructure = ref([]); // Lưu chapters + lessons
const completedLessonIds = ref([]); // Lưu mảng ID đã hoàn thành
const activeLessonId = ref(null);

// ==========================================
// 2. PHÂN QUYỀN VÀ AUTHENTICATION
// ==========================================
const hasAuthenticatedUser = computed(() =>
  Boolean(authStore.user && authStore.token)
);

const showLoginRequired = computed(
  () => authRequired.value || !hasAuthenticatedUser.value
);

// Bắt bao quát mọi tên gọi của Admin (admin, Quản trị viên...)
const isAdmin = computed(() => {
  const role = authStore.user?.role;
  if (!role) return false;
  const adminRoles = ["admin", "Admin", "quản trị viên", "Quản trị viên"];
  return adminRoles.includes(role);
});

// ==========================================
// 3. COMPUTED DATA (LẤY DỮ LIỆU BÀI HỌC)
// ==========================================
const currentLesson = computed(() => {
  if (!courseStructure.value || courseStructure.value.length === 0) return null;
  for (const chapter of courseStructure.value) {
    const lesson = chapter.lessons?.find((l) => l.id === activeLessonId.value);
    if (lesson) return lesson;
  }
  return null;
});

const currentChapter = computed(() => {
  if (!activeLessonId.value || courseStructure.value.length === 0) return null;
  return courseStructure.value.find((chapter) =>
    chapter.lessons?.some((lesson) => lesson.id === activeLessonId.value)
  );
});

const model3DUrl = computed(() => {
  const path = currentLesson.value?.model3DPath;
  if (!path) return "";
  return path.startsWith("http") ? path : `http://localhost:5000${path}`;
});

// Xử lý link Video (Youtube hoặc Local)
const isYoutube = computed(() => {
  const url = currentLesson.value?.videoUrl || "";
  return url.includes("youtube.com") || url.includes("youtu.be");
});

const videoEmbedUrl = computed(() => {
  const url = currentLesson.value?.videoUrl;
  if (!url) return "";

  if (url.includes("/embed/")) return url;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1`;
  }
  if (url.startsWith("/")) {
    return `http://localhost:5000${url}`;
  }
  return url;
});

// ==========================================
// 4. CÁC HÀM XỬ LÝ (METHODS)
// ==========================================
const downloadResource = (relativeUrl) => {
  if (!relativeUrl) return;
  const baseUrl = "http://localhost:5000";
  const fullUrl = relativeUrl.startsWith("http")
    ? relativeUrl
    : `${baseUrl}${relativeUrl}`;
  window.open(fullUrl, "_blank");
};

const findChapterId = (lessonId) => {
  const chapter = courseStructure.value.find((ch) =>
    ch.lessons?.some((l) => l.id === lessonId)
  );
  return chapter ? chapter.id : null;
};

// ==========================================
// 5. GỌI API VÀ LƯU TIẾN ĐỘ
// ==========================================
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
    courseStructure.value = data.chapters || [];

    // NẾU LÀ ADMIN -> MỞ KHÓA TOÀN BỘ CÁC BÀI HỌC
    if (isAdmin.value) {
      const allLessonIds = [];
      data.chapters?.forEach((chapter) => {
        chapter.lessons?.forEach((lesson) => {
          allLessonIds.push(lesson.id);
        });
      });
      completedLessonIds.value = allLessonIds;
    } else {
      // HỌC VIÊN -> Lấy dữ liệu thật
      completedLessonIds.value = data.completedLessons || [];
    }

    // Chọn bài học hiển thị mặc định
    if (data.lastAccessed) {
      activeLessonId.value = data.lastAccessed;
    } else if (data.chapters?.[0]?.lessons?.[0]) {
      activeLessonId.value = data.chapters[0].lessons[0].id;
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

const handleSelect = (id) => {
  activeLessonId.value = id;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleNextLesson = async ({ currentId, nextId }) => {
  try {
    const chapterId = findChapterId(currentId);

    // Chỉ gọi API lưu tiến trình nếu là học viên (không phải admin)
    if (!isAdmin.value && chapterId) {
      await api.post("/progress/update", { lessonId: currentId, chapterId });
    }

    if (!completedLessonIds.value.includes(currentId)) {
      completedLessonIds.value.push(currentId);
    }

    if (nextId && nextId !== activeLessonId.value) {
      activeLessonId.value = nextId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (error) {
    console.error("Lỗi cập nhật tiến độ:", error);
  }
};

// ==========================================
// 6. LIFECYCLE
// ==========================================
onMounted(() => {
  fetchAllData();
});
</script>

<template>
  <div class="text-slate-800 antialiased min-h-screen flex flex-col font-inter bg-slate-50">
    <main class="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8 flex flex-col lg:flex-row gap-8">
      
      <section
        v-if="showLoginRequired"
        class="flex-1 min-h-[420px] flex items-center justify-center"
      >
        <div class="w-full max-w-xl rounded-lg border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <i class="ph ph-user-circle text-4xl text-slate-900"></i>
          </div>
          <h1 class="text-2xl font-bold text-slate-900">
            Bạn cần đăng nhập để xem
          </h1>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            Đăng nhập tài khoản học viên để mở nội dung bài giảng và lưu tiến độ học tập.
          </p>
          <router-link
            to="/login"
            class="mt-6 inline-flex items-center justify-center rounded-lg bg-[#13203A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Đăng nhập
          </router-link>
        </div>
      </section>

      <div class="flex-1 flex flex-col gap-8 min-w-0" v-else-if="currentLesson">
        <div>
          <h2 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
            Bài giảng // {{ currentChapter?.title || "Chương không xác định" }}
          </h2>
          <h1 class="text-3xl font-bold text-slate-900">
            {{ currentLesson.title }}
          </h1>
        </div>

        <div class="relative bg-slate-900 rounded-lg overflow-hidden aspect-[16/9] shadow-sm border border-slate-200">
          <iframe
            v-if="isYoutube"
            :src="videoEmbedUrl"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            allowfullscreen
          ></iframe>

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
            <div class="absolute inset-0 flex items-center justify-center text-white/50 font-mono text-sm">
              [ TÍN HIỆU VIDEO TRỐNG ]
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
              Tóm tắt nhiệm vụ
            </h3>
            <div
              class="text-slate-600 text-sm leading-relaxed mb-6 prose max-w-none"
              v-html="currentLesson.description"
            ></div>
            <div class="flex items-center gap-4 text-xs font-semibold text-slate-700">
              <div class="flex items-center gap-1.5">
                <i class="ph-fill ph-clock text-slate-400"></i>
                {{ currentLesson.duration || "15:00" }}
              </div>
              <div class="flex items-center gap-1.5">
                <i class="ph-fill ph-seal-check text-slate-400"></i> Level 4 Cert
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
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
                  <div class="w-8 h-8 bg-[#0b1f3f] text-white rounded flex items-center justify-center text-[10px] font-bold uppercase">
                    {{ res.name.split(".").pop() }}
                  </div>
                  <span class="text-sm font-bold text-slate-800 group-hover:text-blue-900 line-clamp-1">
                    {{ res.name }}
                  </span>
                </div>
                <i class="ph ph-download-simple text-slate-400 group-hover:text-blue-600"></i>
              </div>
            </div>
          </div>
        </div>

        <section class="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-8">
            Nội dung chi tiết bài học
          </h2>
          <div class="space-y-12">
            <div v-for="(section, index) in currentLesson.sections" :key="section.id">
              <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-mono text-slate-600">
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
      <div class="px-8 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-500/10 rounded-lg">
            <i class="ph ph-cube text-blue-400 text-xl"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-widest">
              Hệ thống Mô phỏng 3D
            </h3>
            <p class="text-[10px] text-slate-500 font-bold uppercase mt-0.5 font-mono">
              [ TRẠNG THÁI: KIỂM TRA LINH KIỆN TƯƠNG TÁC ]
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span class="text-[9px] font-black text-teal-400 uppercase tracking-tighter">Live Telemetry</span>
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
          <div class="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl text-white/60 text-[10px] font-bold uppercase tracking-widest space-y-1">
            <div class="flex items-center gap-2">
              <i class="ph ph-mouse"></i> Chuột trái: Xoay mô hình
            </div>
            <div class="flex items-center gap-2">
              <i class="ph ph-magnifying-glass-plus"></i> Cuộn chuột: Phóng to/thu nhỏ
            </div>
            <div class="flex items-center gap-2">
              <i class="ph ph-cursor-click"></i> Click điểm: Xem chi tiết linh kiện
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-white border-t border-slate-200 mt-auto">
      <div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
        <div class="flex items-center gap-6">
          <span class="text-slate-900">SPEC-01 // HUD_OS</span>
          <a href="#" class="hover:text-blue-900 transition-colors">Giao thức đo từ xa</a>
          <a href="#" class="hover:text-blue-900 transition-colors">Điều khoản bay</a>
          <a href="#" class="hover:text-blue-900 transition-colors">Trạng thái hệ thống</a>
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