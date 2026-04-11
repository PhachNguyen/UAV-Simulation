<script setup>
import { onMounted, ref, computed, reactive } from "vue";
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
  RefreshCw,
  Info,
  MapPin,
  Check,
} from "lucide-vue-next";
import LessonStructure from "@/components/LessonStructure.vue";
import api from "@/utils/apis/axios";

/** --- 1. STATE QUẢN LÝ --- **/
const isLoading = ref(false);
const courseStructure = ref([]);
const activeLessonId = ref(null);
const uploadProgress = ref(0);
const isVideoUploading = ref(false);

/** --- 2. DATA ACCESS (COMPUTED) --- **/
// Lấy Lesson hiện tại từ mảng lồng nhau
const currentLesson = computed(() => {
  if (!activeLessonId.value) return null;
  for (const chapter of courseStructure.value) {
    const lesson = chapter.lessons?.find((l) => l.id === activeLessonId.value);
    if (lesson) return lesson;
  }
  return null;
});

// Danh sách file của lesson đang chọn
const uploadedFiles = computed(() => currentLesson.value?.resources || []);

// Nguồn video (Ưu tiên preview blob, sau đó đến link server)
const videoSource = computed(() => {
  if (!currentLesson.value?.videoUrl) return "";
  const url = currentLesson.value.videoUrl;
  return url.startsWith("blob:") || url.startsWith("http")
    ? url
    : `http://localhost:5000${url}`;
});

