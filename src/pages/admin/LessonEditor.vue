<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
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
  Edit3,
  Save,
  Send,
  ChevronDown,
  RefreshCw,
  Info,
  MapPin,
  Check,
} from "lucide-vue-next";
import LessonStructure from "@/components/LessonStructure.vue";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import api from "@/utils/apis/axios";
// Nhận diện xem URL có phải là của Youtube không
const isYouTubeVideo = computed(() => {
  if (!currentLesson.value?.videoUrl) return false;
  const url = currentLesson.value.videoUrl;
  return url.includes("youtube.com") || url.includes("youtu.be");
});

// Chuyển đổi link Youtube thường thành link Embed để nhúng vào iframe
const youtubeEmbedUrl = computed(() => {
  if (!isYouTubeVideo.value) return "";
  const url = currentLesson.value.videoUrl;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
});
/** --- 1. STATE QUẢN LÝ --- **/
const isLoading = ref(false);
const courseStructure = ref(null); // Hoặc [] tùy cấu trúc của cậu
const activeLessonId = ref(null);
const uploadProgress = ref(0);
const isVideoUploading = ref(false);

// CÁC BIẾN MỚI CẦN THÊM ĐỂ SỬA LỖI
const modelInput = ref(null); // Thay thế cho fileRefs.model
const isModelUploading = ref(false);
const latestPickedCoords = ref(null); // Sửa lỗi "latestPickedCoords is not defined"
const router = useRouter();
const route = useRoute();
//  Hàm chuyển đến trang tạo nội dung bài giảng (Sections) và truyền kèm chapterId để biết đang tạo nội dung cho chương nào
const goToSections = (lessonId) => {
  // 1. Tìm ID của Chương chứa bài học này
  let currentChapterId = null;

  for (const chapter of courseStructure.value) {
    // Nếu trong mảng lessons của chương này có chứa lessonId đang tìm
    if (chapter.lessons?.some((l) => l.id === lessonId)) {
      currentChapterId = chapter.id;
      break;
    }
  }

  // 2. Lưu vào LocalStorage (Để các trang khác có thể lấy ra dùng dễ dàng)
  if (currentChapterId) {
    localStorage.setItem("savedChapterId", currentChapterId);
  }

  // 3. Chuyển trang và truyền kèm chapterId lên URL (Cách này an toàn nhất khi F5)
  router.push({
    path: `/admin/lesson/${lessonId}/sections`,
    query: { chapterId: currentChapterId },
    // URL sẽ có dạng: /admin/lesson/15/sections?chapterId=2
  });
};
// Biến mô phỏng
// const isSimulationEnabled = ref(false);
// const latestPickedCoords = ref(null); // Tọa độ điểm vừa được admin chọn trên model 3D
// const uavViewerRef = ref(null); // Tham chiếu đến component UAVViewer để cập nhật vị trí khi có tọa độ mới
// const tempSpotInfo = reactive({ title: "", desc: "" }); // Dữ liệu tạm thời khi thêm hotspot mới
// // --- LOGIC UPLOAD MODEL 3D ---
// const modelInput = ref(null); // Tham chiếu đến input file 3D
// const isModelUploading = ref(false); // Trạng thái khi đang upload model 3D
// const editingHotspotId = ref(null); // Lưu ID của hotspot đang được sửa
// // Biến theo dõi xem đang sửa điểm nào (-1 hoặc null là không sửa)
// const editingIndex = ref(null);
const isSimulationEnabled = ref(false);
const uavViewerRef = ref(null);
const editingIndex = ref(null);

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
    const chapterId = route.params.id;
    const { data } = await api.get(`/courses/${chapterId}`);

    courseStructure.value = [
      {
        ...data,
        lessons: (data.lessons || []).map((lesson) => ({
          ...lesson,
          // THÊM DÒNG NÀY: Ép chữ "null" thành giá trị null thật sự
          model3DPath:
            lesson.model3DPath === "null" || !lesson.model3DPath
              ? null
              : lesson.model3DPath,

          hotspots:
            typeof lesson.hotspots === "string"
              ? JSON.parse(lesson.hotspots)
              : lesson.hotspots || [],
          sections: lesson.sections || [],
          resources:
            typeof lesson.resources === "string"
              ? JSON.parse(lesson.resources)
              : lesson.resources || [],
        })),
      },
    ];

    if (courseStructure.value[0]?.lessons?.length > 0) {
      activeLessonId.value = courseStructure.value[0].lessons[0].id;
    }
  } catch (error) {
    toast.error("Không thể tải dữ liệu chương!");
  } finally {
    isLoading.value = false;
  }
};

