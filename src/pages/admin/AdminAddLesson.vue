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
import api from "@/utils/apis/axios";

// --- 1. STATE ---
const chapters = ref([]); // Cấu trúc: [{ _id, title, lessons: [{ _id, title, sections: [] }] }]
const activeLessonId = ref(null);
const expandedSections = ref([0]);
const toasts = ref([]);
const isLoading = ref(false);

// --- 2. LOAD DATA ---
const fetchCourseData = async () => {
  try {
    const { data } = await api.get("/courses");
    chapters.value = data;
    // Tự động chọn bài đầu tiên nếu có
    if (chapters.value[0]?.lessons?.[0]) {
      activeLessonId.value = chapters.value[0].lessons[0]._id;
    }
  } catch (error) {
    addToast("Lỗi kết nối máy chủ!", "error");
  }
};

onMounted(fetchCourseData);

// --- 3. COMPUTED (TRUY XUẤT NHANH) ---
const currentLesson = computed(() => {
  for (const chapter of chapters.value) {
    const lesson = chapter.lessons?.find((l) => l._id === activeLessonId.value);
    if (lesson) return lesson;
  }
  return null;
});

const stats = computed(() => ({
  chapters: chapters.value.length,
  lessons: chapters.value.reduce(
    (acc, cur) => acc + (cur.lessons?.length || 0),
    0,
  ),
}));

// --- 4. ACTIONS (LOCAL FIRST - LƯU SAU) ---

const addNewChapter = () => {
  const newChapter = {
    _id: `temp_${Date.now()}`,
    title: "Chương mới",
    order: chapters.value.length + 1,
    lessons: [],
  };
  chapters.value.push(newChapter);
  addToast("Đã thêm chương tạm thời");
};

// --- Cập nhật hàm tạo Lesson mới ---
const addNewLesson = (cIdx) => {
  const newId = `temp_${Date.now()}`;
  const newLesson = {
    _id: newId,
    title: "Bài giảng mới",
    order: chapters.value[cIdx].lessons.length + 1,
    // DỮ LIỆU 3D ĐƯỢC ĐẶT Ở ĐÂY
    model3DPath: null,
    hotspots: [],
    sections: [], // Các khối văn bản bên trong
  };
  chapters.value[cIdx].lessons.push(newLesson);
  activeLessonId.value = newId;
};

// --- Logic xử lý Hotspot cho Lesson đang chọn ---
const addHotspotToLesson = () => {
  if (!currentLesson.value) return;
  if (!currentLesson.value.hotspots) currentLesson.value.hotspots = [];

  currentLesson.value.hotspots.push({
    id: currentLesson.value.hotspots.length + 1,
    title: "Linh kiện mới",
    desc: "",
    pos: { x: 0, y: 0, z: 0 },
  });
  addToast("Đã thêm điểm chạm, hãy click vào Model để lấy tọa độ", "success");
};

// --- Hàm Upload File 3D cho Lesson ---
const handleLesson3DUpload = async (event) => {
  const file = event.target.files[0];
  if (!file || !currentLesson.value) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    isLoading.value = true;
    const { data } = await api.post("/courses/upload", formData);
    currentLesson.value.model3DPath = data.url;
    addToast("Tải lên mô hình thành công!");
  } catch (error) {
    addToast("Lỗi upload 3D", "error");
  } finally {
    isLoading.value = false;
  }
};
const addSection = (type) => {
  if (!currentLesson.value) return;
  const newSection = {
    _id: `temp_${Date.now()}`,
    type: type === "text" ? "theory" : "3d_model",
    title: type === "text" ? "Khối văn bản" : "Mô hình 3D",
    content: type === "text" ? "" : { url: "", caption: "" },
    order: currentLesson.value.sections.length + 1,
  };
  currentLesson.value.sections.push(newSection);
};

// --- ACTIONS ĐỒNG BỘ ---

// 1. Hàm xóa Section thực tế trên DB khi nhấn nút thùng rác
const removeSection = async (index, sectionId) => {
  if (!String(sectionId).startsWith("temp_")) {
    try {
      // Gọi API xóa thật nếu không phải hàng tạm
      await api.delete(`/courses/sections/${sectionId}`);
      addToast("Đã xóa nội dung khỏi máy chủ", "success");
    } catch (error) {
      addToast("Không thể xóa nội dung trên máy chủ", "error");
      return; // Không xóa ở local nếu BE lỗi
    }
  }
  currentLesson.value.sections.splice(index, 1);
};

