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
        class="pointer-events-auto px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] border border-white/20 animate-slide-in"
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
          @click="$router.back()"
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

      <div class="flex gap-4">
        <button
          @click="handlePublish"
          class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl active:scale-95"
        >
          CẬP NHẬT HỆ THỐNG
        </button>
      </div>
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
                {{ courseData.length }} Chương •
                {{
                  courseData.reduce((acc, cur) => acc + cur.lessons.length, 0)
                }}
                Bài giảng
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
            class="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/30 transition-all group flex items-center justify-center gap-2"
          >
            <Plus class="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>Khởi tạo chương mới</span>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div
            v-for="(section, sIdx) in courseData"
            :key="sIdx"
            style="margin-bottom: 12px"
            class="group/section relative rounded-[2.5rem] border border-slate-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
            :class="
              expandedSections.includes(sIdx)
                ? 'ring-2 ring-teal-500/5 border-teal-100'
                : ''
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
              class="p-6 flex items-center justify-between cursor-pointer transition-colors"
              :class="
                expandedSections.includes(sIdx)
                  ? 'bg-slate-50/80 rounded-t-[2.5rem]'
                  : 'rounded-[2.5rem]'
              "
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs italic"
                >
                  {{ sIdx + 1 < 10 ? "0" + (sIdx + 1) : sIdx + 1 }}
                </div>
                <div class="flex flex-col">
                  <input
                    v-model="section.title"
                    @click.stop
                    class="bg-transparent text-[11px] font-black uppercase tracking-tight text-slate-800 outline-none focus:text-teal-600 w-44"
                    placeholder="Tên chương..."
                  />
                  <span
                    class="text-[9px] font-bold text-slate-400 uppercase mt-0.5"
                  >
                    {{ section.lessons.length }} Bài giảng
                  </span>
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
                @click="loadLesson(lesson.id, sIdx)"
                :class="[
                  'group/item p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-all relative overflow-hidden',
                  form.id === lesson.id
                    ? 'bg-white shadow-md scale-[1.02] ring-1 ring-teal-500/10'
                    : 'hover:bg-white/60',
                ]"
              >
                <div
                  v-if="form.id === lesson.id"
                  class="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"
                ></div>

                <div class="flex items-center gap-4 overflow-hidden">
                  <div
                    class="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                    :class="
                      form.id === lesson.id
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-100 text-slate-400 group-hover/item:bg-white'
                    "
                  >
                    <Play class="w-3 h-3 fill-current" />
                  </div>
                  <span
                    class="text-[11px] font-bold text-slate-600 truncate group-hover/item:text-slate-900"
                  >
                    {{ lesson.title }}
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <span
                    class="text-[9px] font-black text-slate-300 uppercase group-hover/item:hidden"
                  >
                    {{ lesson.duration }}m
                  </span>
                  <button
                    @click.stop="deleteLesson(sIdx, lIdx, lesson.id)"
                    class="hidden group-hover/item:flex w-6 h-6 items-center justify-center text-red-400 hover:text-red-600 transition-all"
                  >
                    <XCircle class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                @click="addNewLesson(sIdx)"
                class="w-full py-3 mt-4 text-[9px] font-black text-teal-600 uppercase hover:bg-teal-100/50 rounded-xl border border-dashed border-teal-200/50 transition-all"
              >
                + Soạn thảo bài mới
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main
        class="flex-1 bg-[#F9FBFC] p-10 overflow-y-auto custom-scrollbar flex justify-center"
      >
        <div class="w-full max-w-5xl space-y-12">
          <div
            class="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between"
          >
            <div class="flex items-center gap-6">
              <div class="relative group">
                <div
                  class="w-16 h-16 rounded-[2rem] bg-slate-900 flex flex-col items-center justify-center text-white"
                >
                  <span
                    class="text-[9px] font-black uppercase tracking-tighter opacity-40"
                    >Chap</span
                  >
                  <span class="text-2xl font-black italic leading-none">{{
                    form.sectionIndex + 1
                  }}</span>
                </div>
                <div
                  class="absolute -right-1 -top-1 w-5 h-5 bg-teal-500 rounded-full border-4 border-white"
                ></div>
              </div>

              <div>
                <h4
                  class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-1"
                >
                  Cấu trúc khóa học
                </h4>
                <p
                  class="text-sm font-black text-slate-800 uppercase italic tracking-tight"
                >
                  {{ courseData[form.sectionIndex]?.title || "Chương mới" }}
                </p>
              </div>
            </div>

            <div class="flex gap-10 pr-4">
              <div class="text-right">
                <label
                  class="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2"
                  >Định danh ID</label
                >
                <input
                  v-model="form.id"
                  type="number"
                  class="bg-transparent text-2xl font-black text-slate-900 outline-none w-20 text-right focus:text-teal-600 transition-colors border-b-2 border-transparent focus:border-teal-100"
                />
              </div>
              <div class="text-right border-l border-slate-100 pl-10">
                <label
                  class="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2"
                  >Thời lượng (m)</label
                >
                <div class="flex items-center justify-end gap-2">
                  <input
                    v-model="form.duration"
                    class="bg-transparent text-2xl font-black text-slate-900 outline-none w-16 text-right focus:text-teal-600 transition-colors border-b-2 border-transparent focus:border-teal-100"
                  />
                  <Clock class="w-4 h-4 text-teal-400" />
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4 px-2">
            <div class="flex items-center gap-3">
              <div class="h-[2px] w-12 bg-teal-500 rounded-full"></div>
              <span
                style="margin: 12px 0px"
                class="text-[10px] font-black uppercase tracking-[0.5em] text-teal-600 mb-1"
                >Tiêu đề bài giảng</span
              >
              <div class="h-[2px] w-12 bg-teal-500 rounded-full"></div>
            </div>
            <textarea
              v-model="form.title"
              placeholder="Tiêu đề bài giảng"
              style="margin: 18px 0px"
              class="w-full bg-transparent text-3xl font-black text-slate-950 outline-none tracking-[calc(-0.04em)] uppercase leading-[0.85] resize-none placeholder:text-slate-100 focus:placeholder:opacity-0 transition-all"
            ></textarea>
          </div>

          <div class="relative group">
            <div class="absolute"></div>
            <div
              style="margin: 12px 0px"
              class="text-[10px] font-black uppercase tracking-[0.5px] text-teal-600 mb-1"
            >
              Nội dung
            </div>
            <div
              class="relative bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden"
            >
              <QuillEditor
                v-model:content="form.content"
                contentType="html"
                theme="snow"
                toolbar="full"
                placeholder="Bắt đầu viết nội dung chuyên sâu tại đây..."
                class="min-h-[750px] border-none"
              />
            </div>
          </div>

          <div
            class="flex justify-between items-center px-10 py-5 bg-white/50 rounded-3xl border border-slate-100 backdrop-blur-sm"
          >
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
                ></div>
                <span
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >Workspace Active</span
                >
              </div>
              <span class="text-slate-200">|</span>
              <span class="text-[10px] font-bold text-slate-400"
                >Tự động lưu: 10:45 PM</span
              >
            </div>
            <div class="flex gap-6">
              <span
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                Ký tự:
                <span class="text-slate-900">{{
                  form.content?.length || 0
                }}</span>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ArrowLeft,
  LayoutDashboard,
  ChevronDown,
  Trash2,
  XCircle,
  BookOpen,
  Cpu,
  Zap,
  Play,
  CheckCircle2,
  AlertCircle,
} from "lucide-vue-next";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { courseData as rawData, lessonContentMap } from "@/data/uavCourseData";

