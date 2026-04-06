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

const emit = defineEmits(["status-changed", "nav-lesson"]);

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
        chapterId: props.courseId,
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
  <div class="flex flex-col bg-white">
    <section v-if="lesson" class="flex-1 flex flex-col min-w-0">
      <div class="flex-1 relative px-8 py-12">
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

    <!-- <aside
      class="w-[450px] bg-slate-50 border-l border-slate-100 flex flex-col shadow-2xl z-20"
    ></aside> -->
    <aside
      v-if="lesson.model3DPath"
      class="bg-slate-50 p-8 flex flex-col border-l border-slate-100 shadow-[-15px_0_40px_rgba(0,0,0,0.02)] sticky top-0 h-full"
    >
      <div class="p-6 flex-1 custom-scrollbar space-y-10">
        <div
          class="flex items-center justify-between border-b-2 border-slate-100 pb-5 mb-5 bg-slate-50"
        >
          <div>
            <h3
              class="text-sm font-black text-slate-900 uppercase tracking-widest"
            >
              Visual Simulation
            </h3>
            <p class="text-[9px] text-teal-600 font-bold uppercase mt-1">
              Gắn tọa độ thực tế từ Backend
            </p>
          </div>
          <Box class="text-slate-200 w-8 h-8" />
        </div>

        <div
          class="aspect-square bg-slate-950 rounded-[3rem] relative shadow-2xl border-4 border-slate-800 group transition-all"
        >
          <Uav3DViewer
            ref="uavViewerRef"
            :admin="false"
            :modelSrc="'http://localhost:5000' + lesson.model3DPath"
            :customHotspots="lesson.hotspots"
          />
          <div
            class="absolute inset-x-0 bottom-6 px-6 flex justify-between items-center pointer-events-none"
          >
            <div
              class="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10"
            >
              <span
                class="text-[8px] font-black text-white uppercase tracking-widest"
                >Mode: Tương tác trực quan</span
              >
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Danh sách linh kiện
            </h3>
            <span
              class="text-[9px] font-black text-slate-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border"
              >{{ lesson.hotspots?.length || 0 }} ĐIỂM</span
            >
          </div>

          <div class="space-y-3">
            <div
              v-for="(spot, index) in lesson.hotspots"
              :key="index"
              @click="focusHotspot(spot)"
              class="bg-white rounded-2xl p-4 border border-slate-100 hover:border-teal-500 cursor-pointer transition-all ..."
            >
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center text-[10px] font-black text-white shadow-lg"
                >
                  {{ index + 1 }}
                </span>
                <h4 class="font-bold text-xs text-slate-800 flex-1">
                  {{ spot.title }}
                </h4>
              </div>

              <div class="grid grid-cols-3 gap-2 mb-3">
                <div
                  class="bg-slate-50 p-2 rounded-lg text-center font-mono text-[9px] text-slate-500 border border-slate-100 shadow-inner"
                >
                  <span
                    class="block text-[7px] font-black text-slate-300 uppercase"
                    >X-Axis</span
                  >
                  {{ spot.pos.x.toFixed(3) }}
                </div>
                <div
                  class="bg-slate-50 p-2 rounded-lg text-center font-mono text-[9px] text-slate-500 border border-slate-100 shadow-inner"
                >
                  <span
                    class="block text-[7px] font-black text-slate-300 uppercase"
                    >Y-Axis</span
                  >
                  {{ spot.pos.y.toFixed(3) }}
                </div>
                <div
                  class="bg-slate-50 p-2 rounded-lg text-center font-mono text-[9px] text-slate-500 border border-slate-100 shadow-inner"
                >
                  <span
                    class="block text-[7px] font-black text-slate-300 uppercase"
                    >Z-Axis</span
                  >
                  {{ spot.pos.z.toFixed(3) }}
                </div>
              </div>

              <p
                class="text-[10px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 italic"
              >
                {{ spot.desc || "Chưa có mô tả kỹ thuật." }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <aside
      v-else
      class="w-[400px] bg-slate-50 p-12 flex items-center justify-center border-l border-slate-100 text-center"
    >
      <div>
        <Box class="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Bài giảng không có mô hình 3D
        </p>
      </div>
    </aside>
    <div class="mt-10 flex items-center justify-between gap-4 pb-20">
      <button
        @click="handleNavigation('prev')"
        class="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
      >
        <ArrowLeft :size="20" />
        Bài trước
      </button>

      <button
        @click="handleNavigation('next')"
        class="flex items-center gap-2 px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-teal-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
      >
        Bài tiếp theo
        <ArrowRight :size="20" />
      </button>
    </div>
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

/* .custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
} */
</style>