// 2. Hàm TỔNG: Lưu toàn bộ thay đổi
const handlePublish = async () => {
  try {
    isLoading.value = true;
    console.log("🚀 Bắt đầu quá trình đồng bộ dữ liệu...");

    for (const chapter of chapters.value) {
      let cId = chapter._id;

      // --- A. XỬ LÝ CHAPTER ---
      if (String(cId).startsWith("temp_")) {
        const res = await api.post("/courses", {
          title: chapter.title,
          order: chapter.order,
        });
        cId = res.data._id;
        chapter._id = cId; // Cập nhật lại ID thật cho local
      } else {
        await api.put(`/courses/${cId}`, {
          title: chapter.title,
          order: chapter.order,
        });
      }

      // --- B. XỬ LÝ LESSONS ---
      for (const lesson of chapter.lessons) {
        const lessonData = {
          title: lesson.title,
          order: lesson.order,
          model3DPath: lesson.model3DPath, // Mới thêm
          hotspots: lesson.hotspots, // Mới thêm
        };

        if (String(lId).startsWith("temp_")) {
          const res = await api.post(`/courses/${cId}/lessons`, lessonData);
          lId = res.data._id;
          lesson._id = lId;
        } else {
          await api.put(`/courses/lessons/${lId}`, lessonData);
        }

        // --- C. XỬ LÝ SECTIONS ---
        for (const section of lesson.sections) {
          // Chỉ lấy dữ liệu sạch, không gửi _id tạm hoặc _id thật trong body
          const { _id, ...cleanData } = section;

          if (String(section._id).startsWith("temp_")) {
            console.log(`+ Tạo mới Section: ${section.title}`);
            const res = await api.post(
              `/courses/lessons/${lId}/sections`,
              cleanData,
            );
            section._id = res.data._id; // Gán lại ID thật để lần sau nó rơi vào nhánh Update
          } else {
            console.log(`~ Cập nhật Section: ${section.title}`);
            await api.put(`/courses/sections/${section._id}`, cleanData);
          }
        }
      }
    }

    addToast("Tất cả thay đổi đã được lưu vĩnh viễn!");
    await fetchCourseData(); // Tải lại cây dữ liệu để đồng bộ hoàn toàn
  } catch (error) {
    console.error("❌ Lỗi hệ thống:", error.response?.data || error.message);
    addToast("Lỗi khi đồng bộ! Kiểm tra Console.", "error");
  } finally {
    isLoading.value = false;
  }
};

const addToast = (msg, type = "success") => {
  const id = Date.now();
  toasts.value.push({ id, msg, type });
  setTimeout(
    () => (toasts.value = toasts.value.filter((t) => t.id !== id)),
    3000,
  );
};

const toggleSection = (idx) => {
  const pos = expandedSections.value.indexOf(idx);
  pos > -1
    ? expandedSections.value.splice(pos, 1)
    : expandedSections.value.push(idx);
};

//  HOTSPOTS CHO MÔ HÌNH 3D

import { useToast } from "vue-toastification";
// Đừng quên import component 3D của bạn để xem preview
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import { reactive } from "vue";
const toast = useToast();
const isPickingLocation = ref(false); // Trạng thái đang chọn tọa độ trên bản đồ 3D
const uavViewerRef = ref(null); // Ref để gọi hàm của component con

