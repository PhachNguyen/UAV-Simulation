<script setup>
import { ref } from "vue";
import {
  Save,
  Send,
  ChevronRight,
  Video,
  FileText,
  Trash2,
  GripVertical,
  Plus,
  Box,
  Info,
  CheckCircle2,
  Circle,
  UploadCloud,
  X,
} from "lucide-vue-next";

// --- STATE ---
const currentStep = ref(2); // Đang ở bước 2 như trong ảnh
const isSimulationEnabled = ref(true);
const uploadProgress = ref(45);

const steps = [
  { id: 1, name: "Bước 1: Chi tiết Bài học" },
  { id: 2, name: "Bước 2: Cấu hình Chương" },
  { id: 3, name: "Bước 3: Xem lại & Xuất bản" },
];

const courseStructure = ref([
  { id: 1, title: "1. Giới thiệu" },
  { id: 2, title: "2. Cơ học Bay" },
  { id: 3, title: "3. Giao thức An toàn" },
  { id: 4, title: "4. Các động tác nâng cao" },
]);

const uploadedFiles = ref([
  { name: "Flight_Safety_Manual.pdf", status: "Uploaded", type: "pdf" },
  { name: "Pre-Flight_Checklist.docx", status: "Uploaded", type: "doc" },
]);
</script>

