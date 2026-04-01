<script setup>
import { ref, computed, onMounted } from "vue";
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
import {
  courseData as rawData,
  lessonContentMap as rawMap,
} from "@/data/uavCourseData";

// --- 1. STATE & STORAGE CONFIG ---
const STORAGE_KEY = "uav_content_manager_v2";

const courseData = ref([]); // Danh sách chương & bài (Sidebar)
const lessonContentMap = ref({}); // Nội dung chi tiết bài giảng (Editor)
const activeLessonId = ref(null); // ID bài giảng đang chọn
const expandedSections = ref([0]);
const toasts = ref([]);

// --- 2. INITIALIZE (LOAD DATA) ---
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    courseData.value = parsed.courseData;
    lessonContentMap.value = parsed.lessonContentMap;
  } else {
    // Clone dữ liệu gốc để tránh tham chiếu trực tiếp
    courseData.value = JSON.parse(JSON.stringify(rawData));
    lessonContentMap.value = JSON.parse(JSON.stringify(rawMap));
  }
  // Mặc định chọn bài đầu tiên nếu có
  if (courseData.value[0]?.lessons[0]) {
    activeLessonId.value = courseData.value[0].lessons[0].id;
  }
});

// --- 3. COMPUTED (TRỪU TƯỢNG HÓA DỮ LIỆU ĐANG EDIT) ---
const currentLesson = computed(() => {
  // Trỏ thẳng vào Object bài học trong Map để edit trực tiếp
  return (
    lessonContentMap.value[activeLessonId.value] || {
      title: "",
      content: "",
      duration: "0",
    }
  );
});

const stats = computed(() => ({
  chapters: courseData.value.length,
  lessons: courseData.value.reduce((acc, cur) => acc + cur.lessons.length, 0),
}));

// --- 4. ACTIONS (LOGIC XỬ LÝ) ---

