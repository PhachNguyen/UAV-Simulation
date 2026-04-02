<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  LayoutDashboard,
  ChevronDown,
  Trash2,
  XCircle,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  Box,
  UploadCloud,
  Zap,
} from "lucide-vue-next";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import api from "@/utils/apis/axios";

// --- STATE ---
const chapters = ref([]);
const activeLessonId = ref(null);
const expandedSections = ref([0]);
const toasts = ref([]);
const isLoading = ref(false);

// --- 2. API ACTIONS ---
const fetchCourseData = async () => {
  try {
    const { data } = await api.get("/courses");
    chapters.value = data;
    if (chapters.value[0]?.lessons[0] && !activeLessonId.value) {
      activeLessonId.value = chapters.value[0].lessons[0]._id;
    }
  } catch (error) {
    addToast("Không thể tải dữ liệu", "error");
  }
};

const addNewChapter = async () => {
  try {
    const { data } = await api.post("/courses", {
      title: "Chương mới",
      order: chapters.value.length + 1,
    });
    chapters.value.push({ ...data, lessons: [] });
    addToast("Đã thêm chương mới!");
  } catch (error) {
    addToast("Lỗi tạo chương", "error");
  }
};

const addNewLesson = async (chapterId, cIdx) => {
  try {
    const { data } = await api.post(`/courses/${chapterId}/lessons`, {
      title: "Bài học mới",
      order: chapters.value[cIdx].lessons.length + 1,
    });
    chapters.value[cIdx].lessons.push(data);
    activeLessonId.value = data._id;
    addToast("Đã thêm bài giảng!");
  } catch (error) {
    addToast("Lỗi tạo bài giảng", "error");
  }
};

const deleteLesson = async (chapterId, lessonId, cIdx, lIdx) => {
  if (!confirm("Xóa bài giảng này?")) return;
  try {
    // Phach cần viết thêm route delete này ở BE nhé
    await api.delete(`/courses/lessons/${lessonId}`);
    chapters.value[cIdx].lessons.splice(lIdx, 1);
    addToast("Đã xóa bài giảng", "error");
  } catch (error) {
    addToast("Không thể xóa", "error");
  }
};

const handlePublish = async () => {
  if (!currentLesson.value?._id)
    return addToast("Chọn bài giảng để lưu", "error");
  try {
    isLoading.value = true;
    // Đồng bộ toàn bộ bài giảng hiện tại (title, description, duration...)
    await api.put(
      `/courses/lessons/${activeLessonId.value}`,
      currentLesson.value,
    );
    addToast("Đã cập nhật hệ thống!");
    await fetchCourseData();
  } catch (error) {
    addToast("Lỗi đồng bộ", "error");
  } finally {
    isLoading.value = false;
  }
};

// --- COMPUTED ---
const currentLesson = computed(() => {
  for (let c of chapters.value) {
    let l = c.lessons.find((lesson) => lesson._id === activeLessonId.value);
    if (l) return l;
  }
  return null;
});

const stats = computed(() => ({
  chapters: chapters.value.length,
  lessons: chapters.value.reduce(
    (acc, cur) => acc + (cur.lessons?.length || 0),
    0,
  ),
}));

// --- UTILS ---
const toggleSection = (idx) => {
  const pos = expandedSections.value.indexOf(idx);
  pos > -1
    ? expandedSections.value.splice(pos, 1)
    : expandedSections.value.push(idx);
};

const addToast = (msg, type = "success") => {
  const id = Date.now();
  toasts.value.push({ id, msg, type });
  setTimeout(
    () => (toasts.value = toasts.value.filter((t) => t.id !== id)),
    3000,
  );
};