<template>
  <div
    class="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans antialiased pb-20"
  >
    <header
      class="bg-white border-b border-[#dee2e6] px-8 py-4 flex justify-between items-center sticky top-0 z-50"
    >
      <h1 class="text-2xl font-black text-[#0b1f3f] tracking-tight">
        Giao diện Tạo Bài học Quản trị
      </h1>
      <div class="flex gap-3">
        <button
          class="px-6 py-2.5 bg-[#0b1f3f] text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-black transition-all"
        >
          Lưu & Xuất bản
        </button>
        <button
          class="px-6 py-2.5 border-2 border-[#0b1f3f] text-[#0b1f3f] font-bold rounded-lg text-sm hover:bg-slate-50 transition-all"
        >
          Lưu Nháp
        </button>
      </div>
    </header>

    <nav
      class="px-8 py-3 bg-[#f1f3f5] border-b border-[#dee2e6] text-[11px] font-bold uppercase tracking-widest text-[#4a4a4a] flex items-center gap-2"
    >
      <a href="#" class="hover:text-[#0b1f3f]">Trang chủ</a>
      <ChevronRight class="w-3 h-3" />
      <a href="#" class="hover:text-[#0b1f3f]">Khóa học</a>
      <ChevronRight class="w-3 h-3" />
      <a href="#" class="hover:text-[#0b1f3f]">Vận hành UAV</a>
      <ChevronRight class="w-3 h-3" />
      <span class="text-[#0b1f3f]">Bài học Mới</span>
    </nav>

    <main class="max-w-[1400px] mx-auto px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-9 space-y-6">
          <div
            class="bg-white rounded-xl border border-[#dee2e6] p-8 shadow-sm"
          >
            <h2
              class="text-xl font-black text-[#0b1f3f] mb-8 uppercase tracking-tight"
            >
              Wizard Tạo Bài Giảng
            </h2>

            <div class="flex items-center justify-between relative">
              <div
                class="absolute top-1/2 left-0 w-full h-0.5 bg-[#dee2e6] -translate-y-1/2 z-0"
              ></div>

              <div
                v-for="step in steps"
                :key="step.id"
                class="relative z-10 flex items-center gap-3 px-4 bg-white"
              >
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
                    currentStep >= step.id
                      ? 'bg-[#0b1f3f] border-[#0b1f3f] text-white shadow-lg'
                      : 'bg-white border-[#dee2e6] text-[#4a4a4a]',
                  ]"
                >
                  <CheckCircle2 v-if="currentStep > step.id" class="w-5 h-5" />
                  <span v-else class="text-xs font-black">{{ step.id }}</span>
                </div>
                <span
                  :class="[
                    'text-xs font-black uppercase tracking-wider',
                    currentStep === step.id
                      ? 'text-[#0b1f3f]'
                      : 'text-[#4a4a4a]',
                  ]"
                >
                  {{ step.name }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-xl border border-[#dee2e6] p-8 shadow-sm space-y-8"
          >
            <h3
              class="text-sm font-black text-[#0b1f3f] uppercase tracking-[0.2em]"
            >
              Tải lên Media
            </h3>

            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <label class="text-xs font-bold text-[#4a4a4a] uppercase"
                  >Bài giảng Video</label
                >
                <div
                  class="border-2 border-dashed border-[#dee2e6] rounded-xl p-10 flex flex-col items-center justify-center bg-[#f8f9fa] hover:border-[#0b1f3f] cursor-pointer transition-all group"
                >
                  <Video
                    class="w-10 h-10 text-[#dee2e6] group-hover:text-[#0b1f3f] mb-4"
                  />
                  <p class="text-[11px] text-[#4a4a4a] font-bold text-center">
                    Drag & Drop Video Files Here (MP4, MOV)<br />
                    or <span class="text-[#0b1f3f] underline">Browse</span>
                  </p>
                </div>
                <div
                  class="bg-[#f1f3f5] p-4 rounded-lg border border-[#dee2e6] space-y-2"
                >
                  <div
                    class="flex justify-between text-[10px] font-black uppercase"
                  >
                    <span>Lecture_1_Intro.mp4</span>
                    <span class="text-[#0b1f3f]"
                      >{{ uploadProgress }}% Uploading</span
                    >
                  </div>
                  <div
                    class="h-1.5 w-full bg-[#dee2e6] rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full bg-[#0b1f3f] transition-all"
                      :style="{ width: uploadProgress + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <label class="text-xs font-bold text-[#4a4a4a] uppercase"
                  >Tài liệu Nguồn</label
                >
                <div
                  class="border-2 border-dashed border-[#dee2e6] rounded-xl p-10 flex flex-col items-center justify-center bg-[#f8f9fa] hover:border-[#0b1f3f] cursor-pointer transition-all group"
                >
                  <FileText
                    class="w-10 h-10 text-[#dee2e6] group-hover:text-[#0b1f3f] mb-4"
                  />
                  <p class="text-[11px] text-[#4a4a4a] font-bold text-center">
                    Drag & Drop Resource Files Here (PDF, DOCX)<br />
                    or <span class="text-[#0b1f3f] underline">Browse</span>
                  </p>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="file in uploadedFiles"
                    :key="file.name"
                    class="flex items-center justify-between p-3 bg-white border border-[#dee2e6] rounded-lg"
                  >
                    <div class="flex items-center gap-3">
                      <FileText class="w-4 h-4 text-[#4a4a4a]" />
                      <span class="text-[11px] font-bold text-[#1a1a1a]">{{
                        file.name
                      }}</span>
                      <span
                        class="text-[9px] font-black text-green-600 uppercase tracking-widest"
                        >- {{ file.status }}</span
                      >
                    </div>
                    <Trash2
                      class="w-4 h-4 text-[#dee2e6] hover:text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-xl border border-[#dee2e6] overflow-hidden shadow-sm"
          >
            <div
              class="px-8 py-4 border-b border-[#dee2e6] flex justify-between items-center bg-[#f8f9fa]"
            >
              <h3
                class="text-sm font-black text-[#0b1f3f] uppercase tracking-[0.2em]"
              >
                Tích hợp Mô phỏng UAV
              </h3>
              <ChevronRight class="w-5 h-5 text-[#4a4a4a] rotate-90" />
            </div>
            <div class="p-8 space-y-8">
              <div class="flex items-center gap-4">
                <button
                  @click="isSimulationEnabled = !isSimulationEnabled"
                  :class="[
                    'w-12 h-6 rounded-full transition-all relative p-1 shadow-inner',
                    isSimulationEnabled ? 'bg-[#0b1f3f]' : 'bg-[#dee2e6]',
                  ]"
                >
                  <div
                    :class="[
                      'w-4 h-4 bg-white rounded-full transition-all shadow-sm',
                      isSimulationEnabled ? 'translate-x-6' : 'translate-x-0',
                    ]"
                  ></div>
                </button>
                <span class="text-xs font-black uppercase text-[#0b1f3f]"
                  >Kích hoạt Mô phỏng 3D</span
                >
              </div>

              <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-4">
                  <button
                    class="px-6 py-3 border-2 border-[#dee2e6] text-[#0b1f3f] font-black text-[10px] uppercase rounded-lg hover:border-[#0b1f3f] transition-all flex items-center gap-3"
                  >
                    <Box class="w-4 h-4" /> Liên kết Mô-đun 3D (Chọn từ Thư
                    viện)
                  </button>
                  <p class="text-[10px] text-[#4a4a4a] font-bold">
                    Open now modal
                  </p>
                </div>

                <div class="space-y-4">
                  <label class="text-[10px] font-black uppercase text-[#4a4a4a]"
                    >Tải lên Tham số Mô phỏng (JSON, XML)</label
                  >
                  <div class="flex gap-2">
                    <div
                      class="flex-1 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg px-4 py-2 flex items-center text-[11px] font-bold text-[#4a4a4a]"
                    >
                      <UploadCloud class="w-4 h-4 mr-3" /> Tải lên tài liệu
                      nguồn (PDF, DOCX)
                    </div>
                    <button
                      class="bg-[#0b1f3f] text-white text-[10px] font-black uppercase px-6 py-2 rounded-lg"
                    >
                      Duyệt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="lg:col-span-3 space-y-6">
          <div
            class="bg-white rounded-xl border border-[#dee2e6] p-6 shadow-sm space-y-6"
          >
            <h3
              class="text-sm font-black text-[#0b1f3f] uppercase tracking-[0.2em]"
            >
              Cấu trúc Bài học
            </h3>
            <div class="space-y-3">
              <div
                v-for="section in courseStructure"
                :key="section.id"
                class="p-4 border border-[#dee2e6] rounded-lg bg-white flex items-center gap-4 group hover:border-[#0b1f3f] transition-all cursor-move"
              >
                <GripVertical
                  class="w-4 h-4 text-[#dee2e6] group-hover:text-[#0b1f3f]"
                />
                <span
                  class="text-[11px] font-bold text-[#1a1a1a] tracking-wide"
                  >{{ section.title }}</span
                >
              </div>
              <button
                class="w-full py-3 border-2 border-dashed border-[#dee2e6] text-[#4a4a4a] text-[10px] font-black uppercase rounded-lg hover:border-[#0b1f3f] hover:text-[#0b1f3f] transition-all flex items-center justify-center gap-2"
              >
                <Plus class="w-4 h-4" /> Thêm Phần
              </button>
            </div>
          </div>

          <div
            class="bg-white rounded-xl border border-[#dee2e6] p-6 shadow-sm flex justify-between items-center"
          >
            <span
              class="text-[11px] font-black text-[#4a4a4a] uppercase tracking-widest"
              >Trạng thái:</span
            >
            <span
              class="px-4 py-1 bg-slate-100 text-[#0b1f3f] text-[10px] font-black uppercase rounded-full"
              >Nháp</span
            >
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.font-black {
  font-weight: 900;
}
.tracking-tight {
  letter-spacing: -0.05em;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f8f9fa;
}
::-webkit-scrollbar-thumb {
  background: #dee2e6;
  border-radius: 10px;
}
</style>