// --- STATE ---
const courseData = ref(rawData);
const expandedSections = ref([0]);
const toasts = ref([]);

const form = ref({
  id: 101,
  sectionIndex: 0,
  title: "UAV là gì? Phân loại và ứng dụng",
  duration: "45",
  content: lessonContentMap[101]?.content || "",
});

// --- HỆ THỐNG TOAST ---
const addToast = (msg, type = "success") => {
  const id = Date.now();
  toasts.value.push({ id, msg, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 3000);
};

// --- LOGIC CHƯƠNG ---
const toggleSection = (idx) => {
  const currentIdx = expandedSections.value.indexOf(idx);
  if (currentIdx > -1) expandedSections.value.splice(currentIdx, 1);
  else expandedSections.value.push(idx);
};

const addNewChapter = () => {
  courseData.value.push({
    title: "Chương mới chưa đặt tên",
    icon: "BookOpen",
    isOpen: true,
    lessons: [],
  });
  addToast("Đã thêm chương mới!");
};

const deleteChapter = (idx) => {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ chương này không?")) {
    courseData.value.splice(idx, 1);
    addToast("Đã xóa chương!", "error");
  }
};

// --- LOGIC BÀI HỌC ---
const loadLesson = (lessonId, sectionIdx) => {
  const detailed = lessonContentMap[lessonId];
  form.value = {
    id: lessonId,
    sectionIndex: sectionIdx,
    title: detailed ? detailed.title : "Bài học mới",
    duration: detailed ? detailed.duration : "20",
    content: detailed ? detailed.content : "",
  };
  // addToast(`Đang sửa: ${form.value.title.substring(0, 15)}...`);
};