/** --- 3. API & CRUD LOGIC --- **/
const fetchCourseData = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get("/courses");
    courseStructure.value = (data.chapters || []).map((chapter) => ({
      ...chapter,
      lessons: (chapter.lessons || []).map((lesson) => ({
        ...lesson,
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

// Hàm lưu toàn bộ thay đổi của bài học hiện tại lên Server
const handleUpdateLesson = async () => {
  if (!currentLesson.value) return;
  try {
    isLoading.value = true;
    await api.put(
      `/courses/lessons/${currentLesson.value.id}`,
      currentLesson.value,
    );
    alert("Đã lưu bài học thành công!");
  } catch (error) {
    alert("Lỗi khi lưu bài học");
  } finally {
    isLoading.value = false;
  }
};

/** --- 4. MEDIA FEATURE (VIDEO & DOCUMENTS) --- **/
const fileInput = ref(null);
const resourceInput = ref(null);

const uploadFile = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post("/courses/upload", formData, {
      onUploadProgress: (e) => {
        if (type === "video")
          uploadProgress.value = Math.round((e.loaded * 100) / e.total);
      },
    });
    return data.url;
  } catch (error) {
    return null;
  }
};

const handleVideoUpload = async (event) => {
  const file = event.target.files[0];
  if (!file || !currentLesson.value) return;

  const preview = URL.createObjectURL(file);
  currentLesson.value.videoUrl = preview; // Hiện preview ngay lập tức
  isVideoUploading.value = true;

  const url = await uploadFile(file, "video");
  if (url) currentLesson.value.videoUrl = url;
  isVideoUploading.value = false;
};

const handleResourceUpload = async (event) => {
  const files = Array.from(
    event.target.files || event.dataTransfer?.files || [],
  );
  if (!files.length || !currentLesson.value) return;

  for (const file of files) {
    const url = await uploadFile(file, "document");
    if (url) {
      currentLesson.value.resources.push({
        name: file.name,
        url,
        status: "Uploaded",
      });
    }
  }
};

const removeVideo = () => {
  if (currentLesson.value) currentLesson.value.videoUrl = "";
};
const removeResource = (idx) => currentLesson.value?.resources.splice(idx, 1);

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

const selectLesson = (id) => {
  activeLessonId.value = id;
};

onMounted(fetchCourseData);
</script>
<template>
  <div
    class="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-inter antialiased pb-20"
  >
    <header
      class="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50"
    >
      <h1 class="text-2xl font-extrabold text-[#0b1f3f]">Quản trị Bài học</h1>
      <div class="flex gap-3">
        <button
          @click="handleUpdateLesson"
          :disabled="isLoading"
          class="px-6 py-2.5 bg-[#0b1f3f] text-white font-bold rounded-lg hover:bg-black transition-all shadow-sm flex items-center gap-2"
        >
          <Save v-if="!isLoading" class="w-4 h-4" />
          <RefreshCw v-else class="w-4 h-4 animate-spin" />
          Lưu & Xuất bản
        </button>
      </div>
    </header>

    <main class="max-w-[1440px] mx-auto px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div v-if="currentLesson" class="lg:col-span-9 space-y-6">
          <div
            class="bg-white rounded-xl border border-[#dee2e6] p-8 shadow-sm space-y-8"
          >
            <h2
              class="text-xl font-extrabold text-[#0b1f3f] uppercase tracking-tight"
            >
              Đang sửa: {{ currentLesson.title }}
            </h2>

            <div class="space-y-6">
              <div class="space-y-3">
                <label
                  class="text-[11px] font-black text-[#0b1f3f] uppercase tracking-widest"
                  >Tiêu đề Bài học</label
                >
                <input
                  v-model="currentLesson.title"
                  placeholder="Nhập tiêu đề bài học"
                  type="text"
                  class="w-full px-4 py-3.5 rounded-lg border border-[#dee2e6] focus:border-[#0b1f3f] outline-none"
                />
              </div>
              <div class="space-y-3">
                <label
                  class="text-[11px] font-black text-[#0b1f3f] uppercase tracking-widest"
                  >Mô tả Bài giảng</label
                >
                <textarea
                  v-model="currentLesson.description"
                  rows="4"
                  placeholder="Nhập tối đa 5000 kí tự mô tả"
                  class="w-full px-4 py-3.5 rounded-lg border border-[#dee2e6] outline-none resize-none"
                ></textarea>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-8 items-start">
              <div class="space-y-4">
                <label
                  class="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest"
                  >Bài giảng Video</label
                >
                <input
                  type="file"
                  ref="fileInput"
                  class="hidden"
                  accept="video/*"
                  @change="handleVideoUpload"
                />

                <div
                  class="w-full relative aspect-video rounded-xl border-2 border-dashed border-[#0b1f3f] overflow-hidden bg-[#f8f9fa]"
                >
                  <div
                    v-if="isVideoUploading"
                    class="absolute inset-0 bg-white flex flex-col items-center justify-center p-6"
                  >
                    <div
                      class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border mb-2"
                    >
                      <div
                        class="h-full bg-[#0b1f3f] transition-all"
                        :style="{ width: uploadProgress + '%' }"
                      ></div>
                    </div>
                    <span class="text-[10px] font-black uppercase"
                      >{{ uploadProgress }}% Uploading...</span
                    >
                  </div>
                  <div
                    v-else-if="!videoSource"
                    @click="fileInput.click()"
                    class="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all"
                  >
                    <Video class="w-10 h-10 text-slate-300 mb-4" />
                    <p class="text-[11px] text-slate-500 font-bold">
                      Kéo video hoặc nhấn để chọn
                    </p>
                  </div>
                  <div v-else class="absolute inset-0 bg-black group/player">
                    <video
                      :src="videoSource"
                      controls
                      class="w-full h-full object-contain"
                    ></video>
                    <div
                      class="absolute top-4 right-4 opacity-0 group-hover/player:opacity-100 flex gap-2"
                    >
                      <button
                        @click="fileInput.click()"
                        class="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white"
                      >
                        <RefreshCw class="w-4 h-4" />
                      </button>
                      <button
                        @click="removeVideo"
                        class="p-2 bg-red-500/80 rounded-lg text-white"
                      >
                        <X class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <label
                  class="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest"
                  >Tài liệu Nguồn</label
                >
                <input
                  type="file"
                  ref="resourceInput"
                  class="hidden"
                  multiple
                  accept=".pdf,.docx"
                  @change="handleResourceUpload"
                />
                <div
                  @click="resourceInput.click()"
                  class="w-full aspect-video border-2 border-dashed border-[#0b1f3f] rounded-xl flex flex-col items-center justify-center bg-[#f8f9fa] cursor-pointer hover:bg-white transition-all"
                >
                  <FileText class="w-10 h-10 text-slate-300 mb-4" />
                  <p class="text-[11px] text-slate-500 font-bold">
                    Chọn tài liệu PDF/DOCX
                  </p>
                </div>
                <div class="space-y-2 mt-4">
                  <transition-group name="list">
                    <div
                      v-for="(file, index) in uploadedFiles"
                      :key="file.name + index"
                      class="flex items-center justify-between p-3 bg-white border border-[#dee2e6] rounded-lg shadow-sm"
                    >
                      <div class="flex items-center gap-3">
                        <FileText class="w-4 h-4 text-[#4a4a4a]" />
                        <span
                          class="text-[11px] font-bold text-[#1a1a1a] truncate max-w-[150px]"
                          >{{ file.name }}</span
                        >
                      </div>
                      <button
                        @click="removeResource(index)"
                        class="p-1.5 text-slate-300 hover:text-red-500"
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
          v-else
          class="lg:col-span-9 flex flex-col items-center justify-center py-40 bg-white rounded-xl border-2 border-dashed border-slate-200"
        >
          <Box class="w-16 h-16 text-slate-200 mb-4" />
          <p
            class="text-slate-400 font-bold uppercase text-[11px] tracking-widest text-center"
          >
            Vui lòng chọn bài học từ danh sách bên phải <br />
            để bắt đầu chỉnh sửa
          </p>
        </div>

        <LessonStructure
          :structure="courseStructure"
          status="Nháp"
          @select-lesson="selectLesson"
          @add-chapter="handleAddChapter"
          @add-lesson="handleAddLesson"
          @remove-item="handleRemoveItem"
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