onMounted(fetchCourseData);
</script>
<template>
  <div
    class="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative"
  >
    <header
      class="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-50"
    >
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft class="w-5 h-5 text-slate-500" />
        </button>
        <h1
          class="text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-slate-800"
        >
          <LayoutDashboard class="w-5 h-5 text-teal-600" /> UAV CONTENT CMS
        </h1>
      </div>
      <button
        @click="handlePublish"
        :disabled="isLoading"
        class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl disabled:opacity-50"
      >
        {{ isLoading ? "ĐANG LƯU..." : "CẬP NHẬT HỆ THỐNG" }}
      </button>
    </header>

    <div class="flex-1 overflow-hidden flex">
      <aside
        class="w-[360px] border-r border-slate-200 bg-white flex flex-col overflow-hidden"
      >
        <div class="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3
            class="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 mb-1"
          >
            Cấu trúc nội dung
          </h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase">
            {{ stats.chapters }} Chương • {{ stats.lessons }} Bài
          </p>
          <button
            @click="addNewChapter"
            class="w-full mt-4 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
          >
            <Plus class="w-4 h-4" /> Thêm chương mới
          </button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          <div
            v-for="(chapter, cIdx) in chapters"
            :key="chapter._id"
            class="rounded-[2rem] border border-slate-100 bg-white overflow-hidden"
          >
            <div
              @click="toggleSection(cIdx)"
              class="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black"
                >
                  {{ cIdx + 1 }}
                </div>
                <span class="text-[11px] font-black uppercase text-slate-800">{{
                  chapter.title
                }}</span>
              </div>
              <ChevronDown
                :class="{ 'rotate-180': expandedSections.includes(cIdx) }"
                class="w-4 h-4 transition-transform"
              />
            </div>

            <div
              v-show="expandedSections.includes(cIdx)"
              class="px-3 pb-4 space-y-1 bg-slate-50/50"
            >
              <div
                v-for="(lesson, lIdx) in chapter.lessons"
                :key="lesson._id"
                @click="activeLessonId = lesson._id"
                :class="
                  activeLessonId === lesson._id
                    ? 'bg-white shadow-sm ring-1 ring-teal-500/10'
                    : 'hover:bg-white/40'
                "
                class="p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <Play
                    :class="
                      activeLessonId === lesson._id
                        ? 'text-teal-500 fill-current'
                        : 'text-slate-300'
                    "
                    class="w-3 h-3"
                  />
                  <span class="text-[11px] font-bold text-slate-600 truncate">{{
                    lesson.title
                  }}</span>
                </div>
                <button
                  @click.stop="
                    deleteLesson(chapter._id, lesson._id, cIdx, lIdx)
                  "
                  class="text-slate-300 hover:text-red-500"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                @click="addNewLesson(chapter._id, cIdx)"
                class="w-full py-2 mt-2 text-[9px] font-black text-teal-600 uppercase border border-dashed border-teal-200 rounded-lg"
              >
                + Thêm bài giảng
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main
        v-if="currentLesson"
        class="flex-1 bg-[#FBFBFB] p-8 overflow-y-auto custom-scrollbar"
      >
        <div class="max-w-4xl mx-auto space-y-8">
          <section
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6"
          >
            <h2 class="text-xl font-bold flex items-center gap-2">
              <Box class="text-teal-600" /> 1. Thông tin cơ bản
            </h2>
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-2">
                <label class="text-[10px] font-bold text-slate-400 uppercase"
                  >Tiêu đề bài giảng</label
                >
                <input
                  v-model="currentLesson.title"
                  type="text"
                  class="w-full mt-2 bg-gray-50 border-none rounded-xl py-4 px-5 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label class="text-[10px] font-bold text-slate-400 uppercase"
                  >Thời lượng (phút)</label
                >
                <input
                  v-model="currentLesson.duration"
                  type="number"
                  class="w-full mt-2 bg-gray-50 border-none rounded-xl py-4 px-5 outline-none"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <div
        v-else
        class="flex-1 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest"
      >
        Vui lòng chọn hoặc tạo bài giảng mới
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Quill Editor UI Fix */
:deep(.ql-toolbar.ql-snow) {
  border: none !important;
  background: #f8fafc;
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9 !important;
}
:deep(.ql-container.ql-snow) {
  border: none !important;
}
:deep(.ql-editor) {
  min-height: 500px;
  padding: 3rem;
  line-height: 1.8;
  font-family: "Inter", sans-serif;
  font-size: 16px;
}
</style>
