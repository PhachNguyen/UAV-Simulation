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

/** --- 1. STATE QUẢN LÝ --- **/
const isLoading = ref(false);
const courseStructure = ref([]);
const activeLessonId = ref(null);
const uploadProgress = ref(0);
const isVideoUploading = ref(false);

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
  // Nếu không ở chế độ picking hoặc không có bài học thì thoát
  if (!isPickingLocation.value || !currentLesson.value) return;

  const spots = currentLesson.value.hotspots;
  // Xác định index cần cập nhật (ưu tiên editingIndex)
  const targetIndex =
    editingIndex.value !== null ? editingIndex.value : spots.length - 1;

  if (spots[targetIndex]) {
    spots[targetIndex].pos = {
      x: Number(coords.x),
      y: Number(coords.y),
      z: Number(coords.z),
    };
    // Ép Vue cập nhật lại mảng để render lại marker trên 3D
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

    // Nếu tắt mô phỏng, có thể xóa tọa độ đang chấm dở
    if (!currentLesson.value.hasSimulation) {
      latestPickedCoords.value = null;
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
      <!-- Trường hợp nếu bài giảng có mô phỏng 3D -->
      <div v-if="currentLesson">
        <section
          class="bg-white rounded-xl border border-[#dee2e6] overflow-hidden shadow-sm font-inter mt-6"
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
                @click="addHotspot"
                class="text-[10px] font-black uppercase bg-teal-50 text-teal-700 px-4 py-2 rounded-xl hover:bg-teal-100 transition-all flex items-center gap-2"
              >
                <Plus class="w-3 h-3" /> Thêm điểm
              </button>

              <button
                @click="
                  currentLesson.hasSimulation = !currentLesson.hasSimulation
                "
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
              <div class="lg:col-span-7 xl:col-span-8 space-y-4">
                <div
                  class="relative group border-2 border-[#0b1f3f] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-video"
                >
                  <Uav3DViewer
                    ref="uavViewerRef"
                    :admin="true"
                    :modelSrc="`http://localhost:5000${currentLesson.model3DPath}`"
                    :customHotspots="displayHotspots"
                    :currentMarkerId="null"
                    @pick-coords="handlePickCoords"
                  />

                  <div
                    v-if="editingIndex !== null"
                    class="absolute inset-0 pointer-events-none border-4 border-teal-500/30 animate-pulse"
                  ></div>

                  <div
                    class="absolute top-4 left-4 pointer-events-none bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                  >
                    <p
                      class="text-[9px] text-white font-black uppercase tracking-widest flex items-center gap-2"
                    >
                      <span
                        :class="[
                          'w-2 h-2 rounded-full animate-pulse',
                          editingIndex !== null ? 'bg-teal-400' : 'bg-red-500',
                        ]"
                      ></span>
                      {{
                        editingIndex !== null
                          ? `Chỉnh sửa điểm ${editingIndex + 1}: Click lên model`
                          : "Chế độ Admin"
                      }}
                    </p>
                  </div>
                </div>

                <p
                  class="text-[10px] text-slate-400 font-bold uppercase tracking-tight text-center"
                >
                  Mẹo: Click chuột trái để xoay, con lăn để zoom
                </p>
              </div>

              <div
                class="lg:col-span-5 xl:col-span-4 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
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
                      >{{ index + 1 }}</span
                    >
                    <input
                      v-model="spot.title"
                      class="bg-transparent font-black text-[11px] text-[#0b1f3f] uppercase outline-none border-b border-transparent focus:border-[#0b1f3f] flex-1"
                      placeholder="Tên..."
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
                    placeholder="Ghi chú..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div
              v-else
              class="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30"
            >
              <Box class="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p
                class="text-xs text-slate-400 font-bold uppercase tracking-widest"
              >
                Trình mô phỏng 3D đang tắt
              </p>
            </div>
          </div>
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
