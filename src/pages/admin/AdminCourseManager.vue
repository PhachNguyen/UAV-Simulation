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

// const addNewLesson = (sIdx) => {
//   const newId = Date.now();
//   const newLesson = {
//     id: newId,
//     title: "Bài học mới",
//     duration: "20",
//     content: "",
//   };

//   courseData.value[sIdx].lessons.push({
//     id: newId,
//     title: newLesson.title,
//     duration: newLesson.duration,
//   });
//   lessonContentMap.value[newId] = newLesson;
//   activeLessonId.value = newId;
//   addToast("Đã tạo bài mới!");
// };
// Trong phần khởi tạo newLesson, thay đổi cấu trúc content
const addNewLesson = (sIdx) => {
  const newId = Date.now();
  const newLesson = {
    id: newId,
    title: "Bài học mới",
    duration: "20",
    // Chuyển content thành mảng các object
    theorySections: [
      { id: Date.now(), type: "text", value: "Nội dung khởi tạo..." },
    ],
  };

  courseData.value[sIdx].lessons.push({
    id: newId,
    title: newLesson.title,
    duration: newLesson.duration,
  });
  lessonContentMap.value[newId] = newLesson;
  activeLessonId.value = newId;
};

// Hàm thêm một mục lý thuyết mới vào bài giảng hiện tại
const addTheorySection = (type) => {
  if (!currentLesson.value.theorySections) {
    currentLesson.value.theorySections = [];
  }

  const newSection = {
    id: Date.now(),
    type: type, // 'text' hoặc 'image'
    value: type === "text" ? "" : { url: "", caption: "" },
  };

  currentLesson.value.theorySections.push(newSection);
};

