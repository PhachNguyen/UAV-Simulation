<script setup>
import { ref } from "vue";
import {
  LayoutDashboard,
  BookOpen,
  Plane,
  BarChart3,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Save,
  Send,
  Clock,
  Layers,
  CheckCircle,
  UploadCloud,
  FileText,
  X,
  Eye,
  History,
} from "lucide-vue-next";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const lessonTitle = ref("");
const lessonDescription = ref("");
const content = ref("");
const duration = ref(45);
const isRequired = ref(true);
const tags = ref(["Khí động học", "UAV Basic"]);

const handlePublish = () => {
  console.log("Publishing...", {
    title: lessonTitle.value,
    content: content.value,
  });
};
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
    <div class="flex-1 flex flex-col">
      <main class="p-10 max-w-7xl mx-auto w-full grid grid-cols-12 gap-8">
        <div class="col-span-8 space-y-8">
          <div>
            <div
              class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2"
            >
              <span>Khóa học</span> <span>/</span>
              <span class="text-teal-600">Soạn thảo lý thuyết</span>
            </div>
            <h2 class="text-3xl font-black text-slate-900 leading-tight">
              Soạn thảo bài học lý thuyết
            </h2>
            <p class="text-slate-500 mt-1 text-sm font-medium">
              Thiết lập nội dung chuyên môn và học thuật cho module UAV.
            </p>
          </div>

          <section
            class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-6"
          >
            <div class="flex items-center gap-3 text-teal-600">
              <div
                class="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center"
              >
                <CheckCircle class="w-4 h-4" />
              </div>
              <h3 class="font-black uppercase text-xs tracking-widest">
                Thông tin cơ bản
              </h3>
            </div>

            <div class="space-y-4">
              <div>
                <label
                  class="text-[10px] font-black uppercase text-slate-400 mb-2 block"
                  >Tiêu đề bài học</label
                >
                <input
                  v-model="lessonTitle"
                  type="text"
                  placeholder="Ví dụ: Cơ chế khí động học của Multirotor"
                  class="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-teal-500/10 outline-none font-medium"
                />
              </div>
              <div>
                <label
                  class="text-[10px] font-black uppercase text-slate-400 mb-2 block"
                  >Mô tả tóm tắt</label
                >
                <textarea
                  v-model="lessonDescription"
                  rows="3"
                  placeholder="Mô tả ngắn gọn mục tiêu của bài học..."
                  class="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-teal-500/10 outline-none font-medium resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          <section
            class="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden"
          >
            <div
              class="p-6 border-b border-slate-50 flex items-center justify-between"
            >
              <h3
                class="font-black uppercase text-xs tracking-widest text-slate-800"
              >
                Nội dung chi tiết
              </h3>
              <span
                class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic"
                >Auto-saved 2m ago</span
              >
            </div>
            <div class="p-2">
              <QuillEditor
                v-model:content="content"
                contentType="html"
                theme="snow"
                class="min-h-[400px] border-none"
              />
            </div>
          </section>
        </div>

        <div class="col-span-4 space-y-6">
          <div class="flex gap-3">
            <button
              class="flex-1 py-4 bg-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-300 transition-all"
            >
              Lưu nháp
            </button>
            <button
              @click="handlePublish"
              class="flex-1 py-4 bg-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-teal-200 hover:bg-teal-600 transition-all"
            >
              Xuất bản
            </button>
          </div>

          <div
            class="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4"
          >
            <h3
              class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4"
            >
              Cài đặt bài học
            </h3>

            <div
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div class="flex items-center gap-3">
                <Clock class="w-4 h-4 text-teal-600" />
                <span class="text-xs font-bold text-slate-600">Thời lượng</span>
              </div>
              <div class="flex items-center gap-2">
                <input
                  v-model="duration"
                  class="w-8 bg-transparent text-right font-black text-sm outline-none"
                />
                <span class="text-[10px] font-bold text-slate-400">Phút</span>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div class="flex items-center gap-3">
                <Layers class="w-4 h-4 text-teal-600" />
                <span class="text-xs font-bold text-slate-600">Phân loại</span>
              </div>
              <span class="text-xs font-black text-teal-600 uppercase"
                >Cơ bản</span
              >
            </div>

            <div
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div class="flex items-center gap-3">
                <CheckCircle class="w-4 h-4 text-teal-600" />
                <span class="text-xs font-bold text-slate-600">Bắt buộc</span>
              </div>
              <button
                @click="isRequired = !isRequired"
                class="w-10 h-5 rounded-full relative transition-colors duration-300"
                :class="isRequired ? 'bg-teal-500' : 'bg-slate-300'"
              >
                <div
                  class="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300"
                  :class="isRequired ? 'translate-x-5' : ''"
                ></div>
              </button>
            </div>
          </div>

          <div
            class="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4"
          >
            <h3
              class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4"
            >
              Hình ảnh minh họa
            </h3>
            <div
              class="border-2 border-dashed border-slate-200 rounded-[1.5rem] p-8 flex flex-col items-center justify-center bg-slate-50 hover:border-teal-400 transition-all cursor-pointer group"
            >
              <UploadCloud
                class="w-8 h-8 text-slate-300 group-hover:text-teal-500 mb-2 transition-colors"
              />
              <p
                class="text-[10px] font-bold text-slate-500 text-center uppercase tracking-tighter"
              >
                Kéo thả hoặc nhấn để tải lên
              </p>
              <p class="text-[9px] text-slate-400 mt-1 uppercase">
                JPG, PNG (Max 5MB)
              </p>
            </div>
            <div
              class="flex items-center justify-between p-3 bg-slate-900 rounded-xl shadow-lg"
            >
              <div class="flex items-center gap-3 overflow-hidden">
                <div
                  class="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-500 shrink-0"
                >
                  <Plane class="w-5 h-5" />
                </div>
                <div class="overflow-hidden">
                  <p
                    class="text-[10px] font-bold text-white truncate uppercase tracking-tighter"
                  >
                    uav-aerodynamics.jpg
                  </p>
                  <p class="text-[9px] text-slate-500 uppercase">1.2 MB</p>
                </div>
              </div>
              <button class="p-1 text-slate-500 hover:text-white">
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            class="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4"
          >
            <h3
              class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4"
            >
              Từ khóa & SEO
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in tags"
                :key="tag"
                class="px-3 py-1 bg-teal-50 text-teal-600 rounded-lg text-[10px] font-black uppercase tracking-tight flex items-center gap-2"
              >
                #{{ tag }} <X class="w-3 h-3 cursor-pointer" />
              </span>
              <button
                class="px-3 py-1 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-slate-50 uppercase"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer
        class="h-14 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-center gap-8 sticky bottom-0 z-50"
      >
        <button
          class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase hover:text-teal-600 transition-colors"
        >
          <div class="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
          Đang chỉnh sửa bởi bạn
        </button>
        <button
          class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase hover:text-slate-900"
        >
          <Eye class="w-4 h-4" /> Xem trước
        </button>
        <button
          class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase hover:text-slate-900"
        >
          <History class="w-4 h-4" /> Lịch sử
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Tùy chỉnh Quill Editor để đồng nhất với UI */
:deep(.ql-toolbar.ql-snow) {
  border: none !important;
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9 !important;
}
:deep(.ql-container.ql-snow) {
  border: none !important;
}
:deep(.ql-editor) {
  padding: 2rem;
  font-family: "Inter", sans-serif;
  line-height: 1.8;
  font-size: 15px;
  color: #334155;
}
:deep(.ql-editor.ql-blank::before) {
  font-style: normal;
  color: #94a3b8;
  font-weight: 500;
}
</style>