// Hàm lưu toàn bộ thay đổi của bài học hiện tại lên Server ( Bỏ)
const handleUpdateLesson = async () => {
  if (!currentLesson.value) return;
  try {
    isLoading.value = true;
    await api.post(
      `/courses/lessons/${currentLesson.value.id}/save-content`,
      currentLesson.value,
    );
    alert("Đã lưu bài học thành công!");
  } catch (error) {
    alert("Lỗi khi lưu bài học");
  } finally {
    isLoading.value = false;
  }
};
//
// Tạo hàm lưu bài học thành công thì chuyển  về tạo nội dung
// Hàm gộp: Lưu dữ liệu hiện tại rồi mới chuyển sang soạn thảo Sections
const saveAndGoToSections = async () => {
  if (!currentLesson.value) return;

  try {
    isLoading.value = true;

    // BƯỚC 1: Lưu toàn bộ dữ liệu (Video, 3D, Hotspots) lên Server
    await api.post(
      `/courses/lessons/${currentLesson.value.id}/save-content`,
      currentLesson.value,
    );

    // BƯỚC 2: Tìm ID của Chương chứa bài học này để phục vụ Sidebar ở trang sau
    const lessonId = currentLesson.value.id;
    let currentChapterId = null;

    for (const chapter of courseStructure.value) {
      if (chapter.lessons?.some((l) => l.id === lessonId)) {
        currentChapterId = chapter.id;
        break;
      }
    }

    // BƯỚC 3: Lưu vào LocalStorage làm bản backup
    if (currentChapterId) {
      localStorage.setItem("savedChapterId", currentChapterId);
    }

    // BƯỚC 4: Chuyển hướng sang trang tạo nội dung chương (Sections)
    router.push({
      path: `/admin/lesson/${lessonId}/sections`,
      query: { chapterId: currentChapterId },
    });
  } catch (error) {
    console.error("Lỗi luồng lưu và chuyển trang:", error);
    alert(
      "Hệ thống SkyLink: Không thể lưu bài học. Vui lòng kiểm tra lại kết nối!",
    );
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
// Hàm mô phỏng
const isPickingLocation = ref(false);
const displayHotspots = computed(() => {
  if (!currentLesson.value || !currentLesson.value.hotspots) return [];

  // Trả về toàn bộ danh sách hotspots để hiển thị tất cả các điểm cùng lúc
  return currentLesson.value.hotspots.map((spot, index) => {
    return {
      ...spot,
      // Có thể thêm thuộc tính để Component 3D đổi màu điểm đang được chọn/sửa
      isActive:
        index === editingIndex.value ||
        (editingIndex.value === null &&
          index === currentLesson.value.hotspots.length - 1 &&
          isPickingLocation.value),
    };
  });
});
// 1. Thêm điểm mới: Push vào mảng và cho phép chọn tọa độ ngay
const addHotspot = () => {
  if (!currentLesson.value) return;

  const newSpot = {
    title: "Linh kiện mới",
    desc: "",
    pos: { x: 0, y: 0, z: 0 },
    isNew: true,
  };

  currentLesson.value.hotspots.push(newSpot);
  // Kích hoạt chế độ sửa cho phần tử vừa thêm (phần tử cuối cùng)
  editingIndex.value = currentLesson.value.hotspots.length - 1;
  isPickingLocation.value = true;
};

// 2. Bắt đầu sửa một điểm (Focus camera và bật chế độ nhận tọa độ)
const startEditSpot = (index) => {
  editingIndex.value = index;
  isPickingLocation.value = true; // Bật trạng thái cho phép pick lại tọa độ
  const spot = currentLesson.value.hotspots[index];
  focusOnSpot(spot);
};

// 3. XỬ LÝ TỌA ĐỘ TỪ 3D (Cực kỳ quan trọng)
const handlePickCoords = (coords) => {
  if (!isPickingLocation.value || !currentLesson.value) return;

  const spots = currentLesson.value.hotspots;
  // Lấy điểm cuối cùng đang được thêm hoặc điểm đang sửa
  const targetIndex =
    editingIndex.value !== null ? editingIndex.value : spots.length - 1;

  if (spots[targetIndex]) {
    spots[targetIndex].pos = {
      x: coords.x,
      y: coords.y,
      z: coords.z,
    };
    // Ép Vue cập nhật lại mảng để Marker trên 3D nhảy sang vị trí mới
    currentLesson.value.hotspots = [...spots];
  }
};

// 4. Hoàn tất chỉnh sửa
const finishEditing = () => {
  editingIndex.value = null;
  isPickingLocation.value = false; // Tắt chế độ pick
};

// 5. Xóa điểm
const removeHotspot = (index) => {
  if (confirm("Xác nhận gỡ bỏ linh kiện này?")) {
    currentLesson.value.hotspots.splice(index, 1);
    if (editingIndex.value === index) editingIndex.value = null;
  }
};

// 6. Xoay camera tới điểm linh kiện
const focusOnSpot = (spot) => {
  if (uavViewerRef.value) uavViewerRef.value.flyToSpot(spot);
};

//  ToggleEvent
const toggleSimulation = () => {
  if (currentLesson.value) {
    currentLesson.value.hasSimulation = !currentLesson.value.hasSimulation;

    // Nếu tắt mô phỏng, xóa các trạng thái đang chấm dở
    if (!currentLesson.value.hasSimulation) {
      latestPickedCoords.value = null;
      editingIndex.value = null;
      isPickingLocation.value = false;
    }
  }
};
//  Upload model 3D
// 1. Hàm Upload Model 3D (.glb)
const handleModelUpload = async (event) => {
  const file = event.target.files[0];
  if (!file || !currentLesson.value) return;

  try {
    isModelUploading.value = true;
    const url = await uploadFile(file, "model3d"); // Sử dụng hàm uploadFile dùng chung
    if (url) {
      currentLesson.value.model3DPath = url;
      toast.success("Đã tải mô hình 3D lên thành công!");
    }
  } catch (error) {
    console.error("Lỗi upload model:", error);
    toast.error("Không thể tải mô hình lên server.");
  } finally {
    isModelUploading.value = false;
  }
};

// 2. Hàm Xóa Media (Video/Model)
const clearMedia = (type) => {
  if (!currentLesson.value) return;

  if (type === "model") {
    if (
      confirm(
        "Xóa mô hình 3D sẽ làm mất toàn bộ các điểm linh kiện đã chấm. Bạn chắc chứ?",
      )
    ) {
      currentLesson.value.model3DPath = null;
      currentLesson.value.hotspots = []; // Reset luôn danh sách điểm
    }
  }
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
      <nav
        class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2"
      >
        <span
          class="hover:text-[#0b1f3f] cursor-pointer"
          @click="router.push('/admin/dashboard')"
          >Hệ thống</span
        >
        <ChevronRight class="w-3 h-3" />
        <span
          class="hover:text-[#0b1f3f] cursor-pointer"
          @click="router.push('/admin/course/add')"
          >Khóa học UAV</span
        >
        <ChevronRight class="w-3 h-3" />
        <span class="text-[#0b1f3f]">Nội dung bài học</span>
      </nav>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div v-if="currentLesson" class="lg:col-span-9 space-y-6">
          <div class="flex items-center justify-between mb-6 px-2">
            <div class="flex items-center gap-4">
              <button
                @click="goToCourseStructure"
                class="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-[#0b1f3f] transition-all group shadow-sm"
                title="Quay lại cấu trúc khóa học"
              >
                <ArrowLeft
                  class="w-5 h-5 text-slate-400 group-hover:text-[#0b1f3f]"
                />
              </button>

              <div>
                <h1
                  class="text-xl font-black text-[#0b1f3f] uppercase tracking-tight"
                >
                  Chi tiết nội dung
                </h1>
                <p
                  class="text-[10px] text-slate-400 font-bold uppercase tracking-widest"
                >
                  Cấu hình Video, Tài liệu & 3D
                </p>
              </div>
            </div>
            <!-- Trang chuyển đến tạo nội dung bài giảng -->
            <button
              @click="saveAndGoToSections"
              class="flex items-center gap-3 px-6 py-3 bg-[#0b1f3f] text-white rounded-2xl hover:bg-[#162e54] transition-all shadow-lg hover:shadow-[#0b1f3f]/20 active:scale-95"
            >
              <div class="text-left">
                <!-- <span
                  class="block text-[10px] font-black uppercase opacity-60 leading-none"
                  >Chuyển đến</span
                > -->
                <span class="block text-xs font-bold uppercase tracking-wide"
                  >Tạo nội dung chương</span
                >
              </div>
            </button>
          </div>

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
                  class="text-[10px] font-black text-[#4a4a4a] uppercase tracking-widest block"
                >
                  Bài giảng Video
                </label>

                <input
                  type="file"
                  ref="fileInput"
                  class="hidden"
                  accept="video/*"
                  @change="handleVideoUpload"
                />

                <div
                  class="w-full relative aspect-video rounded-xl border-2 border-dashed border-[#0b1f3f] overflow-hidden bg-[#f8f9fa] group/player"
                >
                  <div
                    v-if="isVideoUploading"
                    class="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 z-10"
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

                  <iframe
                    v-else-if="isYouTubeVideo && youtubeEmbedUrl"
                    :src="youtubeEmbedUrl"
                    class="w-full h-full absolute inset-0 z-0"
                    frameborder="0"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                    "
                    allowfullscreen
                  ></iframe>

                  <video
                    v-else-if="videoSource && !isYouTubeVideo"
                    :src="videoSource"
                    controls
                    class="w-full h-full object-contain absolute inset-0 z-0 bg-black"
                  ></video>

                  <div
                    v-else
                    @click="fileInput.click()"
                    class="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all z-0"
                  >
                    <Video class="w-10 h-10 text-slate-300 mb-4" />
                    <p class="text-[11px] text-slate-500 font-bold">
                      Kéo thả video hoặc nhấn để chọn file
                    </p>
                  </div>

                  <div
                    v-if="currentLesson.videoUrl && !isVideoUploading"
                    class="absolute top-4 right-4 opacity-0 group-hover/player:opacity-100 flex gap-2 z-20 transition-opacity"
                  >
                    <button
                      @click="fileInput.click()"
                      class="p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-lg text-white transition-all"
                      title="Tải file khác"
                    >
                      <RefreshCw class="w-4 h-4" />
                    </button>
                    <button
                      @click="removeVideo"
                      class="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white transition-all"
                      title="Xóa video"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div class="relative mt-4">
                  <Youtube
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-red-500"
                    :size="18"
                  />
                  <input
                    v-model="currentLesson.videoUrl"
                    type="text"
                    placeholder="Hoặc dán link Youtube vào đây..."
                    class="w-full pl-10 pr-4 py-3 bg-white border border-[#dee2e6] rounded-xl focus:border-[#0b1f3f] outline-none text-sm transition-all shadow-sm"
                  />
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
                  @click="resourceInput.click()"
                  class="w-full aspect-video border-2 border-dashed border-[#0b1f3f] rounded-xl flex flex-col items-center justify-center bg-[#f8f9fa] cursor-pointer hover:bg-white transition-all shadow-sm"
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
                      class="flex items-center justify-between p-3 bg-white border border-[#dee2e6] rounded-xl shadow-sm"
                    >
                      <div class="flex items-center gap-3">
                        <div class="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                          <FileText class="w-4 h-4" />
                        </div>
                        <span
                          class="text-[11px] font-bold text-[#1a1a1a] truncate max-w-[180px]"
                        >
                          {{ file.name }}
                        </span>
                      </div>
                      <button
                        @click="removeResource(index)"
                        class="p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
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
          :active-lesson-id="activeLessonId"
          status="Nháp"
          @select-lesson="selectLesson"
          @add-chapter="handleAddChapter"
          @add-lesson="handleAddLesson"
          @remove-item="handleRemoveItem"
        ></LessonStructure>
      </div>
      <!-- Trường hợp nếu bài giảng có mô phỏng 3D -->
      <div v-if="currentLesson">
        <section
          class="bg-white rounded-xl border border-[#dee2e6] overflow-hidden shadow-sm mt-6"
        >
          <div
            class="px-8 py-5 border-b border-[#dee2e6] flex justify-between items-center bg-[#fcfcfc]"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-[#0b1f3f]/5 rounded-lg">
                <Box class="w-5 h-5 text-[#0b1f3f]" />
              </div>
              <h3
                class="text-sm font-black text-[#0b1f3f] uppercase tracking-widest"
              >
                Cấu hình Mô phỏng 3D
              </h3>
            </div>

            <div class="flex items-center gap-4">
              <button
                v-if="currentLesson.hasSimulation"
                @click="modelInput.click()"
                class="text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-sm"
                :class="
                  currentLesson.model3DPath
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-teal-600 text-white'
                "
              >
                <RefreshCw v-if="currentLesson.model3DPath" class="w-3 h-3" />
                <UploadCloud v-else class="w-3 h-3" />
                {{ currentLesson.model3DPath ? "Đổi file" : "Tải Model" }}
              </button>

              <button
                v-if="currentLesson.hasSimulation && currentLesson.model3DPath"
                @click="addHotspot"
                class="text-[10px] font-black uppercase bg-teal-50 text-teal-700 px-4 py-2 rounded-xl hover:bg-teal-100 flex items-center gap-2"
              >
                <Plus class="w-3 h-3" /> Thêm điểm
              </button>

              <button
                @click="toggleSimulation"
                :class="[
                  'w-12 h-6 rounded-full transition-all relative p-1',
                  currentLesson.hasSimulation ? 'bg-[#0b1f3f]' : 'bg-slate-300',
                ]"
              >
                <div
                  :class="[
                    'w-4 h-4 bg-white rounded-full transition-all shadow-sm',
                    currentLesson.hasSimulation
                      ? 'translate-x-6'
                      : 'translate-x-0',
                  ]"
                ></div>
              </button>
            </div>
          </div>

          <div class="p-8">
            <div
              v-if="currentLesson.hasSimulation"
              class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div class="lg:col-span-8">
                <div
                  class="relative group border-2 border-[#0b1f3f] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-video flex items-center justify-center"
                >
                  <template v-if="currentLesson.model3DPath">
                    <Uav3DViewer
                      ref="uavViewerRef"
                      :admin="true"
                      :modelSrc="`http://localhost:5000${currentLesson.model3DPath}`"
                      :customHotspots="displayHotspots"
                      :currentMarkerId="null"
                      @pick-coords="handlePickCoords"
                    />

                    <div
                      v-if="isPickingLocation"
                      class="absolute inset-0 pointer-events-none border-4 border-teal-500/30 animate-pulse z-10"
                    ></div>

                    <button
                      @click="clearMedia('model')"
                      class="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </template>

                  <div
                    v-else
                    @click="modelInput.click()"
                    class="flex flex-col items-center justify-center cursor-pointer text-center p-12"
                  >
                    <Box class="w-16 h-16 text-slate-700 mb-4" />
                    <h4
                      class="text-white text-lg font-black uppercase tracking-tight"
                    >
                      Chưa có mô hình 3D
                    </h4>
                    <p
                      class="text-slate-500 text-[10px] font-bold uppercase mt-2"
                    >
                      Nhấn để tải lên file .glb
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="lg:col-span-4 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
              >
                <div
                  v-if="currentLesson.hotspots.length === 0"
                  class="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50"
                >
                  <MapPin class="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p class="text-[10px] text-slate-400 font-bold uppercase">
                    Chưa có linh kiện
                  </p>
                </div>

                <div
                  v-for="(spot, index) in currentLesson.hotspots"
                  :key="index"
                  :class="[
                    'p-4 rounded-2xl border transition-all relative group mb-4',
                    editingIndex === index
                      ? 'border-teal-500 bg-teal-50/30 ring-4 ring-teal-500/10 shadow-lg'
                      : 'bg-white border-slate-100 hover:border-[#0b1f3f]',
                  ]"
                >
                  <div class="absolute top-3 right-3 flex gap-1.5">
                    <button
                      v-if="editingIndex === index"
                      @click="finishEditing"
                      class="p-1.5 bg-teal-500 text-white rounded-lg shadow-sm hover:bg-teal-600 transition-all"
                    >
                      <Check :size="12" />
                    </button>
                    <button
                      v-else
                      @click="startEditSpot(index)"
                      class="p-1.5 text-slate-400 hover:text-[#0b1f3f] bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Edit3 :size="12" />
                    </button>
                    <button
                      @click="removeHotspot(index)"
                      class="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 :size="12" />
                    </button>
                  </div>

                  <div class="flex items-center gap-2 mb-3">
                    <span
                      class="w-5 h-5 bg-[#0b1f3f] text-white text-[9px] font-black rounded flex items-center justify-center shadow-sm"
                    >
                      {{ index + 1 }}
                    </span>
                    <input
                      v-model="spot.title"
                      class="bg-transparent font-black text-[11px] text-[#0b1f3f] uppercase outline-none border-b border-transparent focus:border-[#0b1f3f] flex-1"
                      placeholder="Tên linh kiện..."
                    />
                  </div>

                  <div
                    @click="startEditSpot(index)"
                    class="grid grid-cols-3 gap-1.5 cursor-crosshair mb-3"
                    title="Sửa vị trí"
                  >
                    <div
                      v-for="(val, axis) in spot.pos"
                      :key="axis"
                      class="bg-white px-1 py-1.5 rounded-lg border border-slate-100 text-[9px] text-center font-mono"
                    >
                      <span class="text-slate-300 mr-0.5 uppercase"
                        >{{ axis }}:</span
                      >
                      <span class="font-bold">{{ val.toFixed(2) }}</span>
                    </div>
                  </div>

                  <textarea
                    v-model="spot.desc"
                    rows="1"
                    class="w-full p-2 bg-slate-50/50 border border-slate-100 rounded-lg text-[10px] outline-none focus:border-[#0b1f3f] resize-none"
                    placeholder="Ghi chú linh kiện..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            ref="modelInput"
            class="hidden"
            accept=".glb,.gltf"
            @change="handleModelUpload"
          />
        </section>
      </div>
      <div v-else class="">Vui lòng chọn bài học</div>
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
