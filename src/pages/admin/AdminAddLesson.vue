<template>
  <div class="min-h-screen bg-[#f4f7f9] p-4 md:p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-black text-slate-900 mb-2">
        Quản lý Chương học
      </h1>
      <p class="text-slate-500 text-sm font-medium">
        Tổ chức cấu trúc khung chương trình đào tạo SkyLink.
      </p>

      <div class="flex flex-wrap items-center justify-between mt-6 gap-4">
        <div class="flex gap-4">
          <div
            class="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3"
          >
            <div class="bg-blue-50 p-1.5 rounded-lg text-blue-600">
              <Folder :size="16" />
            </div>
            <div>
              <p
                class="text-[10px] font-black uppercase tracking-widest text-slate-400"
              >
                Tổng số Chương
              </p>
              <p class="text-sm font-black text-slate-800">
                {{ totalChapters }}
              </p>
            </div>
          </div>
          <div
            class="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3"
          >
            <div class="bg-indigo-50 p-1.5 rounded-lg text-indigo-600">
              <BookOpen :size="16" />
            </div>
            <div>
              <p
                class="text-[10px] font-black uppercase tracking-widest text-slate-400"
              >
                Tổng Bài giảng
              </p>
              <p class="text-sm font-black text-slate-800">
                {{ totalLessons }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative min-w-[250px]">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              :size="16"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm chương..."
              class="w-full pl-10 pr-4 py-2.5 bg-white border-none rounded-xl shadow-sm outline-none text-sm font-medium"
            />
          </div>
          <button
            @click="openModal"
            class="bg-[#475569] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-md"
          >
            <Plus :size="18" /> Thêm Chương Mới
          </button>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
    >
      <div class="col-span-1 text-center">Thứ tự</div>
      <div class="col-span-5">Thông tin Chương</div>
      <div class="col-span-3 text-center">Khối lượng nội dung</div>
      <div class="col-span-2">Trạng thái</div>
      <div class="col-span-1 text-right">Thao tác</div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-8 w-8 border-t-2 border-[#475569]"
      ></div>
    </div>

    <div v-else class="space-y-4 mb-8">
      <div
        v-for="chapter in filteredChapters"
        :key="chapter.id"
        class="bg-white rounded-2xl p-4 flex items-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow group grid grid-cols-12 gap-4"
      >
        <div class="col-span-1 flex items-center justify-center">
          <span
            class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-black"
          >
            {{ chapter.order || 0 }}
          </span>
        </div>

        <div class="col-span-5 flex items-center gap-4">
          <div
            class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0"
          >
            <LayoutList :size="24" />
          </div>
          <div>
            <h3 class="text-sm font-black text-slate-800 mb-1">
              {{ chapter.title }}
            </h3>
            <p class="text-xs text-slate-500 line-clamp-1">
              {{ chapter.description || "Chưa có mô tả" }}
            </p>
          </div>
        </div>

        <div class="col-span-3 flex items-center justify-center gap-4">
          <div class="text-center">
            <div class="text-lg font-black text-slate-800">
              {{ chapter.lessons ? chapter.lessons.length : 0 }}
            </div>
            <div
              class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Bài giảng
            </div>
          </div>
          <div class="h-8 w-px bg-slate-200"></div>
          <div class="text-center">
            <div class="text-lg font-black text-slate-800">
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
              class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Nội dung
            </div>
          </div>
        </div>

        <div
          class="col-span-2 flex items-center gap-2 text-xs font-bold text-slate-700"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Xuất bản
        </div>

        <div
          class="col-span-1 flex items-center justify-end gap-2 text-slate-400"
        >
          <button
            @click="
              $router.push({ name: 'LessonEditor', params: { id: chapter.id } })
            "
            class="cursor-pointer hover:text-gray-600 transition-colors p-2"
          >
            <Edit3 :size="16" />
          </button>
          <button
            @click="handleDelete(chapter.id)"
            class="hover:text-red-500 transition-colors p-2"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </div>
    </div>
    <BaseModal
      v-model="isModalOpen"
      title="Thiết lập Chương mới"
      subtitle="Cấu trúc khung đào tạo SkyLink"
      :icon="Layers"
      size="md"
    >
      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-[11px] font-black uppercase text-slate-400 ml-1"
            >Tiêu đề chương học</label
          >
          <input
            v-model="chapterForm.title"
            type="text"
            class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[11px] font-black uppercase text-slate-400 ml-1"
            >Mô tả nội dung</label
          >
          <textarea
            v-model="chapterForm.description"
            rows="4"
            class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium"
          ></textarea>
        </div>
      </div>

      <template #footer>
        <button
          @click="closeModal"
          class="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
        >
          Hủy bỏ
        </button>
        <button
          @click="handleSaveChapter"
          :disabled="isSaving"
          class="px-8 py-3 bg-slate-900 text-white font-black rounded-xl shadow-lg hover:bg-blue-600 transition-all uppercase text-[11px] tracking-widest disabled:opacity-50"
        >
          {{ isSaving ? "Đang lưu..." : "Lưu dữ liệu" }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/utils/apis/axios";
import { useToast } from "vue-toastification";
import {
  Plus,
  Search,
  Folder,
  BookOpen,
  Layers,
  Edit3,
  Trash2,
  LayoutList,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import BaseModal from "@/components/BaseModal.vue";

const toast = useToast();
const chaptersList = ref([]);
const searchQuery = ref("");
const isLoading = ref(true);
// Thêm chappter
const isModalOpen = ref(false);
const isSaving = ref(false);
// Chọn chương để thêm bài giảng (nếu cần)
const activeChapter = ref(null);
const isLoadingLessons = ref(false); // Tải bài giảng khi chọn chương
const chapterForm = ref({
  title: "",
  description: "",
  order: null, // Order sẽ do BE hoặc DB tự set mặc định (như code cũ cậu nói)
});
// Mở modal và reset form
const openModal = () => {
  chapterForm.value = {
    title: "",
    description: "",
    order: chaptersList.value.length + 1,
  };
  isModalOpen.value = true;
};

// Đóng modal
const closeModal = () => {
  isModalOpen.value = false;
};
// API tạo chương mới
// Hàm xử lý Lưu Chương Mới (Gọi API POST)
const handleSaveChapter = async () => {
  // Validation cơ bản
  if (!chapterForm.value.title.trim()) {
    toast.error("Vui lòng nhập tên chương!");
    return;
  }

  try {
    isSaving.value = true;

    // Gọi API đã cấu hình trong courseRoutes.js
    const response = await api.post("/courses", chapterForm.value);

    toast.success("Đã thêm chương học mới thành công!");

    // Thêm trực tiếp dữ liệu mới vào đầu mảng UI (khỏi cần gọi lại API GET)
    // Đảm bảo cấu trúc có mảng lessons rỗng để render UI không bị lỗi
    const newChapter = { ...response.data, lessons: [] };
    chaptersList.value.unshift(newChapter);

    closeModal();
  } catch (error) {
    console.error("Lỗi khi thêm chương:", error);
    toast.error("Lỗi hệ thống khi thêm chương học.");
  } finally {
    isSaving.value = false;
  }
};
// Fetch Dữ liệu Chương từ Backend
const fetchChapters = async () => {
  try {
    isLoading.value = true;
    const response = await api.get("/courses");

    // Gán trực tiếp mảng chapters từ Backend trả về
    chaptersList.value = response.data.chapters;
  } catch (error) {
    console.error("Lỗi radar khi tải danh sách chương:", error);
    toast.error("Không thể tải danh sách chương từ máy chủ!");
  } finally {
    isLoading.value = false;
  }
};

// Tính toán thống kê nhanh
const totalChapters = computed(() => chaptersList.value.length);

const totalLessons = computed(() => {
  return chaptersList.value.reduce((total, chapter) => {
    return total + (chapter.lessons ? chapter.lessons.length : 0);
  }, 0);
});

// Lọc tìm kiếm theo Tên chương
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

// Xóa Chương
const handleDelete = async (id) => {
  if (
    confirm(
      "CẢNH BÁO: Xóa chương sẽ xóa toàn bộ bài giảng bên trong! Bạn chắc chứ?",
    )
  ) {
    try {
      await api.delete(`/courses/${id}`); // Sử dụng route xóa chương của cậu
      toast.success("Đã xóa chương và các nội dung liên quan!");
      chaptersList.value = chaptersList.value.filter((c) => c.id !== id);
    } catch (error) {
      toast.error("Lỗi hệ thống khi xóa dữ liệu");
    }
  }
};
// Fetch lesson theo chappter
// Hàm gọi API lấy chi tiết 1 chương (bao gồm cả lessons)
const viewChapterDetails = async (chapterId) => {
  try {
    isLoadingLessons.value = true;

    // Gọi API GET /courses/:id mà cậu đã viết ở Backend
    const response = await api.get(`/courses/${chapterId}`);

    // Gán dữ liệu trả về vào activeChapter để hiển thị màn hình 2
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
