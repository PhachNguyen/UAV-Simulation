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
              Mục nhỏ
            </div>
          </div>
        </div>

        <div
          class="col-span-2 flex items-center gap-2 text-xs font-bold text-slate-700"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Đang áp dụng
        </div>

        <div
          class="col-span-1 flex items-center justify-end gap-2 text-slate-400"
        >
          <button
            @click="$router.push(`/admin/chapters/edit/${chapter.id}`)"
            class="hover:text-blue-600 transition-colors p-2"
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

const toast = useToast();
const chaptersList = ref([]);
const searchQuery = ref("");
const isLoading = ref(true);

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
      await api.delete(`/chapters/${id}`); // Sử dụng route xóa chương của cậu
      toast.success("Đã xóa chương và các nội dung liên quan!");
      chaptersList.value = chaptersList.value.filter((c) => c.id !== id);
    } catch (error) {
      toast.error("Lỗi hệ thống khi xóa dữ liệu");
    }
  }
};

onMounted(fetchChapters);
</script>