const removeHotspot = (index) => {
  // 1. Lấy ID của điểm sắp xóa (thường là index + 1)
  const targetId = form.hotspots[index].id;

  // 2. Gọi hàm xóa bên trong Component 3D
  if (uavViewerRef.value) {
    uavViewerRef.value.removeMarkerById(targetId);
  }

  // 3. Xóa khỏi mảng dữ liệu của Form
  form.hotspots.splice(index, 1);

  // 4. (Tùy chọn) Cập nhật lại ID cho các điểm còn lại để số thứ tự luôn liên tục
  form.hotspots.forEach((spot, idx) => {
    const oldId = spot.id;
    spot.id = idx + 1;
    // Nếu muốn marker trên 3D cũng đổi số theo
    toast.error(`Xóa tọa độ thành công.`);
  });
};
// Hàm khi bấm nút "Thêm điểm"
const addHotspot = () => {
  isPickingLocation.value = true;

  // Tạo một điểm mới với tọa độ tạm thời là 0,0,0
  form.hotspots.push({
    id: form.hotspots.length + 1,
    pos: { x: 0, y: 0, z: 0 },
    title: "",
    desc: "",
  });

  // Thông báo cho người dùng click vào bản đồ 3D để chọn vị trí
  toast.success(" Thêm tọa độ thành công", {
    position: "top-right", // Hiển thị ở giữa trên cùng cho dễ thấy
    timeout: 4000, // Tự tắt sau 4 giây
    closeOnClick: true,
    pauseOnHover: true,
  });
};
// Hàm nhận tọa độ từ Uav3DViewer gửi ra
// Trong AddDroneView.vue
const updateLatestHotspot = (coords) => {
  if (!isPickingLocation.value) return; // Nếu không đang ở trạng thái chọn tọa độ thì bỏ qua
  if (form.hotspots.length === 0) return; // Nếu không có điểm nào trong mảng thì cũng bỏ qua
  // Lấy hotspot cuối cùng vừa được thêm
  if (form.hotspots.length > 0) {
    const lastIndex = form.hotspots.length - 1;
    form.hotspots[lastIndex].pos = {
      x: Number(coords.x),
      y: Number(coords.y),
      z: Number(coords.z),
    };
    console.log("Đã cập nhật tọa độ vào form:", form.hotspots[lastIndex].pos);
  }
};
const form = reactive({
  name: "",
  description: "",
  category: "",
  image: null, // Lưu file thực tế
  model3d: null, // Lưu file thực tế
  scale: 15,
  hotspots: [],
  thumbnails: [], // Lưu File thực tế
  video: null, // Lưu File video thực tế
});

// Chứa link tạm thời để hiển thị Preview
const previews = reactive({
  image: null,
  model3d: null,
  thumbnails: [], // Lưu URL tạm thời cho ảnh thư viện
  video: null, // Lưu URL tạm thời cho video
});
// Hàm xử lý upload nhiều ảnh cùng lúc
const handleMultipleImages = (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  files.forEach((file) => {
    form.thumbnails.push(file);
    previews.thumbnails.push(URL.createObjectURL(file));
  });

  toast.success(`Đã thêm ${files.length} ảnh vào thư viện!`);
};

// Xóa ảnh thumbnail
const removeThumbnail = (index) => {
  URL.revokeObjectURL(previews.thumbnails[index]);
  form.thumbnails.splice(index, 1);
  previews.thumbnails.splice(index, 1);
  toast.error("Đã xóa ảnh khỏi thư viện.");
};
const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  // 1. Lưu file vào form để sau này gửi lên server (API)
  form[type] = file;

  // 2. Tạo URL tạm thời để xem preview
  if (previews[type]) {
    URL.revokeObjectURL(previews[type]); // Giải phóng bộ nhớ cũ
  }
  previews[type] = URL.createObjectURL(file);
};

