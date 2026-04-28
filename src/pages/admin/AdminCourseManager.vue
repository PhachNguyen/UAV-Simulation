<template>
  <div class="min-h-screen bg-gray-100 p-6 font-sans text-gray-800 pb-24">
    <div
      class="flex items-center justify-between bg-white p-4 rounded-t-xl border-b border-gray-200 shadow-sm mb-6"
    >
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-gray-800">Quản lý Bài giảng</h1>
        <p class="text-sm text-slate-500 mt-1">
          Biên soạn, cập nhật và tổ chức chi tiết nội dung bài giảng.
        </p>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="openModal"
          class="px-5 py-2.5 bg-[#1a2b4c] text-white rounded-lg text-sm font-semibold hover:bg-[#13203a] flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
        >
          <Plus :size="16" /> Thêm Chương mới
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      <div class="lg:col-span-7 grid grid-cols-2 gap-4">
        <div
          class="bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4"
        >
          <div
            class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0"
          >
            <Folder :size="24" class="text-gray-500" />
          </div>
          <div>
            <p class="text-xs font-bold text-gray-500 mb-1">Tổng số Chương</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalChapters }}</p>
          </div>
        </div>
        <div
          class="bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4"
        >
          <div
            class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"
          >
            <BookOpen :size="24" class="text-blue-500" />
          </div>
          <div>
            <p class="text-xs font-bold text-gray-500 mb-1">Tổng Bài giảng</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalLessons }}</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 flex items-center">
        <div
          class="bg-white w-full h-full p-4 rounded-xl shadow-sm border border-gray-200 flex items-center"
        >
          <div class="relative w-full">
            <Search
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              :size="18"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm chương học..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1a2b4c] focus:bg-white text-sm transition-all"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-500 mb-2"
    >
      <div class="col-span-1 text-center">STT</div>
      <div class="col-span-5">Thông tin Chương</div>
      <div class="col-span-3 text-center">Khối lượng nội dung</div>
      <div class="col-span-2">Trạng thái</div>
      <div class="col-span-1 text-right">Thao tác</div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1a2b4c]"
      ></div>
    </div>

    <div v-else class="space-y-3 mb-8">
      <div
        v-for="chapter in paginatedChapters"
        :key="chapter.id"
        @click="
          $router.push({ name: 'LessonEditor', params: { id: chapter.id } })
        "
        title="Nhấn để xem và chỉnh sửa bài giảng"
        class="cursor-pointer bg-white rounded-xl p-4 flex items-center shadow-sm border border-gray-200 hover:border-blue-300 transition-all group grid grid-cols-12 gap-4"
      >
        <div class="col-span-1 flex items-center justify-center">
          <span
            class="w-8 h-8 rounded-full bg-gray-50 text-gray-500 border border-gray-200 flex items-center justify-center text-xs font-bold"
          >
            {{ chapter.order || 0 }}
          </span>
        </div>

        <div class="col-span-5 flex items-center gap-4">
          <div
            class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100"
          >
            <BookText :size="20" />
          </div>
          <div>
            <h3
              class="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors"
            >
              {{ chapter.title }}
            </h3>
            <p class="text-xs text-gray-500 line-clamp-1">
              {{ chapter.description || "Chưa có mô tả" }}
            </p>
          </div>
        </div>

        <div class="col-span-3 flex items-center justify-center gap-6">
          <div class="text-center">
            <div class="text-base font-bold text-gray-900">
              {{ chapter.lessons ? chapter.lessons.length : 0 }}
            </div>
            <div
              class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest"
            >
              Bài giảng
            </div>
          </div>
          <div class="h-8 w-px bg-gray-200"></div>
          <div class="text-center">
            <div class="text-base font-bold text-gray-900">
              {{
                chapter.lessons
                  ? chapter.lessons.reduce(
                      (sum, lesson) =>
                        sum + (lesson.sections ? lesson.sections.length : 0),
                      0,
                    )
                  : 0
              }}
            </div>
            <div
              class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest"
            >
              Nội dung
            </div>
          </div>
        </div>

        <div
          class="col-span-2 flex items-center gap-2 text-xs font-semibold text-gray-700"
        >
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Xuất
            bản
          </span>
        </div>

        <div
          class="col-span-1 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button
            @click.stop="openEditModal(chapter)"
            class="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            title="Sửa tên chương"
          >
            <Settings :size="16" />
          </button>

          <button
            @click.stop="
              $router.push({ name: 'LessonEditor', params: { id: chapter.id } })
            "
            class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="Chi tiết bài giảng"
          >
            <Edit3 :size="16" />
          </button>

          <button
            @click.stop="handleDelete(chapter.id)"
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </div>

      <div
        v-if="filteredChapters.length === 0 && !isLoading"
        class="py-12 text-center bg-white rounded-xl border-2 border-dashed border-gray-200"
      >
        <p class="text-gray-500 font-medium">Không tìm thấy chương học nào.</p>
      </div>

      <div
        v-if="filteredChapters.length > 0"
        class="flex items-center justify-between pt-4 mt-6 border-t border-gray-200"
      >
        <p class="text-[13px] text-slate-500">
          Hiển thị
          {{ (currentPage - 1) * itemsPerPage + 1 }}
          -
          {{ Math.min(currentPage * itemsPerPage, filteredChapters.length) }}
          của
          {{ filteredChapters.length }}
          chương học
        </p>

        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft :size="18" />
          </button>

          <div class="flex gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-9 h-9 rounded-lg text-sm font-bold transition-all cursor-pointer',
                currentPage === page
                  ? 'bg-[#1a2b4c] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100',
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>
    </div>

    <BaseModal
      v-model="isModalOpen"
      :title="isEditing ? 'Cập nhật Chương học' : 'Tạo Chương mới'"
      :subtitle="
        isEditing
          ? 'Chỉnh sửa thông tin định danh chương'
          : 'Cấu trúc khung đào tạo SkyLink'
      "
      :icon="isEditing ? Edit3 : Layers"
      size="md"
    >
      <div class="space-y-5 p-2">
        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">
            Tiêu đề chương học <span class="text-red-500">*</span>
          </label>
          <input
            v-model="chapterForm.title"
            @focus="clearError('title')"
            type="text"
            placeholder="VD: Tổng quan về UAV"
            :class="[
              'w-full border rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none transition-all',
              errors.title
                ? 'border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30'
                : 'border-gray-300 focus:ring-2 focus:ring-[#1a2b4c] focus:bg-white',
            ]"
          />
          <p
            v-if="errors.title"
            class="text-[11px] font-bold text-red-500 mt-1.5"
          >
            {{ errors.title }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2"
            >Mô tả nội dung</label
          >
          <textarea
            v-model="chapterForm.description"
            rows="4"
            placeholder="Nhập mô tả tóm tắt nội dung chương..."
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c] focus:bg-white transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            @click="closeModal"
            class="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            @click="handleSaveChapter"
            :disabled="isSaving"
            class="px-8 py-2.5 bg-[#1a2b4c] text-white rounded-lg text-sm font-semibold hover:bg-[#13203a] flex items-center gap-2 shadow-sm cursor-pointer transition-colors disabled:opacity-50"
          >
            {{ isSaving ? "Đang xử lý..." : "Lưu dữ liệu" }}
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import api from "@/utils/apis/axios";
import { useToast } from "vue-toastification";
import {
  Plus,
  Search,
  Folder,
  BookOpen,
  Layers,
  Edit3,
  Settings,
  Trash2,
  BookText, // Icon cuốn sách
  ChevronLeft, // Icon Lùi
  ChevronRight, // Icon Tiến
} from "lucide-vue-next";
import BaseModal from "@/components/BaseModal.vue";

