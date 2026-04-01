<script setup>
import { ref, computed, watch, onMounted } from "vue";
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

// --- CẤU HÌNH & KHỞI TẠO ---
const STORAGE_KEY = "uav_content_manager_data";

// State chính: Ưu tiên lấy từ LocalStorage, nếu không có mới dùng file raw
const courseData = ref([]);
const lessonContentMap = ref({});
const activeLessonId = ref(101); // Theo dõi bài học đang chọn
const expandedSections = ref([0]);
const toasts = ref([]);

// --- LOGIC LƯU TRỮ (LOCALSTORAGE) ---
const loadData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    courseData.value = parsed.courseData;
    lessonContentMap.value = parsed.lessonContentMap;
  } else {
    courseData.value = rawData;
    lessonContentMap.value = rawMap;
  }
};

const saveData = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      courseData: courseData.value,
      lessonContentMap: lessonContentMap.value,
    }),
  );
};

// Tự động lưu mỗi khi có bất kỳ thay đổi nào trong dữ liệu
watch([courseData, lessonContentMap], () => saveData(), { deep: true });

onMounted(() => loadData());

// --- COMPUTED (DỮ LIỆU ĐANG EDIT) ---
// Form này sẽ luôn phản chiếu dữ liệu trong lessonContentMap theo activeLessonId
const currentLesson = computed({
  get: () => lessonContentMap.value[activeLessonId.value] || {},
  set: (val) => {
    lessonContentMap.value[activeLessonId.value] = val;
  },
});

const stats = computed(() => ({
  chapters: courseData.value.length,
  lessons: courseData.value.reduce((acc, cur) => acc + cur.lessons.length, 0),
}));

