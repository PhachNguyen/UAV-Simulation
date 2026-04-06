<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Box, MapPin, CheckCircle } from "lucide-vue-next";
import Uav3DViewer from "@/components/Uav3DViewer.vue";
import Swal from "sweetalert2"; // Import SweetAlert2

const props = defineProps({
  lesson: { type: Object, required: true },
  courseId: { type: [String, Number], required: true },
  completedLessons: { type: Array, default: () => [] },
});

const emit = defineEmits(["status-changed"]);

// Refs
const uavViewerRef = ref(null);
const bottomSentinel = ref(null);
const isCompleted = ref(false);
let observer = null;

/**
 * Logic: Hiển thị thông báo SweetAlert2
 */
const notifySuccess = () => {
  Swal.fire({
    title: "Nhiệm vụ hoàn thành!",
    text: `Hệ thống đã ghi nhận bạn hoàn thành: ${props.lesson.title}`,
    icon: "success",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#f8fafc", // slate-50
    color: "#0f172a", // slate-900
    iconColor: "#14b8a6", // teal-500
  });
};

const notifyError = (message) => {
  Swal.fire({
    title: "Lỗi hệ thống",
    text: message,
    icon: "error",
    confirmButtonColor: "#ef4444",
  });
};

/**
 * Logic: Lưu tiến độ vào Backend
 */
const saveProgress = async () => {
  if (isCompleted.value) return;

  const token = localStorage.getItem("userToken");
  if (!token) {
    notifyError("Bạn cần đăng nhập để lưu tiến độ học tập!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId: props.courseId,
        lessonId: props.lesson.id,
      }),
    });

    if (response.ok) {
      isCompleted.value = true;
      notifySuccess(); // Hiện thông báo Swal
      emit("status-changed", props.lesson.id);
    } else if (response.status === 401) {
      notifyError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
      // Tùy chọn: router.push('/login')
    }
  } catch (error) {
    console.error("Lỗi mạng:", error);
  }
};

/**
 * Logic: Quản lý trình quan sát cuộn trang
 */
const initObserver = () => {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isCompleted.value) {
        saveProgress();
        observer.disconnect();
      }
    },
    { threshold: 1.0, rootMargin: "0px 0px 50px 0px" },
  );

  if (bottomSentinel.value) observer.observe(bottomSentinel.value);
};

// Theo dõi khi chuyển bài học (Next/Prev)
watch(
  () => props.lesson.id,
  (newId) => {
    isCompleted.value = props.completedLessons.includes(newId);
    if (!isCompleted.value) {
      // Reset cuộn lên đầu và khởi tạo lại observer
      setTimeout(initObserver, 500);
    }
  },
  { immediate: true },
);

onMounted(() => {
  initObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const focusHotspot = (spot) => {
  if (uavViewerRef.value?.flyToSpot) uavViewerRef.value.flyToSpot(spot);
};
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-white">
    <section v-if="lesson" class="flex-1 flex flex-col min-w-0">
      <div class="flex-1 overflow-y-auto custom-scrollbar relative px-8 py-12">
        <div class="max-w-4xl mx-auto">
          <header
            class="mb-12 border-b-2 border-slate-50 pb-8 sticky top-0 bg-white/90 backdrop-blur-md z-10"
          >
            <h1
              class="text-4xl font-black text-slate-950 leading-tight mb-3 tracking-tighter uppercase"
            >
              {{ lesson.title }}
            </h1>
            <div class="flex items-center gap-3 text-slate-400">
              <MapPin :size="16" class="text-teal-500" />
              <span class="text-xs font-bold uppercase tracking-widest">
                {{ lesson.hotspots?.length || 0 }} Điểm tương tác 3D
              </span>
            </div>
          </header>

          <article class="space-y-16">
            <div
              v-for="section in lesson.sections"
              :key="section.id"
              class="w-full"
            >
              <h2
                class="text-2xl font-black mt-8 mb-6 uppercase tracking-tighter border-l-4 border-teal-500 pl-4 text-slate-800"
              >
                {{ section.title }}
              </h2>
              <div
                v-if="section.type === 'theory'"
                class="prose prose-slate max-w-none"
              >
                <div
                  v-html="section.content"
                  class="text-lg leading-relaxed text-slate-700 text-justify rich-content"
                ></div>
              </div>
              <figure
                v-else-if="section.type === 'image'"
                class="my-10 flex flex-col items-center"
              >
                <img
                  :src="`http://localhost:5000${section.content}`"
                  class="max-w-xl h-auto rounded-3xl shadow-2xl border-4 border-white transition-transform hover:scale-[1.02] duration-300"
                />
              </figure>
            </div>
          </article>

          <footer
            ref="bottomSentinel"
            class="mt-20 py-16 border-t border-slate-50 flex flex-col items-center justify-center"
          >
            <transition name="fade">
              <div v-if="isCompleted" class="flex flex-col items-center gap-4">
                <div
                  class="w-16 h-16 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center shadow-inner"
                >
                  <CheckCircle :size="40" />
                </div>
                <span
                  class="text-sm font-black text-teal-600 uppercase tracking-widest animate-pulse"
                  >Bài học đã hoàn thành</span
                >
              </div>
              <div
                v-else
                class="flex flex-col items-center gap-2 text-slate-300 italic"
              >
                <div
                  class="w-1 h-12 bg-gradient-to-b from-transparent to-slate-200 rounded-full mb-2"
                ></div>
                <span class="text-xs">Cuộn đến cuối để hoàn thành bài học</span>
              </div>
            </transition>
          </footer>
        </div>
      </div>
    </section>

    <aside
      class="w-[450px] bg-slate-50 border-l border-slate-100 flex flex-col shadow-2xl z-20"
    ></aside>
  </div>
</template>

<style scoped>
/* Hiệu ứng mờ dần cho trạng thái hoàn thành */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
