<script setup>
import { ref, computed } from "vue";
import LessonStructure from "@/components/LessonStructure.vue";
import api from "@/utils/apis/axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { onMounted } from "vue";
// --- TRẠNG THÁI (STATE) ---
const isSidebarOpen = ref(true);
const activeLessonId = ref(1);
const isLoading = ref(false);
const courseStructure = ref([]);

/** --- 3. API & CRUD LOGIC --- **/
const fetchCourseData = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get("/courses");
    courseStructure.value = (data.chapters || []).map((chapter) => ({
      ...chapter,
      lessons: (chapter.lessons || []).map((lesson) => ({
        ...lesson,
        content: lesson.content || "",
        hotspots: lesson.hotspots || [],
        sections: lesson.sections || [],
        resources: lesson.resources || [],
      })),
    }));
    // Tự động chọn bài đầu tiên
    if (courseStructure.value[0]?.lessons?.[0]) {
      activeLessonId.value = courseStructure.value[0].lessons[0].id;
    }
  } catch (error) {
    console.error("Lỗi fetch:", error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(fetchCourseData);

// --- COMPUTED ---
const currentLesson = computed(() => {
  // Tìm trong tất cả lessons của tất cả chapters
  for (const chapter of courseStructure.value) {
    const lesson = chapter.lessons.find((l) => l.id === activeLessonId.value);
    if (lesson) return lesson;
  }
  return null;
});

// --- HÀNH ĐỘNG (METHODS) ---
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const selectLesson = (id) => {
  activeLessonId.value = id;
};

// Cập nhật hàm lưu bài học để gửi cả nội dung HTML lên Server
const saveChanges = async () => {
  if (!currentLesson.value) return;

  try {
    isLoading.value = true;

    // Gửi nguyên trạng mảng sections (cái có ID, cái không có ID)
    const payload = {
      title: currentLesson.value.title,
      content: currentLesson.value.content,
      sections: currentLesson.value.sections,
      hotspots: currentLesson.value.hotspots,
    };

    // Gọi API POST (như Phách muốn)
    const { data } = await api.post(
      `/courses/lessons/${currentLesson.value.id}/save-content`,
      payload,
    );

    // CẬP NHẬT LẠI LOCAL STATE
    // Bước này cực kỳ quan trọng để "biến" các mục null ID thành có ID thực
    currentLesson.value.sections = data.sections;

    alert("Hệ thống SkyLink: Đã đồng bộ toàn bộ dữ liệu thành công!");
  } catch (error) {
    console.error(error);
    alert("Lỗi: Không thể lưu dữ liệu.");
  } finally {
    isLoading.value = false;
  }
};

const addSection = () => {
  if (!currentLesson.value) return;

  // Khởi tạo mảng sections nếu chưa có
  if (!currentLesson.value.sections) {
    currentLesson.value.sections = [];
  }

  // Thêm một mục mới vào mảng
  currentLesson.value.sections.push({
    title: "Tiêu đề mục mới",
    content: "",
  });
};

const removeSection = (index) => {
  if (confirm("Xác nhận xóa mục này?")) {
    currentLesson.value.sections.splice(index, 1);
  }
};
/** --- 5. STRUCTURE & SIDEBAR --- **/
const handleAddChapter = async () => {
  const { data } = await api.post("/courses", {
    title: "Chương mới",
    order: courseStructure.value.length + 1,
  });
  courseStructure.value.push({ ...data, lessons: [] });
};
const handleAddLesson = async (chapterId) => {
  const chapter = courseStructure.value.find((c) => c.id === chapterId);
  const { data } = await api.post(`/courses/${chapterId}/lessons`, {
    title: "Bài giảng mới",
    order: chapter.lessons.length + 1,
  });
  chapter.lessons.push({ ...data, resources: [], hotspots: [], sections: [] });
  activeLessonId.value = data.id;
};
const handleRemoveItem = async ({ cIndex, lIndex }) => {
  if (!confirm("Xác nhận xóa?")) return;
  const chapter = courseStructure.value[cIndex];
  if (lIndex !== undefined) {
    await api.delete(`/courses/lessons/${chapter.lessons[lIndex].id}`);
    chapter.lessons.splice(lIndex, 1);
  } else {
    await api.delete(`/courses/${chapter.id}`);
    courseStructure.value.splice(cIndex, 1);
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col font-inter bg-[#f4f7f9]">
    <!-- <header
      class="bg-[#0b1f3f] text-white h-14 flex items-center justify-between px-6 shrink-0 z-20 shadow-md"
    >
      <div class="flex items-center gap-4">
        <span
          class="material-symbols-outlined cursor-pointer hover:bg-white/10 p-1 rounded"
          >menu</span
        >
        <h1 class="text-lg font-bold tracking-tight">
          SkyLink Admin
          <span class="font-light opacity-50">| UAV Content CMS</span>
        </h1>
      </div>
      <div class="flex items-center gap-4">
        <span class="material-symbols-outlined cursor-pointer"
          >account_circle</span
        >
        <span class="material-symbols-outlined cursor-pointer">settings</span>
      </div>
    </header> -->
    <!--  Qúa trình -->
    <!-- <nav
      class="bg-white border-b border-gray-200 px-6 py-3 flex items-center text-sm text-gray-500 shrink-0"
    >
      <button
        @click="toggleSidebar"
        class="mr-4 flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors"
      >
        <span
          class="material-symbols-outlined text-[#0b1f3f] transition-transform duration-300"
          :class="{ 'rotate-180': !isSidebarOpen }"
        >
          chevron_left
        </span>
      </button>
      <div class="flex items-center gap-2">
        <span>Bài học</span>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span>Khóa học UAV Nâng cao</span>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span
          class="text-[#0b1f3f] font-bold uppercase tracking-wider text-[11px]"
          >Trình biên tập</span
        >
      </div>
    </nav> -->

    <main class="flex flex-1 overflow-hidden relative">
      <section
        class="flex-1 overflow-y-auto bg-white m-6 rounded-3xl border border-gray-200 shadow-xl transition-all duration-300"
      >
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center h-full gap-4"
        >
          <RefreshCw class="w-10 h-10 animate-spin text-blue-500" />
          <p class="text-slate-400 font-medium animate-pulse">
            Đang tải dữ liệu Aero-X...
          </p>
        </div>
        <div v-else-if="currentLesson" class="mx-auto p-10">
          <header class="mb-8">
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-blue-50 rounded-lg">
                <Type class="w-4 h-4 text-blue-600" />
              </div>
              <span
                class="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]"
              >
                Thông tin bài giảng
              </span>
            </div>

            <div class="relative group">
              <input
                v-model="currentLesson.title"
                type="text"
                placeholder="Nhập tiêu đề chính của bài giảng..."
                class="w-full text-3xl font-black text-[#0b1f3f] border-none border-b-2 border-transparent focus:border-blue-500 focus:ring-0 p-0 pb-2 transition-all placeholder:text-slate-200"
              />
              <div
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-focus-within:w-full"
              ></div>
            </div>
          </header>

          <div class="space-y-12">
            <!-- <div class="space-y-4">
              <div class="flex items-center justify-between px-2">
                <h3
                  class="text-[11px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"
                >
                  <Layout class="w-3 h-3" /> Tiêu đề bài giảng
                </h3>
              </div>
              <input
                v-model="currentLesson.title"
                type="text"
                class="w-full text-3xl font-black text-[#0b1f3f] border-none border-b-2 border-transparent focus:border-blue-500 focus:ring-0 p-0 pb-2 transition-all"
              />
            </div> -->

            <div
              v-for="(section, index) in currentLesson.sections"
              :key="index"
              class="relative group"
            >
              <button
                @click="removeSection(index)"
                class="absolute -right-4 top-0 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                title="Xóa mục này"
              >
                <Trash2 class="w-4 h-4 bg-red-600" />
              </button>

              <div
                class="space-y-6 bg-slate-50/30 p-6 rounded-3xl border border-dashed border-slate-200"
              >
                <div class="space-y-2">
                  <div
                    class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    <span
                      class="w-5 h-5 bg-[#0b1f3f] text-white rounded flex items-center justify-center text-[8px]"
                      >{{ index + 1 }}</span
                    >
                    Tiêu đề mục
                  </div>
                  <input
                    v-model="section.title"
                    type="text"
                    placeholder="Ví dụ: 1.1 Khái niệm cơ bản..."
                    class="w-full bg-transparent text-lg font-bold text-[#0b1f3f] border-none focus:ring-0 p-0"
                  />
                </div>

                <div
                  class="quill-wrapper shadow-sm border border-white rounded-2xl overflow-hidden bg-white"
                >
                  <QuillEditor
                    v-model:content="section.content"
                    contentType="text"
                    theme="snow"
                    placeholder="Nhập nội dung cho mục này..."
                  />
                </div>
              </div>
            </div>

            <button
              @click="addSection"
              class="w-full py-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all group"
            >
              <div
                class="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform"
              >
                <Plus class="w-6 h-6" />
              </div>
              <span class="text-[11px] font-black uppercase tracking-[0.2em]"
                >Thêm mục nội dung mới</span
              >
            </button>
          </div>

          <div
            class="mt-12 flex items-center justify-between border-t border-slate-100 pt-8 pb-12"
          >
            <div class="flex items-center gap-4">
              <button
                @click="saveChanges"
                :disabled="isLoading"
                class="group relative flex items-center gap-3 bg-[#0b1f3f] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
              >
                <div v-if="isLoading" class="flex items-center gap-2">
                  <RefreshCw class="w-4 h-4 animate-spin text-teal-400" />
                  <span>Đang đồng bộ...</span>
                </div>
                <div v-else class="flex items-center gap-2">
                  <Save
                    class="w-4 h-4 text-teal-400 group-hover:rotate-12 transition-transform"
                  />
                  <span>Lưu & Xuất bản</span>
                </div>

                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
              </button>

              <button
                @click="router.back()"
                class="flex items-center gap-2 px-6 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <RotateCcw class="w-4 h-4" />
                Hủy thay đổi
              </button>
            </div>

            <div
              class="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest"
            >
              <div
                class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"
              ></div>
              Sẵn sàng lưu trữ
            </div>
          </div>
        </div>
      </section>
      <LessonStructure
        :structure="courseStructure"
        :active-lesson-id="activeLessonId"
        @select-lesson="selectLesson"
        @add-chapter="handleAddChapter"
        @add-lesson="handleAddLesson"
        @remove-item="handleRemoveItem"
        status="Nháp"
      ></LessonStructure>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap");

.font-inter {
  font-family: "Inter", sans-serif;
}

/* Tùy chỉnh thanh cuộn cho hi-tech */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
/* Ép kích thước cho vùng soạn thảo để không bị vỡ layout */
:deep(.ql-container) {
  min-height: 450px;

  font-size: 16px;
}
</style>