const handleSave = async () => {
  // Khi gửi lên C# Backend, Phách phải dùng FormData thay vì JSON thông thường
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("imageFile", form.image); // Gửi file
  formData.append("modelFile", form.model3d); // Gửi file
  // ... append các trường khác

  console.log("Sẵn sàng gửi FormData lên API...");
  toast.success("Đã lưu thiết bị mới!");
};
</script>
<template>
  <div
    class="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative"
  >
    <TransitionGroup
      name="list"
      tag="div"
      class="fixed top-5 right-5 z-[100] space-y-3 pointer-events-none"
    >
      <div
        v-for="t in toasts"
        :key="t.id"
        :class="t.type === 'success' ? 'bg-teal-600' : 'bg-red-500'"
        class="pointer-events-auto px-6 py-4 rounded-2xl shadow-2xl text-white flex items-center gap-3"
      >
        <CheckCircle2 v-if="t.type === 'success'" class="w-5 h-5" />
        <AlertCircle v-else class="w-5 h-5" />
        <span class="text-xs font-black uppercase">{{ t.msg }}</span>
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
          <LayoutDashboard class="w-5 h-5 text-teal-600" /> UAV CMS PRO
        </h1>
      </div>
      <button
        @click="handlePublish"
        :disabled="isLoading"
        class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-xl disabled:opacity-50"
      >
        {{ isLoading ? "ĐANG ĐỒNG BỘ..." : "CẬP NHẬT HỆ THỐNG" }}
      </button>
    </header>

    <div class="flex-1 overflow-hidden flex">
      <aside class="w-[260px] border-r border-slate-200 bg-white flex flex-col">
        <div class="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3
            class="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600"
          >
            Cấu trúc nội dung
          </h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase mt-1">
            {{ stats.chapters }} Chương • {{ stats.lessons }} Bài
          </p>
          <button
            @click="addNewChapter"
            class="w-full mt-4 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
          >
            <Plus class="w-4 h-4" /> Thêm chương mới
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          <div
            v-for="(chapter, cIdx) in chapters"
            :key="chapter._id"
            class="rounded-3xl border border-slate-100 bg-white overflow-hidden"
          >
            <div
              @click="toggleSection(cIdx)"
              class="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black"
                >
                  {{ cIdx + 1 }}
                </div>
                <input
                  v-model="chapter.title"
                  @click.stop
                  class="bg-transparent text-[11px] font-black uppercase text-slate-800 outline-none w-40"
                />
              </div>
              <ChevronDown
                :class="{ 'rotate-180': expandedSections.includes(cIdx) }"
                class="w-4 h-4 transition-transform"
              />
            </div>

            <div
              v-show="expandedSections.includes(cIdx)"
              class="px-3 pb-4 space-y-1 bg-slate-50/50"
            >
              <div
                v-for="lesson in chapter.lessons"
                :key="lesson._id"
                @click="activeLessonId = lesson._id"
                :class="
                  activeLessonId === lesson._id
                    ? 'bg-white shadow-sm ring-1 ring-teal-500/10'
                    : 'hover:bg-white/40'
                "
                class="p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <Play
                    :class="
                      activeLessonId === lesson._id
                        ? 'text-teal-500 fill-current'
                        : 'text-slate-300'
                    "
                    class="w-3 h-3"
                  />
                  <span class="text-[11px] font-bold text-slate-600 truncate">{{
                    lesson.title
                  }}</span>
                </div>
              </div>
              <button
                @click="addNewLesson(cIdx)"
                class="w-full py-2 mt-2 text-[9px] font-black text-teal-600 uppercase border border-dashed border-teal-200 rounded-lg"
              >
                + Thêm bài giảng
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main
        v-if="currentLesson"
        class="flex-1 bg-[#FBFBFB] p-8 overflow-y-auto custom-scrollbar"
      >
        <div class="max-w-4xl mx-auto space-y-12">
          <section
            class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
          >
            <h2
              class="text-xl font-bold text-slate-800 flex items-center gap-3 mb-8"
            >
              <Box class="text-teal-500" /> 1. Thông tin bài giảng
            </h2>
            <div class="space-y-6">
              <div>
                <label
                  class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                  >Tiêu đề bài giảng</label
                >
                <input
                  v-model="currentLesson.title"
                  type="text"
                  class="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 mt-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>
          </section>

          <section class="space-y-6">
            <div class="flex items-center justify-between">
              <h2
                class="text-xl font-bold text-slate-800 flex items-center gap-3"
              >
                <Zap class="text-amber-500" /> 2. Nội dung chi tiết
              </h2>
              <div class="flex gap-2">
                <button
                  @click="addSection('text')"
                  class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black hover:bg-slate-50"
                >
                  Thêm chương
                </button>
                <button
                  @click="addSection('3d')"
                  class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black hover:bg-slate-50"
                >
                  Thêm ảnh
                </button>
              </div>
            </div>

            <div
              v-for="(sec, index) in currentLesson.sections"
              :key="sec._id"
              class="bg-white rounded-3xl p-8 border border-slate-100 relative group mb-6 shadow-sm hover:border-teal-200 transition-all"
            >
              <button
                @click="removeSection(index, sec._id)"
                class="absolute -right-2 -top-2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                <Trash2 class="w-4 h-4" />
              </button>

              <div class="space-y-4">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-1 h-8 bg-teal-500 rounded-full"></div>
                  <div class="flex-1">
                    <label
                      class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1"
                    >
                      Tiêu đề mục #{{ index + 1 }} ({{
                        sec.type === "theory" ? "Văn bản" : "3D"
                      }})
                    </label>
                    <input
                      v-model="sec.title"
                      type="text"
                      placeholder="Nhập tên mục (Ví dụ: Giới thiệu chung, Video thực hành...)"
                      class="w-full bg-transparent border-b border-slate-100 py-2 text-sm font-bold text-slate-700 outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div v-if="sec.type === 'theory'">
                  <QuillEditor
                    v-model:content="sec.content"
                    contentType="html"
                    theme="snow"
                    placeholder="Nhập nội dung kiến thức chi tiết tại đây..."
                  />
                </div>
              </div>
            </div>
          </section>
          <h2 class="text-xl font-bold text-slate-800 flex items-center gap-3">
            <Zap class="text-amber-500" /> 3. Tọa độ & Mô hình 3D
          </h2>
          <div class="flex gap-6 items-start">
            <!-- Gán tọa độ -->
            <section
              class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5"
            >
              <div
                class="flex justify-between items-center border-b border-slate-50 pb-4"
              >
                <h3
                  class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2"
                >
                  <MapPin :size="16" class="text-teal-500" /> Gán tọa độ cho mô
                  hình
                </h3>
                <button
                  @click="addHotspot"
                  class="text-[10px] font-black uppercase bg-teal-50 text-teal-700 px-4 py-2 rounded-xl hover:bg-teal-100 transition-colors"
                >
                  + Thêm điểm
                </button>
              </div>

              <div
                v-if="form.hotspots.length === 0"
                class="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl"
              >
                <p class="text-sm text-slate-400 italic">
                  Chưa có điểm nào. Nhấn nút thêm để bắt đầu chọn tọa độ.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="(spot, index) in form.hotspots"
                  :key="index"
                  class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group transition-all hover:border-teal-200"
                >
                  <button
                    @click="removeHotspot(index)"
                    class="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 :size="16" />
                  </button>
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="w-6 h-6 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                      >{{ index + 1 }}</span
                    >
                    <input
                      v-model="spot.title"
                      placeholder="Tiêu đề điểm..."
                      class="bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-teal-300 w-full"
                    />
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <div
                      class="bg-white p-2 rounded-lg border border-slate-100 text-[10px] text-center font-mono"
                    >
                      <span class="text-slate-400">X:</span>
                      {{ spot.pos.x.toFixed(2) }}
                    </div>
                    <div
                      class="bg-white p-2 rounded-lg border border-slate-100 text-[10px] text-center font-mono"
                    >
                      <span class="text-slate-400">Y:</span>
                      {{ spot.pos.y.toFixed(2) }}
                    </div>
                    <div
                      class="bg-white p-2 rounded-lg border border-slate-100 text-[10px] text-center font-mono"
                    >
                      <span class="text-slate-400">Z:</span>
                      {{ spot.pos.z.toFixed(2) }}
                    </div>
                  </div>
                  <textarea
                    v-model="spot.desc"
                    placeholder="Mô tả kỹ thuật..."
                    rows="2"
                    class="w-full p-2.5 bg-white border border-slate-100 rounded-xl text-xs outline-none focus:border-teal-300 resize-none"
                  ></textarea>
                </div>
              </div>
            </section>
            <!-- Mô hình 3D -->
            <section
              class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex-1"
            >
              <h3
                class="font-black text-slate-800 text-xs uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-50 pb-4"
              >
                <Box :size="16" class="text-teal-500" /> Mô hình 3D (.GLB)
              </h3>
              <div
                class="h-80 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-slate-800 shadow-inner group"
              >
                <template v-if="previews.model3d">
                  <Uav3DViewer
                    ref="uavViewerRef"
                    :admin="true"
                    :modelSrc="previews.model3d"
                    :currentMarkerId="
                      form.hotspots.length > 0 ? form.hotspots.length : 0
                    "
                    @pick-coords="updateLatestHotspot"
                  />
                  <div
                    class="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none"
                  >
                    <div
                      class="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-bold border border-white/10 uppercase tracking-widest"
                    >
                      Preview Mode
                    </div>
                    <label
                      class="bg-white text-slate-900 px-4 py-1.5 rounded-lg text-[10px] font-black cursor-pointer pointer-events-auto hover:bg-teal-400 transition-colors shadow-xl"
                    >
                      Thay đổi model
                      <input
                        type="file"
                        @change="handleFileUpload($event, 'model3d')"
                        class="hidden"
                        accept=".glb"
                      />
                    </label>
                  </div>
                </template>

                <div v-else class="text-center">
                  <div
                    class="p-4 bg-slate-800 rounded-full inline-block mb-3 text-teal-400 shadow-lg"
                  >
                    <UploadCloud :size="32" />
                  </div>
                  <p class="text-white font-bold text-sm">Chưa có mô hình 3D</p>
                  <p class="text-slate-500 text-[10px] mt-1">
                    Hỗ trợ định dạng .GLB
                  </p>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'model3d')"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".glb"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <main v-else class="flex-1 flex items-center justify-center bg-slate-50">
        <div class="text-center">
          <div
            class="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Play class="w-8 h-8 text-slate-400" />
          </div>
          <p class="text-slate-400 font-bold uppercase tracking-widest text-sm">
            Chọn bài giảng để bắt đầu biên tập
          </p>
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
