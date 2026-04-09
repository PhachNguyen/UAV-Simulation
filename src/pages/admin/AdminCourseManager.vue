<script setup>
import { ref } from "vue";
import {
  ChevronRight,
  Video,
  FileText,
  Trash2,
  GripVertical,
  Plus,
  Box,
  UploadCloud,
  X,
  Save,
  Send,
  ChevronDown,
} from "lucide-vue-next";
import LessonStructure from "@/components/LessonStructure.vue";
const uploadProgress = ref(0);
const selectedFileName = ref("");
const videoPreviewUrl = ref(""); // Đường dẫn để hiển thị video
const isFinished = ref(false);

// 1. Kích hoạt chọn file
const triggerFileInput = () => {
  fileInput.value.click();
};

// 2. Xử lý file và tạo Preview
const handleFileUpload = (event) => {
  const file = event.target.files[0] || event.dataTransfer?.files[0];

  if (file && file.type.startsWith("video/")) {
    selectedFileName.value = file.name;
    isFinished.value = false;

    // TẠO ĐƯỜNG DẪN PREVIEW
    // Giải phóng bộ nhớ nếu đã có url cũ
    if (videoPreviewUrl.value) URL.revokeObjectURL(videoPreviewUrl.value);
    videoPreviewUrl.value = URL.createObjectURL(file);

    simulateUpload();
  } else {
    alert("Vui lòng chọn định dạng video!");
  }
};

// 3. Xóa video hiện tại
const removeVideo = () => {
  selectedFileName.value = "";
  videoPreviewUrl.value = "";
  uploadProgress.value = 0;
  isFinished.value = false;
};

// 4. Mô phỏng upload
const simulateUpload = () => {
  uploadProgress.value = 0;
  const interval = setInterval(() => {
    uploadProgress.value += 10;
    if (uploadProgress.value >= 100) {
      clearInterval(interval);
      isFinished.value = true;
    }
  }, 150);
};
const fileInput = ref(null); // Cho video
const resourceInput = ref(null); // [QUAN TRỌNG] Phải có dòng này cho tài liệu
const uploadedFiles = ref([
  // { name: "Flight_Safety_Manual.pdf", status: "Uploaded" },
  // { name: "Pre-Flight_Checklist.docx", status: "Uploaded" },
]);

// --- LOGIC CHO TÀI LIỆU NGUỒN ---

// Mở hộp thoại chọn file
const triggerResourceInput = () => {
  if (resourceInput.value) {
    resourceInput.value.click();
  }
};

// Xử lý upload file
const handleResourceUpload = (event) => {
  // Lấy file từ cả sự kiện 'change' (chọn file) và 'drop' (kéo thả)
  const files = event.target.files || event.dataTransfer?.files;
  if (!files) return;

  const newFiles = Array.from(files).filter((file) => {
    const isDoc =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".pdf") ||
      file.name.toLowerCase().endsWith(".docx");
    return isDoc;
  });

  if (newFiles.length === 0) {
    alert("Hệ thống: Chỉ chấp nhận định dạng PDF hoặc DOCX.");
    return;
  }

  // Thêm vào danh sách
  newFiles.forEach((file) => {
    // Kiểm tra tránh trùng tên file nếu muốn
    const isExisted = uploadedFiles.value.some((f) => f.name === file.name);
    if (!isExisted) {
      uploadedFiles.value.push({
        name: file.name,
        status: "Uploaded",
      });
    }
  });

  // Reset input để có thể chọn lại chính file đó nếu vừa xóa
  if (event.target.value) event.target.value = "";
};

// 3. Xóa tài liệu khỏi danh sách
const removeResource = (index) => {
  uploadedFiles.value.splice(index, 1);
};
const courseStructure = ref([
  {
    id: 1,
    title: "1. Giới thiệu",
    lessons: [{ id: 101, title: "1.1 Tổng quan" }],
  },
  { id: 2, title: "2. Cơ học Bay" },
  { id: 3, title: "3. Giao thức An toàn" },
  { id: 4, title: "4. Các động tác nâng cao" },
]);
// const currentStatus = ref("Nháp");
</script>