const toast = useToast();
const chaptersList = ref([]);
const searchQuery = ref("");
const isLoading = ref(true);
const isEditing = ref(false);
// Thêm chapter
const isModalOpen = ref(false);
const isSaving = ref(false);
const activeChapter = ref(null);
const isLoadingLessons = ref(false);

const chapterForm = ref({
  title: "",
  description: "",
  order: null,
});
const errors = ref({});

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};
// Mở modal và reset form
const openModal = () => {
  chapterForm.value = {
    title: "",
    description: "",
    order: chaptersList.value.length + 1,
  };
  errors.value = {}; // Reset toàn bộ lỗi cũ khi mở form mới
  isModalOpen.value = true;
};
// Mở modal để Chỉnh sửa (Event mới)
const openEditModal = (chapter) => {
  isEditing.value = true;
  activeChapter.value = chapter; // Lưu lại chương đang sửa
  chapterForm.value = {
    title: chapter.title,
    description: chapter.description,
    order: chapter.order,
  };
  errors.value = {};
  isModalOpen.value = true;
};
// Đóng modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Hàm xử lý Lưu (Gộp cả Thêm và Sửa)
const handleSaveChapter = async () => {
  errors.value = {};
  if (!chapterForm.value.title.trim()) {
    errors.value.title = "Bắt buộc phải nhập tiêu đề chương học.";
    return;
  }

  try {
    isSaving.value = true;
    if (isEditing.value) {
      // Logic CẬP NHẬT (PUT)
      const response = await api.put(
        `/courses/${activeChapter.value.id}`,
        chapterForm.value,
      );
      toast.success("Cập nhật chương học thành công!");

      // Cập nhật lại dữ liệu trong mảng local
      const index = chaptersList.value.findIndex(
        (c) => c.id === activeChapter.value.id,
      );
      if (index !== -1) {
        chaptersList.value[index] = {
          ...chaptersList.value[index],
          ...chapterForm.value,
        };
      }
    } else {
      // Logic THÊM MỚI (POST)
      const response = await api.post("/courses", chapterForm.value);
      toast.success("Đã thêm chương học mới!");
      chaptersList.value.unshift({ ...response.data, lessons: [] });
    }
    closeModal();
  } catch (error) {
    console.error("Lỗi lưu chương:", error);
    toast.error("Không thể lưu dữ liệu. Vui lòng thử lại!");
  } finally {
    isSaving.value = false;
  }
};
// Fetch Dữ liệu Chương
const fetchChapters = async () => {
  try {
    isLoading.value = true;
    const response = await api.get("/courses");
    chaptersList.value = response.data.chapters;
  } catch (error) {
    console.error("Lỗi radar khi tải danh sách chương:", error);
    toast.error("Không thể tải danh sách chương từ máy chủ!");
  } finally {
    isLoading.value = false;
  }
};