const addNewLesson = (sIdx) => {
  const newId = Date.now().toString().slice(-4); // Tạo ID tạm
  courseData.value[sIdx].lessons.push({
    id: parseInt(newId),
    title: "Bài học mới",
    duration: "20",
    completed: false,
  });
  loadLesson(parseInt(newId), sIdx);
  addToast("Đã thêm bài học mới!");
};

const deleteLesson = (sIdx, lIdx, lessonId) => {
  if (confirm("Xóa bài học này?")) {
    courseData.value[sIdx].lessons.splice(lIdx, 1);
    delete lessonContentMap[lessonId];
    addToast("Đã xóa bài học!", "error");
  }
};

const handlePublish = () => {
  if (!form.value.title) return addToast("Thiếu tiêu đề bài học!", "error");

  // Cập nhật dữ liệu vào Map (Giả lập lưu DB)
  lessonContentMap[form.value.id] = { ...form.value };

  // Cập nhật lại title ở sidebar
  const lessonInSidebar = courseData.value[
    form.value.sectionIndex
  ].lessons.find((l) => l.id === form.value.id);
  if (lessonInSidebar) {
    lessonInSidebar.title = form.value.title;
    lessonInSidebar.duration = form.value.duration;
  }

  addToast("Hệ thống đã được cập nhật!");
};
</script>

<style scoped>
/* Tăng độ mượt cho Textarea tiêu đề */
textarea::placeholder {
  color: #f1f5f9;
  -webkit-text-stroke: 1px #e2e8f0;
}

/* Biến Quill thành giao diện chuyên nghiệp */
:deep(.ql-toolbar.ql-snow) {
  border: none !important;
  background: #fcfcfc !important;
  /* padding: 2.5rem 5rem !important;  */
  border-bottom: 1px solid #f8fafc !important;
}

:deep(.ql-container.ql-snow) {
  border: none !important;
}

:deep(.ql-editor) {
  min-height: 750px;
  /* padding: 5rem 6rem !important;  */
  font-family: "Inter", sans-serif;
  font-size: 19px;
  line-height: 1.9;
  color: #1e293b;
}

/* Style cho ảnh trong nội dung */
:deep(.ql-editor img) {
  border-radius: 2.5rem;
  margin: 4rem auto;
  /* box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.12); */
  border: 10px solid white;
  /* transition: transform 0.5s ease; */
}

/* :deep(.ql-editor img:hover) {
  transform: scale(1.02);
} */
</style>