// Hàm xóa một mục lý thuyết
const removeTheorySection = (index) => {
  currentLesson.value.theorySections.splice(index, 1);
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
        <div class="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
          <div
            class="mb-6 flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wide"
          >
            <span>BÀI GIẢNG</span>
            <span class="text-xs">›</span>
            <span class="font-medium text-gray-400">TRÌNH BIÊN SOẠN</span>
          </div>

          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Soạn thảo bài giảng chi tiết
            </h1>
            <p class="text-gray-500 max-w-2xl">
              Xây dựng trải nghiệm học tập UAV chuyên sâu với các module tương
              tác 3D và sơ đồ mạch điện tử thực tế.
            </p>
          </div>

          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-emerald-100 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-800">
                1. Thông tin cơ bản
              </h2>
            </div>

            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="md:col-span-2">
                  <label
                    class="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1"
                    >Tiêu đề bài giảng</label
                  >
                  <input
                    type="text"
                    placeholder="Ví dụ: Nguyên lý hoạt động của Motor không chổi than"
                    class="w-full bg-gray-50 border-none rounded-xl py-4 px-5 text-gray-700 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label
                    class="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1"
                    >Thời lượng (phút)</label
                  >
                  <input
                    type="number"
                    placeholder="45"
                    class="w-full bg-gray-50 border-none rounded-xl py-4 px-5 text-gray-700 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label
                    class="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1"
                    >Độ khó</label
                  >
                  <div class="relative">
                    <select
                      class="w-full bg-gray-50 border-none rounded-xl py-4 px-5 text-gray-700 appearance-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none cursor-pointer"
                    >
                      <option>Trung cấp</option>
                      <option>Sơ cấp</option>
                      <option>Cao cấp</option>
                    </select>
                    <div
                      class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label
                    class="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1"
                    >Mô tả tóm tắt</label
                  >
                  <textarea
                    rows="4"
                    placeholder="Nhập tóm tắt ngắn gọn cho bài giảng..."
                    class="w-full bg-gray-50 border-none rounded-xl py-4 px-5 text-gray-700 focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-12 pb-20">
          <section>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-800">
                  2. Nội dung lý thuyết
                </h2>
              </div>
              <button
                @click="addTheorySection('text')"
                class="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 transition-all"
              >
                <Plus class="w-3 h-3" /> THÊM Chương
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(section, index) in currentLesson.theorySections"
                :key="section.id"
                class="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:border-emerald-200"
              >
                <div class="flex gap-2">
                  <button
                    @click="addTheorySection('image')"
                    class="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    <Plus class="w-3 h-3" /> THÊM HÌNH ẢNH
                  </button>
                  <button
                    @click="addTheorySection('image')"
                    class="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    <Plus class="w-3 h-3" /> THÊM Video
                  </button>
                </div>
                <button
                  @click="removeTheorySection(index)"
                  class="absolute -right-2 -top-2 w-8 h-8 bg-white border border-red-100 rounded-full flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50"
                >
                  <XCircle class="w-4 h-4" />
                </button>

                <div v-if="section.type === 'text'">
                  <div
                    class="mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"
                  >
                    <Zap class="w-3 h-3 text-amber-400" /> Khối văn bản #{{
                      index + 1
                    }}
                  </div>
                  <QuillEditor
                    v-model:content="section.value"
                    contentType="html"
                    theme="snow"
                    placeholder="Nhập nội dung kiến thức..."
                  />
                </div>

                <div v-else-if="section.type === 'image'">
                  <div
                    class="mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"
                  >
                    <UploadCloud class="w-3 h-3 text-blue-400" /> Khối hình ảnh
                    #{{ index + 1 }}
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label
                      class="aspect-video border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-all"
                    >
                      <UploadCloud class="w-8 h-8 mb-2" />
                      <span class="text-[10px] font-bold"
                        >CLICK ĐỂ TẢI ẢNH MINH HỌA</span
                      >
                      <input type="file" class="hidden" />
                    </label>
                    <div class="space-y-4">
                      <input
                        v-model="section.value.caption"
                        type="text"
                        placeholder="Nhập chú thích ảnh..."
                        class="w-full bg-slate-50 border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <textarea
                        placeholder="Mô tả chi tiết ảnh (Alt text)..."
                        class="w-full bg-slate-50 border-none rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="!currentLesson.theorySections?.length"
                class="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-100"
              >
                <p class="text-slate-400 text-sm font-medium">
                  Chưa có nội dung lý thuyết nào. Hãy thêm mục đầu tiên.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                  />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-800">
                3. Cấu hình mô hình 3D
              </h2>
            </div>

            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div class="flex flex-col md:flex-row">
                <div class="flex-[2] p-6 border-r border-gray-50">
                  <div
                    class="relative bg-slate-900 rounded-2xl aspect-[16/9] flex items-center justify-center overflow-hidden group"
                  >
                    <div
                      class="absolute top-4 left-4 bg-emerald-500/20 text-emerald-400 text-[10px] px-3 py-1 rounded-full border border-emerald-500/30"
                    >
                      MÔ HÌNH: UAV_CARBON_FRAME_V2.GLB
                    </div>

                    <div class="text-center">
                      <div class="text-emerald-500 mb-2 flex justify-center">
                        <svg
                          class="h-12 w-12 animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.43c-.31.17-.69.17-1 0L3.53 17.38c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.43c.31-.17.69-.17 1 0l7.97 4.43c.32.17.53.5.53.88v9z"
                          />
                        </svg>
                      </div>
                      <p class="text-white font-bold tracking-widest text-sm">
                        3D PREVIEW ACTIVE
                      </p>
                    </div>

                    <div class="absolute bottom-4 right-4 flex gap-2">
                      <button
                        class="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                      <button
                        class="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4 mt-6">
                    <button
                      class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-bold text-gray-700 transition-all text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Thay đổi file mô hình
                    </button>
                    <button
                      class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-bold text-gray-700 transition-all text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                      </svg>
                      Đặt camera mặc định
                    </button>
                  </div>
                </div>

                <div class="flex-1 bg-gray-50/50 p-6">
                  <div class="flex items-center justify-between mb-6">
                    <h3
                      class="text-xs font-black text-gray-400 uppercase tracking-widest"
                    >
                      Danh sách chú thích
                    </h3>
                    <button
                      class="text-emerald-600 hover:scale-110 transition-transform"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="space-y-3">
                    <div
                      v-for="(item, index) in annotations"
                      :key="index"
                      class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3"
                    >
                      <span
                        class="bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full mt-0.5 shrink-0"
                        >{{ index + 1 }}</span
                      >
                      <div>
                        <h4 class="text-sm font-bold text-gray-800">
                          {{ item.title }}
                        </h4>
                        <p class="text-xs text-gray-500 leading-tight">
                          {{ item.desc }}
                        </p>
                      </div>
                    </div>

                    <div
                      class="border-2 border-dashed border-gray-200 rounded-xl py-4 text-center"
                    >
                      <span
                        class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter"
                        >Kéo thả để sắp xếp</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
