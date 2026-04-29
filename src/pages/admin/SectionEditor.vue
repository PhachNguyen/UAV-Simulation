<script setup>
import { ref, computed, onMounted } from "vue";
import LessonStructure from "@/components/LessonStructure.vue";
import api from "@/utils/apis/axios";
import { useRouter, useRoute } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import {
  Type,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  RotateCcw,
  ArrowLeft,
  LayoutTemplate,
} from "lucide-vue-next";
import Swal from "sweetalert2";
// --- TRẠNG THÁI (STATE) ---
const activeLessonId = ref(null);
const isLoading = ref(false);
const isSaving = ref(false);
const courseStructure = ref([]);

// Điều hướng
const router = useRouter();
const route = useRoute();
const chapterId = route.query.chapterId;

/** --- 1. API & LẤY DỮ LIỆU --- **/
const fetchCourseData = async () => {
  try {
    isLoading.value = true;
    const { data } = await api.get(`/courses/${chapterId}`);

    courseStructure.value = [data].map((chapter) => ({
      ...chapter,
      lessons: (chapter.lessons || []).map((lesson) => ({
        ...lesson,
        content: lesson.content || "",
        hotspots:
          typeof lesson.hotspots === "string"
            ? JSON.parse(lesson.hotspots)
            : lesson.hotspots || [],
        sections: lesson.sections || [],
        resources: lesson.resources || [],
      })),
    }));

    const urlLessonId = parseInt(route.params.id);
    if (urlLessonId) {
      activeLessonId.value = urlLessonId;
    } else if (courseStructure.value[0]?.lessons?.[0]) {
      activeLessonId.value = courseStructure.value[0].lessons[0].id;
    }
  } catch (error) {
    console.error("Lỗi fetch toàn bộ khóa học:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchCourseData);

// --- 2. COMPUTED ---
const currentLesson = computed(() => {
  if (!activeLessonId.value) return null;
  for (const chapter of courseStructure.value) {
    const lesson = chapter.lessons.find((l) => l.id === activeLessonId.value);
    if (lesson) return lesson;
  }
  return null;
});

// --- 3. HÀNH ĐỘNG (METHODS) ---
const selectLesson = (id) => {
  activeLessonId.value = id;
  router.replace(`/admin/lesson/${id}/sections?chapterId=${chapterId}`);
};

const saveChanges = async () => {
  if (!currentLesson.value) return;
  try {
    isSaving.value = true;
    const payload = {
      title: currentLesson.value.title,
      content: currentLesson.value.content,
      sections: currentLesson.value.sections,
      hotspots: currentLesson.value.hotspots,
    };

    const { data } = await api.post(
      `/courses/lessons/${currentLesson.value.id}/save-content`,
      payload,
    );

    currentLesson.value.sections = data.sections;
    alert("Đã lưu nội dung văn bản thành công!");
  } catch (error) {
    console.error(error);
    alert("Lỗi: Không thể lưu dữ liệu.");
  } finally {
    isSaving.value = false;
  }
};

const addSection = () => {
  if (!currentLesson.value) return;
  if (!currentLesson.value.sections) currentLesson.value.sections = [];
  currentLesson.value.sections.push({
    title: "",
    content: "",
  });
};

const removeSection = (index) => {
  if (confirm("Bạn có chắc chắn muốn xóa mục này?")) {
    currentLesson.value.sections.splice(index, 1);
  }
};

/** --- 4. CÁC HÀM SIDEBAR --- **/
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
  selectLesson(data.id);
};

const handleRemoveItem = async ({ cIndex, lIndex }) => {
  // Xác định xem người dùng đang muốn xóa Bài giảng hay xóa cả Chương
  const isLesson = lIndex !== undefined;
  const titleText = isLesson
    ? "Xác nhận xóa Bài giảng?"
    : "Xác nhận xóa Chương học?";
  const warningText = isLesson
    ? "Bài giảng này cùng toàn bộ nội dung bên trong sẽ bị xóa. Bạn chắc chắn chứ?"
    : "CẢNH BÁO: Xóa chương sẽ xóa toàn bộ bài giảng trực thuộc! Bạn không thể hoàn tác.";

  // 1. Hiển thị hộp thoại xác nhận
  const result = await Swal.fire({
    title: titleText,
    text: warningText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1a2b4c", // Màu Navy đồng bộ hệ thống
    cancelButtonColor: "#64748b", // Màu Slate
    confirmButtonText: "Đồng ý xóa",
    cancelButtonText: "Hủy bỏ",
    reverseButtons: true,
    customClass: {
      popup: "rounded-2xl",
      confirmButton: "rounded-lg px-5 py-2.5 text-sm font-semibold",
      cancelButton: "rounded-lg px-5 py-2.5 text-sm font-semibold",
    },
  });

  // 2. Xử lý sau khi người dùng xác nhận
  if (result.isConfirmed) {
    try {
      Swal.showLoading(); // Hiện hiệu ứng loading trong lúc chờ API

      const chapter = courseStructure.value[cIndex];

      // Gọi API xóa và cập nhật state FE
      if (isLesson) {
        await api.delete(`/courses/lessons/${chapter.lessons[lIndex].id}`);
        chapter.lessons.splice(lIndex, 1);
      } else {
        await api.delete(`/courses/${chapter.id}`);
        courseStructure.value.splice(cIndex, 1);
      }

      // 3. Thông báo thành công
      Swal.fire({
        title: "Đã xóa!",
        text: isLesson
          ? "Bài giảng đã được gỡ bỏ thành công."
          : "Chương học đã được gỡ bỏ thành công.",
        icon: "success",
        confirmButtonColor: "#1a2b4c",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Lỗi xóa nội dung:", error);
      Swal.fire({
        title: "Thất bại!",
        text: "Đã xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại.",
        icon: "error",
        confirmButtonColor: "#1a2b4c",
      });
    }
  }
};
</script>

<template>
  <div
    class="h-screen bg-gray-100 p-4 lg:p-6 flex gap-6 overflow-hidden font-sans"
  >
    <main
      class="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden relative"
    >
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4"
      >
        <RefreshCw class="w-10 h-10 animate-spin text-[#1a2b4c]" />
        <p class="text-gray-500 font-medium">Đang tải dữ liệu bài giảng...</p>
      </div>

      <div v-else-if="currentLesson" class="flex flex-col h-full">
        <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <header class="mb-8">
            <div class="flex items-center gap-4 mb-6">
              <button
                @click="router.back()"
                class="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#1a2b4c] transition-all group shadow-sm cursor-pointer"
                title="Quay lại"
              >
                <ArrowLeft
                  class="w-5 h-5 text-gray-400 group-hover:text-[#1a2b4c] transition-colors"
                />
              </button>
              <div
                class="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-gray-700 rounded-md border border-blue-100"
              >
                <LayoutTemplate :size="16" />
                <span class="text-xs font-bold uppercase tracking-wider">
                  Trình soạn thảo
                </span>
              </div>
            </div>

            <div class="relative group">
              <input
                v-model="currentLesson.title"
                type="text"
                placeholder="Nhập tiêu đề chính của bài giảng..."
                class="w-full text-2xl font-bold text-gray-900 border-b-2 border-gray-200 focus:border-[#1a2b4c] focus:ring-0 p-0 pb-2 transition-all outline-none bg-transparent"
              />
            </div>
          </header>

          <div class="space-y-6">
            <div
              v-for="(section, index) in currentLesson.sections"
              :key="index"
              class="relative group bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all hover:border-blue-300"
            >
              <button
                @click="removeSection(index)"
                class="absolute right-4 top-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                title="Xóa mục này"
              >
                <Trash2 :size="18" />
              </button>

              <div class="space-y-4">
                <div>
                  <label
                    class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-2"
                  >
                    <span
                      class="w-5 h-5 bg-[#1a2b4c] text-white rounded flex items-center justify-center text-[10px]"
                      >{{ index + 1 }}</span
                    >
                    Tiêu đề mục
                  </label>
                  <input
                    v-model="section.title"
                    type="text"
                    placeholder="Ví dụ: 1.1 Khái niệm cơ bản..."
                    class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-900 focus:border-[#1a2b4c] focus:ring-1 focus:ring-[#1a2b4c] outline-none transition-all"
                  />
                </div>

                <div
                  class="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm"
                >
                  <QuillEditor
                    v-model:content="section.content"
                    contentType="html"
                    theme="snow"
                    placeholder="Nhập nội dung chi tiết cho mục này..."
                  />
                </div>
              </div>
            </div>

            <button
              @click="addSection"
              class="w-full py-6 mt-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#1a2b4c] hover:text-[#1a2b4c] hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <div
                class="p-2 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <Plus :size="20" />
              </div>
              <span class="text-sm font-semibold">Thêm nội dung mới</span>
            </button>
          </div>
        </div>

        <div
          class="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0"
        >
          <div
            class="flex items-center gap-2 text-xs font-semibold text-gray-500"
          >
            <span
              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            ></span>
            Hệ thống ổn định
          </div>

          <div class="flex items-center gap-3">
            <button
              @click="router.back()"
              class="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-all cursor-pointer"
            >
              Hủy thay đổi
            </button>
            <button
              @click="saveChanges"
              :disabled="isSaving"
              class="flex items-center gap-2 bg-[#1a2b4c] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-[#13203a] transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw v-if="isSaving" :size="16" class="animate-spin" />
              <Save v-else :size="16" />
              {{ isSaving ? "Đang lưu..." : "Lưu dữ liệu" }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center h-full text-gray-400"
      >
        <LayoutTemplate :size="48" class="mb-4 opacity-50" />
        <p class="font-medium text-lg text-gray-500">Chưa chọn bài giảng</p>
        <p class="text-sm">
          Hãy chọn một bài giảng ở menu bên trái để bắt đầu soạn thảo.
        </p>
      </div>
    </main>
    <aside class="w-80 flex flex-col">
      <LessonStructure
        :structure="courseStructure"
        :active-lesson-id="activeLessonId"
        @select-lesson="selectLesson"
        @add-chapter="handleAddChapter"
        @add-lesson="handleAddLesson"
        @remove-item="handleRemoveItem"
        status="Nháp"
        class="h-full"
      />
    </aside>
  </div>
</template>

<style scoped>
/* Tùy chỉnh thanh cuộn cho khu vực Editor */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #94a3b8;
}

/* Ghi đè CSS của Quill Editor để gọn gàng hơn */
:deep(.ql-toolbar.ql-snow) {
  border: none;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 12px 8px;
}

:deep(.ql-container.ql-snow) {
  border: none;
  min-height: 250px; /* Vừa phải, không quá dài gây tràn màn hình nhanh */
  font-size: 15px;
}

:deep(.ql-editor) {
  padding: 16px 20px;
}
</style>