// HÀM QUAN TRỌNG NHẤT: LƯU DỮ LIỆU THỦ CÔNG
const handlePublish = () => {
  if (!currentLesson.value.title)
    return addToast("Tiêu đề không được để trống!", "error");

  // A. Đồng bộ Title & Duration từ Editor ngược lại danh sách Sidebar
  courseData.value.forEach((section) => {
    const lesson = section.lessons.find((l) => l.id === activeLessonId.value);
    if (lesson) {
      lesson.title = currentLesson.value.title;
      lesson.duration = currentLesson.value.duration;
    }
  });

  // B. Ghi vào LocalStorage
  const payload = {
    courseData: courseData.value,
    lessonContentMap: lessonContentMap.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

  addToast("Hệ thống đã được cập nhật thành công!");
};

const addToast = (msg, type = "success") => {
  const id = Date.now();
  toasts.value.push({ id, msg, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 3000);
};

// --- LOGIC SIDEBAR ---
const toggleSection = (idx) => {
  const pos = expandedSections.value.indexOf(idx);
  pos > -1
    ? expandedSections.value.splice(pos, 1)
    : expandedSections.value.push(idx);
};

const addNewChapter = () => {
  courseData.value.push({ title: "Chương mới", lessons: [] });
  addToast("Đã thêm chương mới!");
};

const addNewLesson = (sIdx) => {
  const newId = Date.now();
  const newLesson = {
    id: newId,
    title: "Bài học mới",
    duration: "20",
    content: "",
  };

  courseData.value[sIdx].lessons.push({
    id: newId,
    title: newLesson.title,
    duration: newLesson.duration,
  });
  lessonContentMap.value[newId] = newLesson;
  activeLessonId.value = newId;
  addToast("Đã tạo bài mới!");
};

const deleteLesson = (sIdx, lIdx, id) => {
  if (confirm("Xóa bài giảng này?")) {
    courseData.value[sIdx].lessons.splice(lIdx, 1);
    delete lessonContentMap.value[id];
    addToast("Đã xóa bài!", "error");
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative"
  >
    <TransitionGroup
      tag="div"
      name="list"
      class="fixed top-5 right-5 z-[100] space-y-3 pointer-events-none"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] border border-white/20"
        :class="
          toast.type === 'success'
            ? 'bg-teal-600 text-white'
            : 'bg-red-500 text-white'
        "
      >
        <CheckCircle2 v-if="toast.type === 'success'" class="w-5 h-5" />
        <AlertCircle v-else class="w-5 h-5" />
        <span class="text-xs font-black uppercase tracking-tight">{{
          toast.msg
        }}</span>
      </div>
    </TransitionGroup>

    <header
      class="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-50"
    >
      <div class="flex items-center gap-4">
        <button
          @click="$router?.back()"
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
        class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl active:scale-95"
      >
        CẬP NHẬT HỆ THỐNG
      </button>
    </header>

    <div class="flex-1 overflow-hidden flex">
      <aside
        class="w-[360px] border-r border-slate-200 bg-white flex flex-col overflow-hidden"
      >
        <div class="p-8 border-b border-slate-100 bg-slate-50/50">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3
                class="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 mb-1"
              >
                Cấu trúc nội dung
              </h3>
              <p class="text-[10px] font-bold text-slate-400 uppercase">
                {{ stats.chapters }} Chương • {{ stats.lessons }} Bài
              </p>
            </div>
          </div>
          <button
            @click="addNewChapter"
            class="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
          >
            <Plus class="w-4 h-4" /> Thêm chương mới
          </button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          <div
            v-for="(section, sIdx) in courseData"
            :key="sIdx"
            class="rounded-[2rem] border border-slate-100 bg-white overflow-hidden"
          >
            <div
              @click="toggleSection(sIdx)"
              class="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black italic"
                >
                  {{ sIdx + 1 }}
                </div>
                <input
                  v-model="section.title"
                  @click.stop
                  class="bg-transparent text-[11px] font-black uppercase text-slate-800 outline-none w-40"
                />
              </div>
              <ChevronDown
                :class="[
                  'w-4 h-4 transition-transform',
                  expandedSections.includes(sIdx) ? 'rotate-180' : '',
                ]"
              />
            </div>

            <div
              v-show="expandedSections.includes(sIdx)"
              class="px-3 pb-4 space-y-1 bg-slate-50/50"
            >
              <div
                v-for="(lesson, lIdx) in section.lessons"
                :key="lesson.id"
                @click="activeLessonId = lesson.id"
                :class="[
                  'p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all',
                  activeLessonId === lesson.id
                    ? 'bg-white shadow-sm ring-1 ring-teal-500/10'
                    : 'hover:bg-white/40',
                ]"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <Play
                    :class="[
                      'w-3 h-3',
                      activeLessonId === lesson.id
                        ? 'text-teal-500 fill-current'
                        : 'text-slate-300',
                    ]"
                  />
                  <span class="text-[11px] font-bold text-slate-600 truncate">{{
                    lesson.title
                  }}</span>
                </div>
                <button
                  @click.stop="deleteLesson(sIdx, lIdx, lesson.id)"
                  class="text-slate-300 hover:text-red-500 transition-colors"
                >
                  <XCircle class="w-4 h-4" />
                </button>
              </div>
              <button
                @click="addNewLesson(sIdx)"
                class="w-full py-2 mt-2 text-[9px] font-black text-teal-600 uppercase border border-dashed border-teal-200 rounded-lg hover:bg-teal-50 transition-all"
              >
                + Thêm bài giảng
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 bg-[#FBFBFB] p-8 overflow-y-auto custom-scrollbar">
        <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div
            class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100"
          >
            <div class="flex items-center gap-2 mb-6">
              <div class="h-[1px] w-8 bg-teal-500"></div>
              <span
                class="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600"
                >Đang chỉnh sửa bài ID: {{ activeLessonId }}</span
              >
            </div>
            <textarea
              v-model="currentLesson.title"
              placeholder="Tên bài giảng..."
              class="w-full bg-transparent text-3xl font-black text-slate-900 outline-none tracking-tighter uppercase leading-tight resize-none"
            ></textarea>

            <div
              class="mt-6 flex items-center gap-6 border-t border-slate-50 pt-6"
            >
              <div class="flex flex-col gap-1">
                <span class="text-[9px] font-black text-slate-400 uppercase"
                  >Thời lượng (phút)</span
                >
                <input
                  v-model="currentLesson.duration"
                  type="number"
                  class="bg-slate-50 px-4 py-2 rounded-lg font-black text-teal-600 outline-none w-24"
                />
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50"
          >
            <QuillEditor
              v-model:content="currentLesson.content"
              contentType="html"
              theme="snow"
              class="min-h-[600px] border-none"
            />
          </div>

          <div
            class="bg-slate-900 rounded-[2rem] p-8 text-white flex items-center justify-between"
          >
            <div>
              <h4 class="text-xs font-black uppercase text-teal-400 mb-2">
                Lưu ý bảo mật dữ liệu
              </h4>
              <p class="text-[11px] text-slate-400">
                Dữ liệu chỉ được lưu vào trình duyệt sau khi bạn nhấn nút "CẬP
                NHẬT HỆ THỐNG".
              </p>
            </div>
            <Zap class="w-8 h-8 text-teal-500 opacity-50" />
          </div>
        </div>
      </main>
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