// Tính toán thống kê
const totalChapters = computed(() => chaptersList.value.length);
const totalLessons = computed(() => {
  return chaptersList.value.reduce((total, chapter) => {
    return total + (chapter.lessons ? chapter.lessons.length : 0);
  }, 0);
});

// Lọc tìm kiếm
const filteredChapters = computed(() => {
  if (!searchQuery.value) return chaptersList.value;
  return chaptersList.value.filter(
    (chap) =>
      chap.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (chap.description &&
        chap.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())),
  );
});

// ==========================================
// TÍCH HỢP PHÂN TRANG (PAGINATION)
// ==========================================
const currentPage = ref(1);
const itemsPerPage = ref(2); // Có thể đổi thành 10, 15...

// Tự động quay về trang 1 nếu người dùng gõ tìm kiếm
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Tính tổng số trang
const totalPages = computed(() => {
  return Math.ceil(filteredChapters.value.length / itemsPerPage.value) || 1;
});

// Lấy mảng dữ liệu cho trang hiện tại
const paginatedChapters = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredChapters.value.slice(start, end);
});
// ==========================================

// Xóa Chương
const handleDelete = async (id) => {
  if (
    confirm(
      "CẢNH BÁO: Xóa chương sẽ xóa toàn bộ bài giảng bên trong! Bạn chắc chứ?",
    )
  ) {
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Đã xóa chương và các nội dung liên quan!");
      chaptersList.value = chaptersList.value.filter((c) => c.id !== id);
    } catch (error) {
      toast.error("Lỗi hệ thống khi xóa dữ liệu");
    }
  }
};

// Fetch lesson theo chapter
const viewChapterDetails = async (chapterId) => {
  try {
    isLoadingLessons.value = true;
    const response = await api.get(`/courses/${chapterId}`);
    activeChapter.value = response.data;
  } catch (error) {
    console.error("Lỗi khi tải chi tiết chương:", error);
    toast.error("Không thể tải danh sách bài giảng của chương này!");
  } finally {
    isLoadingLessons.value = false;
  }
};

onMounted(fetchChapters);
</script>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