// --- HỆ THỐNG THÔNG BÁO ---
const addToast = (msg, type = "success") => {
  const id = Date.now();
  toasts.value.push({ id, msg, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 3000);
};

// --- QUẢN LÝ CHƯƠNG (CHAPTER) ---
const toggleSection = (idx) => {
  const pos = expandedSections.value.indexOf(idx);
  pos > -1
    ? expandedSections.value.splice(pos, 1)
    : expandedSections.value.push(idx);
};

const addNewChapter = () => {
  courseData.value.push({
    title: "Chương mới chưa đặt tên",
    lessons: [],
  });
  addToast("Đã khởi tạo chương mới!");
};

const deleteChapter = (idx) => {
  if (
    confirm("Bạn có chắc muốn xóa toàn bộ chương và các bài học bên trong?")
  ) {
    courseData.value.splice(idx, 1);
    addToast("Đã xóa chương!", "error");
  }
};

// --- QUẢN LÝ BÀI HỌC (LESSON) ---
const selectLesson = (id) => {
  activeLessonId.value = id;
};
const handlePublish = () => {
  // 1. Kiểm tra điều kiện (Ví dụ: phải có tiêu đề)
  if (!currentLesson.value.title) {
    return addToast("Tiêu đề không được để trống!", "error");
  }

  // 2. Đồng bộ tiêu đề từ Editor sang danh sách Sidebar (nếu chưa tự đồng bộ)
  const allLessons = courseData.value.flatMap((s) => s.lessons);
  const lessonInSidebar = allLessons.find((l) => l.id === activeLessonId.value);

  if (lessonInSidebar) {
    lessonInSidebar.title = currentLesson.value.title;
    lessonInSidebar.duration = currentLesson.value.duration;
  }

  // 3. Thực hiện lưu thủ công (Dù watch đã lưu, gọi lại lần nữa cho chắc)
  saveData();

  // 4. Thông báo cho người dùng
  addToast("Dữ liệu đã được lưu vào trình duyệt!");
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
  addToast("Đã thêm bài giảng mới!");
};

const deleteLesson = (sIdx, lIdx, id) => {
  if (confirm("Xóa bài giảng này?")) {
    courseData.value[sIdx].lessons.splice(lIdx, 1);
    delete lessonContentMap.value[id];
    addToast("Đã xóa bài giảng!", "error");
  }
};

const handlePublish = () => {
  // Đồng bộ tiêu đề từ Editor sang Sidebar trước khi báo thành công
  const lessonInSidebar = courseData.value
    .flatMap((s) => s.lessons)
    .find((l) => l.id === activeLessonId.value);

  if (lessonInSidebar) {
    lessonInSidebar.title = currentLesson.value.title;
    lessonInSidebar.duration = currentLesson.value.duration;
  }

  addToast("Hệ thống đã được cập nhật thành công!");
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
          <LayoutDashboard class="w-5 h-5 text-teal-600" /> QUẢN LÝ NỘI DUNG UAV
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
        class="w-[360px] border-r border-slate-200 bg-white flex flex-col overflow-hidden shadow-sm"
      >
        <div class="p-8 border-b border-slate-100 bg-slate-50/50">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3
                class="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 mb-1"
              >
                Hệ thống nội dung
              </h3>
              <p
                class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter"
              >
                {{ stats.chapters }} Chương • {{ stats.lessons }} Bài giảng
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center"
            >
              <LayoutDashboard class="w-5 h-5 text-teal-600" />
            </div>
          </div>
          <button
            @click="addNewChapter"
            class="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
          >
            <Plus class="w-4 h-4" /> Khởi tạo chương mới
          </button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div
            v-for="(section, sIdx) in courseData"
            :key="sIdx"
            class="group/section relative rounded-[2.5rem] border border-slate-100 bg-white shadow-sm"
            :class="
              expandedSections.includes(sIdx) ? 'ring-2 ring-teal-500/5' : ''
            "
          >
            <button
              @click.stop="deleteChapter(sIdx)"
              class="absolute -right-2 -top-2 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 opacity-0 group-hover/section:opacity-100 transition-all z-20 border border-slate-50"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>

            <div
              @click="toggleSection(sIdx)"
              class="p-6 flex items-center justify-between cursor-pointer"
              :class="
                expandedSections.includes(sIdx)
                  ? 'bg-slate-50/80 rounded-t-[2.5rem]'
                  : 'rounded-[2.5rem]'
              "
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg font-black text-xs italic"
                >
                  {{ sIdx + 1 < 10 ? "0" + (sIdx + 1) : sIdx + 1 }}
                </div>
                <div class="flex flex-col">
                  <input
                    v-model="section.title"
                    @click.stop
                    class="bg-transparent text-[11px] font-black uppercase text-slate-800 outline-none w-44"
                    placeholder="Tên chương..."
                  />
                  <span
                    class="text-[9px] font-bold text-slate-400 uppercase mt-0.5"
                    >{{ section.lessons.length }} Bài giảng</span
                  >
                </div>
              </div>
              <ChevronDown
                :class="[
                  'w-4 h-4 text-slate-400 transition-transform duration-500',
                  expandedSections.includes(sIdx)
                    ? 'rotate-180 text-teal-600'
                    : '',
                ]"
              />
            </div>

            <div
              v-show="expandedSections.includes(sIdx)"
              class="px-4 pb-6 pt-2 space-y-2 bg-slate-50/50 rounded-b-[2.5rem]"
            >
              <div
                v-for="(lesson, lIdx) in section.lessons"
                :key="lesson.id"
                @click="selectLesson(lesson.id)"
                :class="[
                  'group/item p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-all relative overflow-hidden',
                  activeLessonId === lesson.id
                    ? 'bg-white shadow-md scale-[1.02] ring-1 ring-teal-500/10'
                    : 'hover:bg-white/60',
                ]"
              >
                <div
                  v-if="activeLessonId === lesson.id"
                  class="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"
                ></div>
                <div class="flex items-center gap-4 overflow-hidden">
                  <div
                    class="w-8 h-8 rounded-xl flex items-center justify-center"
                    :class="
                      activeLessonId === lesson.id
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    "
                  >
                    <Play class="w-3 h-3 fill-current" />
                  </div>
                  <span class="text-[11px] font-bold text-slate-600 truncate">{{
                    lesson.title
                  }}</span>
                </div>
                <button
                  @click.stop="deleteLesson(sIdx, lIdx, lesson.id)"
                  class="hidden group-hover/item:flex text-red-400 hover:text-red-600"
                >
                  <XCircle class="w-4 h-4" />
                </button>
              </div>
              <button
                @click="addNewLesson(sIdx)"
                class="w-full py-3 mt-4 text-[9px] font-black text-teal-600 uppercase hover:bg-teal-100/50 rounded-xl border border-dashed border-teal-200/50"
              >
                + Soạn thảo bài mới
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main
        class="flex-1 bg-[#FBFBFB] p-8 overflow-y-auto custom-scrollbar flex justify-center"
      >
        <div class="w-full max-w-6xl grid grid-cols-12 gap-8 animate-fade-in">
          <div class="col-span-12 lg:col-span-8 space-y-8">
            <div
              class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100"
            >
              <div class="flex items-center gap-2 mb-6">
                <div class="h-[1px] w-8 bg-teal-500"></div>
                <span
                  class="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600"
                  >Bài giảng ID: {{ activeLessonId }}</span
                >
              </div>
              <textarea
                v-model="currentLesson.title"
                placeholder="Tên bài giảng..."
                class="w-full bg-transparent text-3xl font-black text-slate-900 outline-none tracking-tighter uppercase leading-tight resize-none placeholder:text-slate-100 min-h-[80px]"
              ></textarea>
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
          </div>

          <div class="col-span-12 lg:col-span-4 space-y-6">
            <div class="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl">
              <h3
                class="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-4"
              >
                Cấu hình nhanh
              </h3>
              <div class="space-y-4">
                <div
                  class="flex justify-between items-center border-b border-white/10 pb-3"
                >
                  <span class="text-[10px] font-bold text-slate-400 uppercase"
                    >Thời lượng</span
                  >
                  <div class="flex items-center gap-2">
                    <input
                      v-model="currentLesson.duration"
                      class="bg-transparent text-right font-black w-12 outline-none text-teal-400"
                    />
                    <span class="text-[10px] text-slate-500">phút</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm"
            >
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-[10px] font-black uppercase tracking-widest text-slate-800"
                >
                  Mô hình minh họa
                </h3>
                <Box class="w-4 h-4 text-teal-500" />
              </div>
              <div
                class="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:border-teal-400 transition-all cursor-pointer"
              >
                <UploadCloud
                  class="w-8 h-8 text-slate-300 group-hover:text-teal-500 transition-colors"
                />
                <p class="text-[9px] font-black text-slate-400 uppercase mt-2">
                  Upload .GLB
                </p>
              </div>
            </div>

            <div
              class="bg-teal-50/50 rounded-[2rem] p-6 border border-teal-100"
            >
              <div class="flex items-center gap-2 mb-2">
                <Zap class="w-4 h-4 text-teal-600" />
                <span class="text-[10px] font-black text-teal-800 uppercase"
                  >Mẹo nhỏ</span
                >
              </div>
              <button
                @click="handlePublish"
                class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
              >
                Lưu dữ liệu
              </button>
              <p
                class="text-[11px] text-teal-700/70 leading-relaxed font-medium"
              >
                Sử dụng Auto-save: Mọi thay đổi của bạn sẽ được lưu tự động vào
                trình duyệt.
              </p>
            </div>
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
  transform: translateX(50px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Quill Customization */
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
  min-height: 600px;
  padding: 4rem;
  line-height: 1.8;
  font-family: "Inter", sans-serif;
  font-size: 17px;
}
</style>