<template>
  <div
    class="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-inter antialiased pb-20"
  >
    <header
      class="bg-white border-b border-[#dee2e6] px-8 py-4 flex justify-between items-center sticky top-0 z-50"
    >
      <h1 class="text-2xl font-extrabold text-[#0b1f3f] tracking-tight">
        Giao diện Tạo Bài học Quản trị
      </h1>
      <div class="flex gap-3">
        <button
          class="px-6 py-2.5 bg-[#0b1f3f] text-white font-bold rounded-lg text-sm hover:bg-black transition-all shadow-sm"
        >
          Lưu & Xuất bản
        </button>
        <button
          class="px-6 py-2.5 border border-[#dee2e6] text-[#1a1a1a] font-bold rounded-lg text-sm hover:bg-slate-50 transition-all bg-white"
        >
          Lưu Nháp
        </button>
      </div>
    </header>

    <nav
      class="px-8 py-3 border-b border-[#dee2e6] text-[11px] font-bold uppercase tracking-widest text-[#4a4a4a] flex items-center gap-2 bg-white/50"
    >
      <a href="#" class="hover:text-[#0b1f3f]">Trang chủ</a>
      <ChevronRight class="w-3 h-3 text-slate-400" />
      <a href="#" class="hover:text-[#0b1f3f]">Khóa học</a>
      <ChevronRight class="w-3 h-3 text-slate-400" />
      <a href="#" class="hover:text-[#0b1f3f]">Vận hành UAV</a>
      <ChevronRight class="w-3 h-3 text-slate-400" />
      <span class="text-[#0b1f3f]">Bài học Mới</span>
    </nav>

    <main class="max-w-[1440px] mx-auto px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-9 space-y-6">
          <div
            class="bg-white rounded-xl border border-[#dee2e6] p-8 shadow-sm space-y-8"
          >
            <h2
              class="text-xl font-extrabold text-[#0b1f3f] uppercase tracking-tight"
            >
              Chi tiết Bài giảng của chương {{ courseStructure[0].title }}
            </h2>

            <div class="space-y-3">
              <label
                class="text-[11px] font-black text-[#0b1f3f] uppercase tracking-widest"
                >Tiêu đề Bài học</label
              >
              <input
                v-model="lessonTitle"
                type="text"
                placeholder="Nhập tiêu đề bài học (ví dụ: Cơ học bay UAV)"
                class="w-full px-4 py-3.5 rounded-lg border border-[#dee2e6] focus:ring-2 focus:ring-[#0b1f3f]/10 focus:border-[#0b1f3f] outline-none transition-all font-medium placeholder:text-slate-400 bg-[#fcfcfc]"
              />
            </div>
            <!-- Mô tả bài học -->

            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <label
                  class="text-[11px] font-black text-[#0b1f3f] uppercase tracking-widest"
                >
                  Mô tả Bài giảng
                </label>
                <span class="text-[10px] font-bold text-slate-400 uppercase"
                  >Tối đa 500 ký tự</span
                >
              </div>
              <textarea
                v-model="lessonDescription"
                rows="4"
                placeholder="Mô tả tóm tắt nội dung bài học này giúp học viên nắm bắt nhanh..."
                class="w-full px-4 py-3.5 rounded-lg border border-[#dee2e6] focus:ring-2 focus:ring-[#0b1f3f]/10 focus:border-[#0b1f3f] outline-none transition-all font-medium placeholder:text-slate-400 bg-[#fcfcfc] resize-none leading-relaxed"
              ></textarea>
            </div>
            <!-- Bài giảng -->
            <div class="space-y-6">
              <h3
                class="text-[11px] font-black text-[#0b1f3f] uppercase tracking-widest"
              >
                Tải bài giảng Video và Tài liệu bài học
              </h3>

              <div class="grid md:grid-cols-2 gap-8 items-start font-inter">
                <div class="space-y-4">
                  <label
                    class="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest block"
                  >
                    Bài giảng Video
                  </label>

                  <input
                    type="file"
                    ref="fileInput"
                    class="hidden"
                    accept="video/*"
                    @change="handleFileUpload"
                  />

                  <div
                    class="w-full relative aspect-video rounded-xl border-2 border-dashed border-[#0b1f3f] overflow-hidden bg-[#f8f9fa] shadow-sm"
                  >
                    <div
                      v-if="!isFinished"
                      @click="triggerFileInput"
                      @dragover.prevent
                      @drop.prevent="handleFileUpload"
                      class="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors group"
                    >
                      <div
                        v-if="uploadProgress === 0"
                        class="flex flex-col items-center"
                      >
                        <Video
                          class="w-10 h-10 text-slate-300 group-hover:text-[#0b1f3f] mb-4 transition-colors"
                        />
                        <p
                          class="text-[11px] text-slate-500 font-bold text-center leading-relaxed px-6"
                        >
                          Tải file tại đây<br />hoặc
                          <span class="text-[#0b1f3f] underline">Browse</span>
                        </p>
                      </div>

                      <div
                        v-if="uploadProgress > 0 && uploadProgress < 100"
                        class="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center px-10 space-y-4"
                      >
                        <div
                          class="w-full max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden border"
                        >
                          <div
                            class="h-full bg-[#0b1f3f] transition-all duration-300"
                            :style="{ width: uploadProgress + '%' }"
                          ></div>
                        </div>
                        <span
                          class="font-mono text-[10px] font-black text-[#0b1f3f] uppercase"
                          >{{ uploadProgress }}% Uploading...</span
                        >
                      </div>
                    </div>

                    <div v-else class="absolute inset-0 bg-black group/player">
                      <video
                        :src="videoPreviewUrl"
                        controls
                        class="w-full h-full object-contain"
                      ></video>
                      <div
                        class="absolute top-4 right-4 opacity-0 group-hover/player:opacity-100 transition-opacity flex gap-2"
                      >
                        <button
                          @click="triggerFileInput"
                          class="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40"
                        >
                          <RefreshCw class="w-4 h-4" />
                        </button>
                        <button
                          @click="removeVideo"
                          class="p-2 bg-red-500/80 backdrop-blur-md rounded-lg text-white hover:bg-red-600"
                        >
                          <X class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="isFinished"
                    class="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest pt-1"
                  >
                    <div
                      class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                    ></div>
                    Hệ thống: Video đã sẵn sàng
                  </div>
                </div>

                <div class="space-y-4">
                  <label
                    class="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest block"
                  >
                    Tài liệu Nguồn
                  </label>

                  <input
                    type="file"
                    ref="resourceInput"
                    class="hidden"
                    multiple
                    accept=".pdf,.docx"
                    @change="handleResourceUpload"
                  />

                  <div
                    @click="triggerResourceInput"
                    @dragover.prevent
                    @drop.prevent="handleResourceUpload"
                    class="w-full aspect-video border-2 border-dashed border-[#0b1f3f] rounded-xl flex flex-col items-center justify-center bg-[#f8f9fa] hover:bg-white transition-all cursor-pointer group"
                  >
                    <FileText
                      class="w-10 h-10 text-slate-300 group-hover:text-[#0b1f3f] mb-4 transition-colors"
                    />
                    <p
                      class="text-[11px] text-slate-500 font-bold text-center leading-relaxed px-6"
                    >
                      Kéo file tài liệu vào đây (PDF, DOCX)<br />hoặc
                      <span class="text-[#0b1f3f] underline">Browse</span>
                    </p>
                  </div>

                  <div class="space-y-2 mt-4">
                    <transition-group name="list">
                      <div
                        v-for="(file, index) in uploadedFiles"
                        :key="file.name + index"
                        class="flex items-center justify-between p-3 bg-white border border-[#dee2e6] rounded-lg group hover:border-[#0b1f3f] transition-all shadow-sm"
                      >
                        <div class="flex items-center gap-3">
                          <FileText class="w-4 h-4 text-[#4a4a4a]" />
                          <span
                            class="text-[11px] font-bold text-[#1a1a1a] truncate max-w-[150px]"
                            >{{ file.name }}</span
                          >
                          <span
                            class="text-[9px] font-mono font-bold text-green-600 uppercase tracking-widest"
                            >- {{ file.status }}</span
                          >
                        </div>
                        <button
                          @click.stop="removeResource(index)"
                          class="p-1.5 hover:bg-red-50 rounded text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </transition-group>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-xl border border-[#dee2e6] overflow-hidden shadow-sm"
          >
            <div
              class="px-8 py-5 border-b border-[#dee2e6] flex justify-between items-center bg-[#fcfcfc]"
            >
              <h3
                class="text-sm font-black text-[#0b1f3f] uppercase tracking-[0.2em]"
              >
                Tích hợp Mô phỏng UAV
              </h3>
              <ChevronDown class="w-5 h-5 text-[#4a4a4a]" />
            </div>
            <div class="p-8 space-y-8">
              <div class="flex items-center gap-4">
                <button
                  @click="isSimulationEnabled = !isSimulationEnabled"
                  :class="[
                    'w-11 h-6 rounded-full transition-all relative p-1 shadow-inner',
                    isSimulationEnabled ? 'bg-[#0b1f3f]' : 'bg-[#dee2e6]',
                  ]"
                >
                  <div
                    :class="[
                      'w-4 h-4 bg-white rounded-full transition-all shadow-sm',
                      isSimulationEnabled ? 'translate-x-5' : 'translate-x-0',
                    ]"
                  ></div>
                </button>
                <span
                  class="text-xs font-extrabold uppercase text-[#0b1f3f] tracking-wide"
                  >Kích hoạt Mô phỏng 3D</span
                >
              </div>

              <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-4">
                  <button
                    class="px-6 py-3.5 border-2 border-[#dee2e6] text-[#0b1f3f] font-black text-[10px] uppercase rounded-lg hover:border-[#0b1f3f] transition-all flex items-center gap-3 bg-white shadow-sm"
                  >
                    <Box class="w-4 h-4" /> Liên kết Mô-đun 3D (Chọn từ Thư
                    viện)
                  </button>
                  <p
                    class="text-[10px] text-slate-400 font-bold flex items-center gap-2"
                  >
                    <Info class="w-3 h-3" /> Open now modal
                  </p>
                </div>

                <div class="space-y-4">
                  <label
                    class="text-[10px] font-black uppercase text-[#4a4a4a] tracking-widest"
                    >Tải lên Tham số Mô phỏng (JSON, XML)</label
                  >
                  <div class="flex gap-2">
                    <div
                      class="flex-1 bg-[#f8f9fa] border border-[#dee2e6] rounded-lg px-4 py-2.5 flex items-center text-[11px] font-medium text-slate-500 shadow-inner"
                    >
                      <UploadCloud class="w-4 h-4 mr-3" /> Tải lên tài liệu
                      nguồn (PDF, DOCX)
                    </div>
                    <button
                      class="bg-[#0b1f3f] text-white text-[10px] font-black uppercase px-6 py-2 rounded-lg hover:bg-black transition-colors"
                    >
                      Duyệt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--  Tạo component structure -->
        <LessonStructure
          :structure="courseStructure"
          status="Nháp"
        ></LessonStructure>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");

/* 2. Sau đó mới đến @theme hoặc định nghĩa biến */
@theme {
  --font-inter: "Inter", sans-serif;
  --font-jetbrains: "JetBrains Mono", monospace;
}

/* 3. Cuối cùng mới đến các class tùy chỉnh */
.font-inter {
  font-family: var(--font-inter);
}

.font-mono {
  font-family: var(--font-jetbrains);
}

/* ... các mã CSS khác của bạn ... */

/* Tùy chỉnh Font weight cực mạnh cho style Aero-X */
.font-black {
  font-weight: 900;
}

/* Custom Scrollbar cho trải nghiệm mượt mà */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f8f9fa;
}
::-webkit-scrollbar-thumb {
  background: #dee2e6;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #0b1f3f;
}

/* Loại bỏ viền xanh mặc định khi focus vào input */
input:focus {
  outline: none;
}
</style>
